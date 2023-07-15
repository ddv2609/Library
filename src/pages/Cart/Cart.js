import { useEffect, useState } from "react";
import { Checkbox, Col, Modal, Popconfirm, Row, Skeleton, message } from "antd";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileInvoice, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { QuestionCircleOutlined } from '@ant-design/icons';

import { changeQuantityBookInCart, deleteBookInCart, getBooksInCart } from "../../services";
import { API_DOMAIN } from "../../utils";
import styles from "./Cart.module.css";
import Error404 from "../../components/Error/Error404";
import BillInfo from "../../components/BillInfo/BillInfo";
import ItemBook from "../../components/ItemBook/ItemBook";

function Cart() {
  const [checked, setChecked] = useState({
    select: false,
    from: "leaf"
  });
  const [isModalOpen, setModalOpen] = useState(false);
  const [hasChecks, setHasChecks] = useState([]);
  const [booksInCart, setBookInCarts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Giỏ hàng";

    return () => {
      document.title = "Library";
    }
  }, [])

  useEffect(() => {
    const quantitys = [];
    getBooksInCart(localStorage.getItem("uid"))
      .then(({ books }) => {
        if (books) {
          Promise.all(books.map(({ bookID, quantity }) => {
            quantitys.push(quantity);
            return fetch(`${API_DOMAIN}/books/${bookID}`);
          }))
            .then(([...responses]) => Promise.all(responses.map(res => res.json())))
            .then(([...data]) => {
              setBookInCarts(data.map((book, index) => ({
                ...book,
                quantity: quantitys[index]
              })))
              setLoading(false);
            })
        } else {
          setLoading(false);
        }
      })
  }, [])

  const handleOpenModal = () => {
    setModalOpen(true);
  }

  const handleChangeCheck = () => {
    setHasChecks(() => (
      checked.select ? [] : booksInCart
    ));
    setChecked({
      select: !checked.select,
      from: "root"
    });
  }

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

  const handleDeleteBook = (bookID) => {
    const newBooksInCart = booksInCart.filter((book) => book.id !== bookID);

    deleteBookInCart(localStorage.getItem("uid"), {
      books: newBooksInCart.map(({ id, quantity }) => ({ bookID: id, quantity }))
    })
      .then(() => {
        message.success("Thực hiện xóa thành công!");
        setBookInCarts(newBooksInCart);
        setHasChecks([]);
      })
      .catch((err) => console.error(`Error when trying delete book has ID ${bookID} in cart: ${err}`))
  }

  const handleDeleteBooksChecked = () => {
    if (hasChecks.length > 0) {
      const IDsChecked = [];
      hasChecks.map(({ id }) => IDsChecked.push(id))
      const newBooksInCart = booksInCart.filter((book) => !IDsChecked.includes(book.id));

      deleteBookInCart(localStorage.getItem("uid"), {
        books: newBooksInCart.map(({ id, quantity }) => ({ bookID: id, quantity }))
      })
        .then(() => {
          message.success("Thực hiện xóa thành công!");
          setBookInCarts(newBooksInCart);
          setHasChecks([]);
        })
        .catch((err) => console.error(`Error when trying delete books checked in cart: ${err}`))
    } else {
      Modal.info({
        title: "Không có quyển sách nào được chọn",
        content: "Bạn phải chọn ít nhất một quyển sách trong giỏ hàng để thực hiện điều này!",
        okText: "Đã hiểu",
        onOk() { }
      })
    }
  }

  const handleChangeQuantity = (bookID, quantity) => {
    const newBooksInCart = booksInCart.filter((book) => book.id !== bookID);

    changeQuantityBookInCart(localStorage.getItem("uid"), {
      books: [...(newBooksInCart.map(({ id, quantity }) => ({ bookID: id, quantity }))), { bookID, quantity }]
    })
      .then(() => {
        message.success("Thực hiện thêm thành công!");
        setBookInCarts(prev => prev.map((book) => book.id === bookID ? { ...book, quantity } : book))
        setHasChecks([]);
      })
      .catch((err) => console.error(`Error when trying add book has ID ${bookID} in cart: ${err}`))
  }

  return (
    <>
      {localStorage.getItem("uid") ? (
        <div className={styles.cart}>
          <div className={clsx([styles.cartWrap, "container"])}>
            <Row gutter={[{ md: 16, lg: 16, xl: 32 }, 16]}>
              <Col xs={24} lg={16} xl={16}>
                <div className={styles.books}>
                  <div className={styles.selectAll}>
                    <Row align="middle" justify="space-between" gutter={[{ xs: 4 }]}>
                      <Col xs={14} sm={12} md={10}>
                        <div className={styles.checkboxSelectAll}>
                          <Checkbox
                            checked={checked.select}
                            onChange={handleChangeCheck}
                            disabled={booksInCart.length === 0}
                          >
                            <span className={styles.spanSelectAll}>CHỌN TẤT CẢ ({booksInCart.length} SẢN PHẨM)</span>
                          </Checkbox>
                        </div>
                      </Col>
                      <Col xs={8} sm={9} md={10}>
                        <div
                          className={styles.viewBill}
                          onClick={handleOpenModal}
                        >
                          <FontAwesomeIcon icon={faFileInvoice} className={styles.iconFileInvoice} />
                          <span>ĐƠN HÀNG</span>
                        </div>
                      </Col>
                      <Col xs={2} sm={3} md={3}>
                        <Popconfirm
                          title="Xóa sách khỏi giỏ hàng"
                          description="Bạn có chắc muốn xóa tất cả những cuốn sách đã chọn khỏi giỏ hàng?"
                          icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                          onConfirm={handleDeleteBooksChecked}
                        >
                          <div className={styles.delete}>
                            <FontAwesomeIcon icon={faTrashAlt} className={styles.iconTrash} />
                            <span className={styles.deleteAll}>XÓA</span>
                          </div>
                        </Popconfirm>
                      </Col>
                    </Row>
                  </div>
                  {booksInCart.length > 0 ? booksInCart.map((book, index) => (
                    <ItemBook key={index} book={book}
                      hasChecks={hasChecks} onHasChecks={setHasChecks}
                      checked={checked} onChecked={setChecked}
                      standardizeMoney={standardizeMoney}
                      calculateRating={calculateRating}
                      handleDeleteBook={handleDeleteBook}
                      handleChangeQuantity={handleChangeQuantity}
                    />
                  )) : (
                    loading ? (
                      [...Array(3)].map((_, index) => (
                        <div className={styles.bookInCart} key={index}>
                          <Row gutter={[12, 0]} align="middle">
                            <Col xs={2} sm={1}>
                              <Checkbox disabled></Checkbox>
                            </Col>
                            <Col xs={16} sm={14}>
                              <div className={styles.bookInfo}>
                                <Row gutter={{ xs: 0, sm: 6, md: 12 }} align="middle">
                                  <Col span={6}>
                                    <div className={styles.bookCover}>
                                      <Skeleton.Image className={styles.image} active></Skeleton.Image>
                                    </div>
                                  </Col>
                                  <Col span={18}>
                                    <div className={styles.infoDetail}>
                                      {[...Array(2)].map((_, index) => (
                                        <div key={`skeleton-${index}`} className={styles.info}>
                                          <Skeleton
                                            active
                                            title={false}
                                            size="small"
                                            style={{ width: "80%" }}
                                          ></Skeleton>
                                        </div>
                                      ))}
                                    </div>
                                  </Col>
                                </Row>
                              </div>
                            </Col>
                            <Col xs={6} sm={6}>
                              {[...Array(2)].map((_, index) => (
                                <div key={`skeleton-${index}`} className={styles.priceAndBuy}>
                                  <Skeleton
                                    active
                                    title={false}
                                    size="small"
                                    style={{ width: "100%" }}
                                  ></Skeleton>
                                </div>
                              ))}
                            </Col>
                          </Row>
                        </div>
                      ))
                    ) : (<></>)
                  )}
                </div>
              </Col>
              <Col lg={8} xl={8}>
                <BillInfo
                  hasChecks={hasChecks}
                  standardizeMoney={standardizeMoney}
                />
                <Modal
                  open={isModalOpen}
                  width={364}
                  onCancel={() => setModalOpen(false)}
                  footer={[]}
                >
                  <div className={styles.invoiceWrapper}>
                    <BillInfo
                      hasChecks={hasChecks}
                      display="keepShowInvoice"
                      standardizeMoney={standardizeMoney}
                    />
                  </div>
                </Modal>
              </Col>
            </Row>
          </div>
        </div>
      ) : <Error404 />}
    </>
  )
}

export default Cart;