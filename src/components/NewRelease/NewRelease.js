import { Divider } from "antd";

import styles from "./NewRelease.module.css";
import BooksList from "../BooksList/BooksList";

function NewRelease( { booksNewRelease, calculateRating } ) {
  return (
    <div className={styles.newRelease}>
      <Divider orientation="left" className={styles.separate}>
        <h2 className={styles.headingSecond}>Sách mới phát hành</h2>
      </Divider>
      <div className={styles.newReleaseBooks}>
        <BooksList 
          books={booksNewRelease} 
          calculateRating={calculateRating}
        />
      </div>
    </div>
  )
}

export default NewRelease;