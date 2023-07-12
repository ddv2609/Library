import { Carousel, Col, Divider, Row, Skeleton } from "antd";
import { useNavigate } from "react-router-dom";

import styles from "./BookRecommend.module.css";

function BookRecommend({ booksRecommend }) {
  const nav = useNavigate();

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
    <div className={styles.bookRecommend}>
      <Divider orientation="left" className={styles.separate}>
        <h2 className={styles.headingSecond}>Sách đề cử</h2>
      </Divider>
      <div className={styles.carouselBook}>
        <Carousel
          autoplaySpeed={4500}
          autoplay
        >
          {[...Array(4)].map((_, index) => (
            <div key={index}>
              <Row align="space-evenly">
                {booksRecommend.length > 0 ? booksRecommend.slice(index * 6, (index + 1) * 6).map((book) => (
                  <Col span={4} key={`ID-${book.id}`}>
                    <div
                      className={styles.book}
                      stars={calculateRating(book.stars, book.votes)}
                      onClick={() => nav(`/book-info/${book.id}`)}
                    >
                      <div className={styles.bookCover}>
                        <img className={styles.bookImage} src={book.cover} alt={book.title} />
                      </div>
                      <div className={styles.bookTitle}>
                        <p className={styles.title} title={book.title}>{book.title}</p>
                      </div>
                    </div>
                  </Col>
                )) : (
                  [...Array(6)].map((_, index) => (
                    <Col span={4} key={`ID-${index}`}>
                      <div
                        className={styles.book}
                      >
                        <div className={styles.bookCover}>
                          <Skeleton.Image active paragraph={false} className={styles.skeletonBookCover} />
                        </div>
                        <div className={styles.bookInfoSkeleton}>
                          <Skeleton.Button active paragraph={false} className={styles.skeletonTitle} />
                        </div>
                      </div>
                    </Col>
                  ))
                )}
              </Row>
            </div>
          ))}
        </Carousel>
      </div>
    </div >
  )
}

export default BookRecommend;