import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, InputNumber, Modal, Rate, Row, Skeleton, message } from "antd";
import { StarOutlined, ShoppingCartOutlined, CommentOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faSubtract } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import { useSelector } from "react-redux";

import { addBookInCart, deleteCommentUser, editCommentUser, getBookDetail, patchBookRate } from "../../services";
import styles from "./BookInfo.module.css";
import Comment from "../../components/Comment/Comment";

function BookInfo() {
  const { ID } = useParams();
  const [book, setBook] = useState({});
  const [openModalRate, setOpenModalRate] = useState(false);
  const [openModalCart, setOpenModalCart] = useState(false);
  const [stars, setStars] = useState(1);
  const [openPreview, setOpenPreview] = useState(false);
  const [comfirmLoading, setConfirmLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [userVoted, setUserVoted] = useState(new Map());
  const [starVoted, setStarVoted] = useState(0);
  const [quantityInCart, setQuantityInCart] = useState(0);
  const [addBook, setAddBook] = useState(1);
  const [booksInCart, setBooksInCart] = useState([]);

  const commentRef = useRef();
  const user = useSelector(state => state.userReducer);
  const [commentContent, setCommentContent] = useState("");
  const [actionWithComment, setActionWithComment] = useState({});
  const [editComment, setEditComment] = useState(false);

  const calculateRating = (stars, votes) => {
    let average = Number(stars / votes);
    let round = Number(average.toFixed(0));
    if (average <= round) {
      return round;
    } else {
      return round + 0.5;
    }
  }

  const standardizeMoney = (money) => {
    const digits = money.split("").reverse();
    return digits.map((digit, index) => (
      index !== 0 && index % 3 === 0 ? digit + "." : digit
    )).reverse().join("");
  }

  const items = [
    {
      type: "title",
      title: "Tên sách"
    },
    {
      type: "author",
      title: "Tác giả"
    },
    {
      type: "category",
      title: "Thể loại"
    },
    {
      type: "pages",
      title: "Số trang"
    },
    {
      type: "releaseDate",
      title: "Phát hành"
    },
    {
      type: "price",
      title: "Giá",
      descChild: (
        <>
          {book.saleOff !== 0 ? (
            <>
              <span className={styles.cost}><del>{standardizeMoney(Number(book.price).toString())}</del></span>
              <span className={styles.saleOff}>-{book.saleOff * 100}%</span>
            </>
          ) : (<></>)}
          <span>{standardizeMoney((book.price * (1 - book.saleOff)).toFixed(0).toString())}</span>
        </>
      )
    },
    {
      type: "quantitySold",
      title: "Đã bán"
    },
    {
      type: "rate",
      title: "Đánh giá",
      descChild: (
        <>
          <Rate allowHalf value={calculateRating(book.stars, book.votes)} disabled className={styles.stars} />
          <span>/ {book.votes} lượt</span>
        </>
      )
    }
  ]

  useEffect(() => {
    window.scrollTo(0, 0);

    const uid = localStorage.getItem("uid");
    getBookDetail(ID, uid)
      .then(([book, comments, rates, { books }]) => {
        document.title = book.title;
        const bookInCart = books ? books.find((item) => item.bookID === book.id) : [];
        const userVoted = new Map();

        rates.list.forEach(({ uid, star }) => {
          userVoted.set(uid, star);
        });

        if (userVoted.has(uid)) {
          setStarVoted(userVoted.get(uid));
          setStars(userVoted.get(uid));
        }

        if (bookInCart) {
          setQuantityInCart(bookInCart.quantity);
          setAddBook(bookInCart.quantity);
        }

        setBooksInCart(books);
        setUserVoted(userVoted);
        setBook(book);
        setComments(comments.contents.reverse());
      })

    return () => {
      document.title = "Library";
    }
  }, [ID])

  const handleRating = () => {
    setConfirmLoading(true);
    const currentUID = localStorage.getItem("uid");
    userVoted.set(currentUID, stars);
    const newTotalStars = starVoted === 0 ? book.stars + stars : book.stars - starVoted + stars;
    const newTotalVotes = starVoted === 0 ? book.votes + 1 : book.votes;
    const newList = [];

    for (const [uid, star] of userVoted.entries()) {
      newList.push({ uid, star });
    }

    patchBookRate(ID, {
      stars: newTotalStars,
      votes: newTotalVotes
    }, { list: newList })
      .then(([book,]) => {
        setOpenModalRate(false);
        setConfirmLoading(false);
        setBook(book);
        setStarVoted(stars);
        message.success("Thực hiện đánh giá thành công!");
      })
  }

  const handleAddBookInCart = () => {
    setConfirmLoading(true);
    if (addBook === quantityInCart) {
      setConfirmLoading(false);
      Modal.info({
        title: "Số lượng không đổi",
        content: "Bạn phải thay đổi số lượng sách muốn thêm khác với số lượng đang có trong giỏ hàng!",
        okText: "Đã hiểu",
        onOk() { }
      })
    } else {
      const uid = localStorage.getItem("uid");
      if (quantityInCart === 0 && !booksInCart) {
        // fetch(`http://localhost:3004/carts/${localStorage.getItem("uid")}`, {
        //   method: "PATCH",
        //   mode: "cors",
        //   body: JSON.stringify({
        //     books: [...booksInCart, { bookID: book.id, quantity: addBook }]
        //   }),
        //   headers: {
        //     'Content-Type': 'application/json; charset=UTF-8',
        //   }
        // })
        addBookInCart(uid, -1, {
          id: uid, 
          books: [
            ...booksInCart,
            { bookID: book.id, quantity: addBook }
          ]
        })
          .then(() => {
            message.success("Thực hiện thêm thành công!");
            setQuantityInCart(addBook);
            setConfirmLoading(false);
            setOpenModalCart(false);
          })
          .catch((err) => console.error(`Error when trying add book has ID ${book.id} in cart: ${err}`))
      } else {
        const newBooksInCart = booksInCart ? booksInCart.filter((item) => item.bookID !== book.id) : [];

        // fetch(`http://localhost:3004/carts/${localStorage.getItem("uid")}`, {
        //   method: "PATCH",
        //   mode: "cors",
        //   body: JSON.stringify({
        //     books: [...newBooksInCart, { bookID: book.id, quantity: addBook }]
        //   }),
        //   headers: {
        //     'Content-Type': 'application/json; charset=UTF-8',
        //   }
        // })
        addBookInCart(uid, booksInCart ? booksInCart.length : -1, booksInCart ? {
          books: [
            ...newBooksInCart,
            { bookID: book.id, quantity: addBook }
          ]
        } : {
          id: uid, 
          books: [
            { bookID: book.id, quantity: addBook }
          ]
        })
          .then(() => {
            message.success("Thực hiện thêm thành công!");
            setQuantityInCart(addBook);
            setConfirmLoading(false);
            setOpenModalCart(false);
          })
          .catch((err) => console.error(`Error when trying add book has ID ${book.id} in cart: ${err}`))
      }
    }
  }

  const handleScrollToComment = () => {
    commentRef.current.scrollIntoView();
  }

  const handleCancelPreview = () => {
    setOpenPreview(false)
  }

  const handleOpenPreviewAvatar = () => {
    setOpenPreview(true)
  }

  const handleDeleteComment = async (data) => {
    if (actionWithComment.contentID !== undefined) {
      let newListComments;
      if (data.contents) {
        newListComments = data.contents.filter(({ contentID }) => contentID !== actionWithComment.contentID)
      } else {
        newListComments = comments.filter(({ contentID }) => contentID !== actionWithComment.contentID)
      }
      // fetch(`http://localhost:3004/comments/${ID}`, {
      //   method: "PATCH",
      //   mode: "cors",
      //   body: JSON.stringify({
      //     contents: newListComments
      //   }),
      //   headers: {
      //     'Content-Type': 'application/json; charset=UTF-8',
      //   }
      // })
      //   .then(res => res.json())
      deleteCommentUser(ID, { contents: newListComments })
        .then(data => {
          setActionWithComment({});
          setComments(data.contents.reverse());
          if (editComment) {
            setEditComment(false);
            message.success("Bạn vừa thực hiện chỉnh sửa bình luận!");
            commentRef.current.focusComment();
          } else {
            message.success("Bạn vừa thực hiện xóa bình luận!");
          }
        })
    }
  }

  const handleSendComment = async () => {
    const sendComment = commentContent.trim();
    if (sendComment !== "") {
      let newData;
      const now = new Date();
      const date = `${now.getDate().toString().padStart(2, '0')}` +
        `/${(now.getMonth() + 1).toString().padStart(2, '0')}` +
        `/${now.getFullYear().toString()}`;
      const time = `${now.getHours().toString().padStart(2, '0')}` +
        `:${(now.getMinutes()).toString().padStart(2, '0')}` +
        `:${now.getSeconds().toString().padStart(2, '0')}`;
      // await fetch(`http://localhost:3004/comments/${ID}`, {
      //   method: "PATCH",
      //   mode: "cors",
      //   body: JSON.stringify({
      //     contents: [...comments, {
      //       contentID: Date.now(),
      //       uid: localStorage.getItem("uid"),
      //       name: user.firstName + " " + user.lastName,
      //       commentTime: `${time} ${date}`,
      //       comment: sendComment
      //     }]
      //   }),
      //   headers: {
      //     'Content-Type': 'application/json; charset=UTF-8',
      //   }
      // })
      //   .then(res => res.json())
      await editCommentUser(ID, {
        contents: [...comments, {
          contentID: Date.now(),
          uid: localStorage.getItem("uid"),
          name: user.firstName + " " + user.lastName,
          avatar: user.avatar,
          commentTime: `${time} ${date}`,
          comment: sendComment
        }]
      })
        .then(data => {
          newData = data;
          if (!editComment) {
            setComments(data.contents.reverse());
            message.success("Bạn vừa đăng một bình luận mới!");
          }
          setCommentContent("");
          commentRef.current.cancelDisabled();
          commentRef.current.focusComment();
        })
      if (editComment) {
        await handleDeleteComment(newData);
      }
    }
  }

  const handleEditComment = () => {
    setCommentContent(actionWithComment.comment);
    commentRef.current.focusComment();
    setEditComment(true);
  }

  return (
    <div className={styles.bookInfo}>
      <div className={clsx([styles.infoWrap, "container"])}>
        <Row gutter={[{ xs: 4, sm: 4, md: 6, lg: 12 }, 12]}>
          <Col xs={24} md={8} lg={6}>
            <div className={styles.bookCover}>
              {book.id ? (
                <img
                  className={styles.image}
                  src={book.cover}
                  alt={book.title}
                  onClick={handleOpenPreviewAvatar}
                />
              ) : (
                <Skeleton.Image active paragraph={false} className={styles.skeletonBookCover} />
              )}
            </div>
          </Col>
          <Col xs={24} md={16} lg={18}>
            <div className={styles.infoDetail}>
              {book.id ? items.map((item, index) => (
                <div key={index} className={clsx([styles[item.type], styles.info])}>
                  <Row>
                    <Col xs={8} sm={4} md={6} lg={4}>
                      <div className={styles.title}>
                        <h3 className={styles.headingThird}>{item.title} {item.type === "price" ? "(vnđ)" : ""}</h3>
                      </div>
                    </Col>
                    <Col xs={16} sm={20} md={18} lg={20}>
                      <div className={styles.desc}>
                        {item.descChild || (
                          item.type === "releaseDate" ? (book[item.type]).toString().split("-").reverse().join("/") : book[item.type]
                        )}
                        {item.type === "pages" ? " trang" : ""}
                        {item.type === "quantitySold" ? " quyển" : ""}
                      </div>
                    </Col>
                  </Row>
                </div>
              )) : (
                items.map((item, index) => (
                  <div key={index} className={clsx([styles[item.type], styles.info])}>
                    <Skeleton.Button active paragraph={false} className={styles.skeletonTitle} />
                  </div>
                ))
              )}
            </div>
            <Modal
              className={styles.modalPreview}
              open={openPreview}
              footer={null}
              onCancel={handleCancelPreview}
            >
              <img
                alt="Book Cover"
                className={styles.avatarPreview}
                src={book.cover}
              />
            </Modal>
          </Col>
          <Col span={24}>
            <div className={styles.features}>
              <Row wrap={false}>
                <Col xs={8} md={4} lg={3}>
                  <div className={styles.rating}>
                    <StarOutlined
                      className={styles.starIcon}
                      onClick={() => setOpenModalRate(true)}
                    />
                  </div>
                </Col>
                <Col xs={8} md={4} lg={3}>
                  <div className={styles.cart}>
                    <ShoppingCartOutlined
                      className={styles.cartIcon}
                      onClick={() => setOpenModalCart(true)}
                    />
                  </div>
                </Col>
                <Col xs={8} md={16} lg={18}>
                  <div className={styles.comment}>
                    <CommentOutlined
                      className={styles.commentIcon}
                      onClick={handleScrollToComment}
                    />
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
          <Col span={24}>
            <div className={styles.introduce}>
              <h3 className={styles.headingThird}>Giới thiệu</h3>
              <textarea rows={16} className={styles.content} disabled value={book.note}></textarea>
            </div>
          </Col>
          <Col xs={24}>
            <Comment
              ref={commentRef}
              comments={comments}
              loading={book.id === undefined ? true : false}
              commentContent={commentContent}
              setActionWithComment={setActionWithComment}
              onEnterComment={setCommentContent}
              onSendComment={handleSendComment}
              onDeleteComment={handleDeleteComment}
              onEditComment={handleEditComment}
            />
          </Col>
        </Row>
      </div>
      <Modal
        title={
          starVoted !== 0 ? (
            <>
              Bạn muốn đánh giá cuốn "{book.title}" bao nhiêu sao? <br />
              (Trước đó bạn đã đánh giá {starVoted} <Rate count={1} value={1} disabled />)
            </>
          ) : (
            <>Bạn muốn đánh giá cuốn "{book.title}" bao nhiêu sao?</>
          )}
        cancelText="Thoát"
        okText="Đánh giá"
        open={openModalRate}
        closable={false}
        confirmLoading={comfirmLoading}
        cancelButtonProps={{ disabled: comfirmLoading }}
        onCancel={() => setOpenModalRate(false)}
        onOk={handleRating}
      >
        <div className={styles.modalRate}>
          <Rate
            count={5}
            value={stars}
            className={styles.starsInModal}
            onChange={(stars) => setStars(stars === 0 ? 1 : stars)}
          />
        </div>
      </Modal>
      <Modal
        title={
          <>
            {!quantityInCart ? (
              <>
                {`Bạn muốn thêm bao nhiêu cuốn "${book.title}" vào giỏ hàng?`}
              </>
            ) : (
              <>
                {`Bạn muốn thêm bao nhiêu cuốn "${book.title}" vào giỏ hàng?`} <br />
                {`(Hiện tại bạn đang có ${quantityInCart} cuốn trong giỏ)`}
              </>
            )}
          </>
        }
        cancelText="Thoát"
        okText="Thêm"
        open={openModalCart}
        closable={false}
        confirmLoading={comfirmLoading}
        cancelButtonProps={{ disabled: comfirmLoading }}
        onCancel={() => setOpenModalCart(false)}
        onOk={handleAddBookInCart}
      >
        <div className={styles.modalAddBook}>
          <InputNumber
            min={1}
            max={20}
            controls={{
              upIcon: <FontAwesomeIcon icon={faAdd} />,
              downIcon: <FontAwesomeIcon icon={faSubtract} />
            }}
            autoFocus={true}
            value={addBook}
            onChange={(quantity) => {
              if (quantity >= 1 && quantity <= 20) {
                setAddBook(quantity);
              }
            }}
            onPressEnter={handleAddBookInCart}
            className={styles.inputField}
          />
        </div>
      </Modal>
    </div>
  )
}

export default BookInfo;