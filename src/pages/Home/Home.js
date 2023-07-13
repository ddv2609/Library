import clsx from "clsx";
import { useEffect, useState } from "react";

import styles from "./Home.module.css";
import NewRelease from "../../components/NewRelease/NewRelease";
import BookRecommend from "../../components/BookRecommend/BookRecommend";

function Home() {
  const [booksRecommend, setBooksRecommend] = useState([]); 
  const [booksNewRelease, setbooksNewRelease] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Trang chủ";

    fetch("https://library-db-vercel.vercel.app/books?_sort=quantitySold,votes&_order=desc,desc&_start=0&_limit=24")
      .then(res => res.json())
      .then(recommend => {
        fetch("https://library-db-vercel.vercel.app/books?_sort=releaseDate&_order=desc&_start=0&_limit=24")
          .then(res => res.json())
          .then(release => {
            setBooksRecommend(recommend);
            setbooksNewRelease(release);
          })
      })

    return () => {
      document.title = "Library";
    }
  }, [])

  return (
    <div className={clsx([styles.home, "container"])}>
      <BookRecommend 
        booksRecommend={booksRecommend}
      />
      <NewRelease 
        booksNewRelease={booksNewRelease}
      />
    </div>
  )
}

export default Home;