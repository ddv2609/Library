import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from "./Error404.module.css";

function Error404() {
  const user = useSelector(state => state.userReducer);
  const nav = useNavigate();

  return (
    <>
      <div className={styles.error}>
        <div className={styles.notFound}>
          <div className={styles.notFound404}>
            <h3 className={styles.headingThird}>Oops! Page not found</h3>
            <h1 className={styles.headingFirst}>
              <span className={styles.span}>4</span>
              <span className={styles.span}>0</span>
              <span className={styles.span}>4</span>
            </h1>
          </div>
          <div>
            <h2 className={styles.headingSecond}>we are sorry, but the page you requested was not found</h2>
            <Button 
              type="primary" 
              onClick={() => user.role === "admin" ? nav("/admin") : nav("/")}
            >
              Go Home Page
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Error404;