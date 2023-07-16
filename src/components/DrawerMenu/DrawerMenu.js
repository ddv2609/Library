import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping, faBell, faFilter, faHome, faSignIn, faUser, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { Divider, Dropdown, Modal, Space } from "antd";

import styles from "./DrawerMenu.module.css";
import { useState } from "react";

function DrawerMenu({ loading, user, actions, notifies, setShowDrawer }) {
  const [openModal, setOpenModal] = useState(false);

  const handleCloseDrawer = () => {
    setShowDrawer(false);
  }

  const handleCancelModal = () => {
    setOpenModal(false);
  }

  const handleOpenModal = () => {
    setOpenModal(true);
  }

  return (
    <div className={styles.drawer}>
      <ul className={styles.unorderList}>
        <li
          className={styles.list}
          onClick={handleCloseDrawer}
        >
          <Link
            className={styles.anchor}
            to="/"
          >
            <Space size={32} align="center">
              <FontAwesomeIcon icon={faHome} className={styles.icon} />
              <span>Trang chủ</span>
            </Space>
          </Link>
        </li>
        <li
          className={styles.list}
          onClick={handleCloseDrawer}
        >
          <Link className={styles.anchor} to='/filter'>
            <Space size={32} align="center">
              <FontAwesomeIcon icon={faFilter} className={styles.icon} />
              <span>Bộ lọc</span>
            </Space>
          </Link>
        </li>
        {loading || user.id ? (
          user.id ? (
            <>
              <li
                className={styles.list}
                onClick={handleCloseDrawer}
              >
                <Link className={styles.anchor} to='/cart'>
                  <Space size={32} align="center">
                    <FontAwesomeIcon icon={faBagShopping} className={styles.icon} />
                    <span>Giỏ hàng</span>
                  </Space>
                </Link>
              </li>
              <li
                className={styles.list}
                onClick={handleCloseDrawer}
              >
                <div
                  className={styles.notifies}
                  onClick={handleOpenModal}
                >
                  <a
                    href="#"
                    className={styles.action}
                    onClick={(e) => e.preventDefault()}
                  >
                    <Space size={32} align="center">
                      <FontAwesomeIcon icon={faBell} className={styles.icon} />
                      <span>Thông báo</span>
                    </Space>
                  </a>
                </div>
                <Modal
                  title="Thông báo"
                  open={openModal}
                  footer={null}
                  onCancel={handleCancelModal}
                >
                  {notifies.map((notify, index) => (
                    notify.type === "notify" ? (
                      <div key={index} className={styles.notify}>
                        {notify.label}
                      </div>
                    ) : (
                      <Divider key={index} className={styles.separate} />
                    )
                  ))}
                </Modal>
              </li>
              <li
                className={styles.list}
              >
                <Dropdown
                  className={styles.dropdown}
                  menu={{ items: actions }}
                  placement="bottom"
                  // arrow={{ pointAtCenter: true }}
                  trigger="click"
                >
                  <a
                    href="#"
                    className={styles.action}
                    onClick={(e) => e.preventDefault()}
                  >
                    <Space size={32} align="center">
                      <FontAwesomeIcon icon={faUser} className={styles.icon} />
                      <span>Người dùng</span>
                    </Space>
                  </a>
                </Dropdown>
              </li>
            </>
          ) : (<></>)
        ) : (
          <>
            <li
              className={styles.list}
              onClick={handleCloseDrawer}
            >
              <Link className={styles.anchor} to="/sign-in">
                <Space size={32} align="center">
                  <FontAwesomeIcon icon={faSignIn} className={styles.icon} />
                  <span>Đăng nhập</span>
                </Space>
              </Link>
            </li>
            <li
              className={styles.list}
              onClick={handleCloseDrawer}
            >
              <Link className={styles.anchor} to="/sign-up">
                <Space size={32} align="center">
                  <FontAwesomeIcon icon={faUserPlus} className={styles.icon} />
                  <span>Đăng ký</span>
                </Space>
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  )
}

export default DrawerMenu;