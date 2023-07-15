import { Button, Checkbox, Col, InputNumber, Modal, Popconfirm, Rate, Row } from "antd";
import { QuestionCircleOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faCartPlus, faSubtract, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./ItemBook.module.css";

function ItemBook({ book, hasChecks, onHasChecks, checked, onChecked,
  standardizeMoney, calculateRating, handleDeleteBook, handleChangeQuantity }) {
  const [select, setSelect] = useState(false);
  const [addBook, setAddBook] = useState(book.quantity);
  const [openModalCart, setOpenModalCart] = useState(false);

  const statusBefore = useRef(false);
  const nav = useNavigate();


  const bookHasChecked = (check) => {
    if (check) {
      return hasChecks.filter((item) => item.id !== book.id);
    } else {
      if (!hasChecks.includes(book.id)) {
        return [...hasChecks, book];
      }
    }
  }

  const handleChecked = () => {
    if (checked.from === "root") {
      onHasChecks(bookHasChecked(checked.select));
      onChecked({
        select: false,
        from: "leaf",
      });
      statusBefore.current = !checked.select;
    } else {
      onHasChecks(bookHasChecked(select));
      setSelect(!select);
    }
  }

  useEffect(() => {
    if (checked.from === "leaf") {
      setSelect(statusBefore.current);
    } else {
      statusBefore.current = checked.select;
    }
  }, [checked])

  return (
    <>
      <div className={styles.bookInCart}>
        <Row gutter={[12, 0]} align="middle">
          <Col xs={2} sm={1}>
            <Checkbox
              checked={checked.from === "root" ? checked.select : select}
              onChange={handleChecked}
            ></Checkbox>
          </Col>
          <Col xs={16} sm={14}>
            <div className={styles.bookInfo}>
              <Row gutter={{ xs: 4, sm: 6, md: 12 }} align="middle">
                <Col xs={6}>
                  <div className={styles.bookCover}>
                    <img
                      src={book.cover}
                      alt={book.title}
                      className={styles.image}
                      onClick={() => nav(`/book-info/${book.id}`)}
                    />
                  </div>
                </Col>
                <Col xs={18}>
                  <div className={styles.info}>
                    <p className={styles.name} title={book.title}>
                      <span className={styles.title}>Tên sách:</span> {book.title}
                    </p>
                    <p className={styles.author} title={book.author}>
                      <span className={styles.title}>Tác giả:</span> {book.author}
                    </p>
                    <p className={styles.sold} title={book.quantitySold}>
                      <span className={styles.title}>Đã bán:</span> {book.quantitySold}
                    </p>
                    <div className={styles.rate}>
                      <span className={styles.title}>Đánh giá:</span>
                      <span>
                        <Rate allowHalf value={calculateRating(book.stars, book.votes)} disabled className={styles.stars} />
                      </span>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
          <Col xs={6} sm={6}>
            <div className={styles.priceAndBuy}>
              <div className={styles.price}>
                {book.saleOff > 0 ? (
                  <>
                    <p className={styles.cost}><del>{standardizeMoney(parseInt(book.price).toString())} vnđ</del></p>
                    <p className={styles.saleOff}>-{book.saleOff * 100}%</p>
                  </>
                ) : (<></>)}
                <p className={styles.currentPrice}>{standardizeMoney(parseInt(book.price * (1 - book.saleOff)).toString())} vnđ</p>
              </div>
              <div className={styles.addBook}>
                <InputNumber
                  min={1}
                  max={20}
                  value={addBook}
                  onChange={(quantity) => {
                    if (quantity >= 1 && quantity <= 20) {
                      setAddBook(quantity);
                    }
                  }}
                  addonBefore={
                    <Popconfirm
                      title="Xác nhận số lượng"
                      description={addBook === book.quantity ? "Số lượng sách bạn muốn thay đổi không khác so với ban đầu!" : `Bạn xác nhận muốn thêm ${addBook} quyển này vào giỏ hàng?`}
                      okText={addBook === book.quantity ? "Đã hiểu" : "Có"}
                      showCancel={addBook !== book.quantity}
                      cancelText="Không"
                      onConfirm={() => {
                        if (addBook !== book.quantity) {
                          handleChangeQuantity(book.id, addBook)
                        }
                      }}
                    >
                      <div className={styles.addBtn}>
                        <FontAwesomeIcon icon={faCartPlus}
                          className={styles.iconAddCart}
                        />
                      </div>
                    </Popconfirm>
                  }
                  controls={{
                    upIcon: <FontAwesomeIcon icon={faAdd} />,
                    downIcon: <FontAwesomeIcon icon={faSubtract} />
                  }}
                  className={styles.inputField}
                />
              </div>
              <div className={styles.addBookWraper}>
                <Button
                  quantity={book.quantity}
                  className={styles.btnAddBook}
                  onClick={() => setOpenModalCart(true)}
                >
                  <FontAwesomeIcon icon={faCartPlus}
                    className={styles.iconAddCart}
                  />
                </Button>
              </div>
            </div>
          </Col>
          <Col sm={3}>
            <div className={styles.delete}>
              <Popconfirm
                title="Xóa sách khỏi giỏ hàng"
                description="Bạn có chắc muốn xóa cuốn sách này khỏi giỏ hàng?"
                icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                onConfirm={() => handleDeleteBook(book.id)}
              >
                <FontAwesomeIcon icon={faTrashAlt} className={styles.deleteBook} />
              </Popconfirm>
            </div>
          </Col>
        </Row>
      </div>
      <Modal
        title={`Bạn muốn thêm bao nhiêu cuốn "${book.title}" vào giỏ hàng?`}
        cancelText="Thoát"
        okText="Thêm"
        open={openModalCart}
        closable={false}
        onCancel={() => setOpenModalCart(false)}
        onOk={() => {
          if (addBook !== book.quantity) {
            handleChangeQuantity(book.id, addBook);
            setOpenModalCart(false);
          } else {
            Modal.info({
              title: "Số lượng không đổi",
              content: "Bạn phải thay đổi số lượng sách muốn thêm khác với số lượng đang có trong giỏ hàng!",
              okText: "Đã hiểu",
              onOk() { }
            })
          }
        }}
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
            onPressEnter={() => {
              if (addBook !== book.quantity) {
                handleChangeQuantity(book.id, addBook);
                setOpenModalCart(false);
              } else {
                Modal.info({
                  title: "Số lượng không đổi",
                  content: "Bạn phải thay đổi số lượng sách muốn thêm khác với số lượng đang có trong giỏ hàng!",
                  okText: "Đã hiểu",
                  onOk() { }
                })
              }
            }}
            className={styles.inputField}
          />
        </div>
      </Modal>
    </>
  )
}

export default ItemBook;