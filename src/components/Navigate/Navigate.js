import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping, faBell, faFilter, faHome, faSignIn, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { Dropdown, Space } from "antd";

import styles from "./Navigate.module.css";

function Navigate({ loading, user, actions, notifies }) {
  return (
    <div className={styles.pages}>
      <ul className={styles.unorderList}>
        <li className={styles.list}>
          <Link
            className={styles.anchor}
            to={user.role === "admin" ? "/admin" : "/"}
          >
            <Space size={6} align="center">
              <FontAwesomeIcon icon={faHome} className={styles.icon} />
              Home
            </Space>
          </Link>
        </li>
        {loading || user.uid ? (
          user.uid ? (
            <>
              <li className={styles.list}>
                <Link className={styles.anchor} to='/cart'>
                  <Space size={6} align="center">
                    <FontAwesomeIcon icon={faBagShopping} className={styles.icon} />
                    Cart
                  </Space>
                </Link>
              </li>
              <li className={styles.list}>
                <Link className={styles.anchor} to='/filter'>
                  <Space size={6} align="center">
                    <FontAwesomeIcon icon={faFilter} className={styles.icon} />
                    Filter
                  </Space>
                </Link>
              </li>
              <li className={styles.list}>
                <div className={styles.notify}>
                  <Dropdown
                    menu={{ items: notifies }}
                    placement="bottomRight"
                    arrow={{ pointAtCenter: true }}
                    trigger="click"
                  >
                    <FontAwesomeIcon icon={faBell} className={styles.notifyIcon} />
                  </Dropdown>
                </div>
              </li>
              <li className={styles.list}>
                <Dropdown
                  menu={{ items: actions }}
                  placement="bottomRight"
                  arrow={{ pointAtCenter: true }}
                  trigger="click"
                >
                  <Space>
                    <div className={styles.userIcon}>
                      <img className={styles.avatar} src={user.avatar || "/avatar.png"} alt="Avatar" />
                    </div>
                  </Space>
                </Dropdown>
              </li>
            </>
          ) : (<></>)
        ) : (
          <>
            <li className={styles.list}>
              <Link className={styles.anchor} to="/sign-in">
                <Space size={6} align="center">
                  <FontAwesomeIcon icon={faSignIn} className={styles.icon} />
                  Sign in
                </Space>
              </Link>
            </li>
            <li className={styles.list}>
              <Link className={styles.anchor} to="/sign-up">
                <Space size={6} align="center">
                  <FontAwesomeIcon icon={faUserPlus} className={styles.icon} />
                  Sign up
                </Space>
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  )
}

export default Navigate;