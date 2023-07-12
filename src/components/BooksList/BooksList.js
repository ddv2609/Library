import { Col, Row, Skeleton } from "antd";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import styles from "./BooksList.module.css";
import { memo } from "react";

function BooksList({ books, loading }) {
  const nav = useNavigate();

  const standardizeMoney = (money) => {
    const digits = money.split("").reverse();
    return digits.map((digit, index) => (
      index !== 0 && index % 3 === 0 ? digit + "." : digit
    )).reverse().join("");
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

  return (
    <div className={styles.booksList}>
      
      {books.length > 0 ? (
        <Row
          align="middle"
          justify="space-evenly"
          gutter={{ xs: 16, sm: 2, md: 16, lg: 16, xl: 0 }}
        >
          {books.map((book) => (
            <Col
              key={`ID-${book.id}`}
              xs={10} sm={9} md={7} lg={5} xl={4}
            >
              <div
                className={styles.book}
                stars={calculateRating(book.stars, book.votes)}
                onClick={() => {
                  if (loading !== undefined) {
                    localStorage.setItem("offsetY", window.scrollY);
                  }
                  nav(`/book-info/${book.id}`);
                }}
              >
                <div className={styles.bookCover}>
                  <img className={styles.bookImage} src={book.cover} alt={book.title} />
                </div>
                <div className={styles.bookInfo}>
                  <div className={styles.bookTitle}>
                    <p className={styles.title} title={book.title}>{book.title}</p>
                  </div>
                  <div className={styles.bookAuthor}>
                    <p className={styles.author} title={book.author}>{book.author}</p>
                  </div>
                  <div className={styles.bookPrice}>
                    <p className={styles.price}>
                      {book.saleOff !== 0 ? (
                        <>
                          <span className={styles.cost}><del>{standardizeMoney(Number(book.price).toString())} vnđ</del></span>
                          <span className={styles.saleOff}>-{book.saleOff * 100}%</span>
                        </>
                      ) : (
                        <>
                          <span className={styles.cost}></span>
                          <span className={styles.saleOff}></span>
                        </>
                      )}
                    </p>
                  </div>
                  <div className={styles.bookOther}>
                    <p className={styles.extra}
                      title={`${standardizeMoney((book.price * (1 - book.saleOff)).toFixed(0).toString())} vnđ | Đã bán ${book.quantitySold}`}
                    >
                      <strong>{standardizeMoney((book.price * (1 - book.saleOff)).toFixed(0).toString())} vnđ</strong> | Đã bán <span className={styles.sold}>{book.quantitySold}</span>
                    </p>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      ) : (
        loading || loading === undefined ? (
          <Row
            align="middle"
            justify="space-evenly"
            gutter={{ xs: 16, sm: 2, md: 16, lg: 16, xl: 0 }}
          >
            {[...Array(24)].map((_, index) => (
              <Col
                key={`ID-${index}`}
                xs={10} sm={9} md={7} lg={5} xl={4}
              >
                <div
                  className={styles.book}
                >
                  <div className={styles.bookCover}>
                    <Skeleton.Image active paragraph={false} className={styles.skeletonBookCover} />
                  </div>
                  <div className={styles.bookInfoSkeleton}>
                    <div className={styles.bookTitle}>
                      <Skeleton.Button active paragraph={false} className={styles.skeletonTitle} />
                    </div>
                    <div className={styles.bookAuthor}>
                      <Skeleton.Button active paragraph={false} className={styles.skeletonTitle} />
                    </div>
                    <div className={styles.bookPrice}>
                      <Skeleton.Button active paragraph={false} className={styles.skeletonTitle} />
                    </div>
                    <div className={styles.bookOther}>
                      <Skeleton.Button active paragraph={false} className={styles.skeletonTitle} />
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        ) : (
          <p className={styles.resultNotFound}>
            <FontAwesomeIcon icon={faSearch} className={styles.iconSearchResult} />
            Không tìm thấy kết quả phù hợp
          </p>
        )
      )
      }
    </div >
  )
}

export default memo(BooksList);