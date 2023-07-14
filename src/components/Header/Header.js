import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faInfoCircle, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { Drawer, Space } from "antd";
import { useState } from "react";
import clsx from "clsx";
import { signOut } from "firebase/auth";

import styles from "./Header.module.css";
import { changeSearch, signOut as logOut } from "../../actions";
import Navigate from "../Navigate/Navigate";
import DrawerMenu from "../DrawerMenu/DrawerMenu";
import { auth } from "../../configs";

function Header({ loading }) {
  const [showDrawer, setShowDrawer] = useState(false);
  const user = useSelector(state => state.userReducer);
  const search = useSelector(state => state.searchReducer);
  const [searchInput, setSearchInput] = useState(search);
  const nav = useNavigate();
  const dispatch = useDispatch();
  
  const handelSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(logOut());
        localStorage.clear();
        setShowDrawer(false);
        nav("/");
      })
      .catch(err => console.error(`Error when trying sign out: ${err}`))
  }

  const handelNavToUserInfo = () => {
    setShowDrawer(false);
    nav("/user-info");
  }

  const actions = [
    {
      key: '1',
      label: (
        <div
          onClick={handelNavToUserInfo}
        >
          <Space size={12} align="center">
            <FontAwesomeIcon icon={faInfoCircle}
              className={styles.iconActionUser} />
            Thông tin cá nhân
          </Space>
        </div>
      ),
    },
    {
      type: 'divider'
    },
    {
      key: '2',
      label: (
        <div
          className={styles.signOut}
          onClick={handelSignOut}
        >
          <Space size={12} align="center">
            <FontAwesomeIcon icon={faSignOut}
              className={styles.iconActionUser} />
            Sign out
          </Space>
        </div>
      ),
    }
  ];

  const notifies = [
    {
      type: "notify",
      label: (
        <p>
          "The Lord of the rings" giảm đến 15%, mua ngay nào bạn ơi!!!
        </p>
      ),
    },
    {
      type: 'divider'
    },
    {
      type: "notify",
      label: (
        <p>
          Ngày 12/07 tới đây sale sập sàn các loại sách. Đừng bỏ lỡ bạn nhé!
        </p>
      ),
    },
    {
      type: 'divider'
    },
    {
      type: "notify",
      label: (
        <p>
          Khuyến mãi lên tới 20% cho các đầu sách thuộc thể loại trinh thám.<br />
          Nhanh tay mua hàng nào các bạn.
        </p>
      ),
    },
  ];

  const handleSearch = () => {
    const standardized = searchInput.trim();
    if (standardized !== "") {
      dispatch(changeSearch(standardized));
    } else {
      if (search !== " ")
        dispatch(changeSearch(" "));
    }
    nav("/filter");
  }

  return (
    <header className={styles.header}>
      <div className={clsx([styles.menuWrapper, "container"])}>
        <div className={styles.logo}>
          <Link
            to="/"
            className={styles.logoWrapper}
          >
            <div className={styles.wrapLogoImage}>
              <img className={styles.logoImage} src="/logo.png" alt="Library Logo" />
            </div>
            <div className={styles.logoName}>Library</div>
          </Link>
        </div>
        <div className={styles.search}>
          <div className={styles.wrapSearchImg}>
            <img className={styles.searchImg} src="/search.png" alt="Search" />
          </div>
          <div className={styles.searchInput}>
            <input
              className={styles.input}
              type="text"
              value={searchInput}
              placeholder="Tìm kiếm tên sách / tác giả"
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter")
                  handleSearch(searchInput);
              }}
            />
          </div>
          <div className={styles.searchBtn}>
            <button className={styles.button}
              onClick={handleSearch}
            >Tìm kiếm</button>
          </div>
        </div>
        <div className={styles.navigate}>
          <Navigate loading={loading} user={user} actions={actions} notifies={notifies} />
        </div>
        <div className={styles.navBars}>
          <FontAwesomeIcon
            icon={faBars}
            className={styles.barsIcon}
            onClick={() => setShowDrawer(true)}
          />
          <Drawer
            placement="left"
            open={showDrawer}
            width={240}
            bodyStyle={{ padding: 0 }}
            headerStyle={{
              padding: "4px 24px",
              flexDirection: "row-reverse"
            }}
            onClose={() => setShowDrawer(false)}
            closeIcon={
              (<></>)
            }
            extra={
              <div className={styles.logo}>
                <Link
                  to="/"
                  className={styles.logoWrapper}
                  onClick={() => setShowDrawer(false)}
                >
                  <div className={styles.wrapLogoImage}>
                    <img className={styles.logoImage} src="/logo.png" alt="Books Manangement" />
                  </div>
                  <div className={styles.logoName}>Library</div>
                </Link>
              </div>
            }
          >
            <DrawerMenu
              loading={loading}
              user={user}
              actions={actions}
              notifies={notifies}
              setShowDrawer={setShowDrawer}
            />
          </Drawer>
        </div>
      </div>
    </header >
  )
}

export default Header;