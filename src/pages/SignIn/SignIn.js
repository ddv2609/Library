import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Modal, message } from "antd";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../configs";
import clsx from "clsx";

import styles from "./SignIn.module.css";
// import { logIn } from "../../utils";
import { signIn } from "../../actions";

function SignIn() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [classList, setClassList] = useState("");
  const nav = useNavigate();
  const notifyInfo = useRef();
  const formRef = useRef();
  const dispatch = useDispatch();

  const [messageApi, contextHolder] = message.useMessage();

  const handelSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // logIn("sign-in", user)
    //   .then((response) => {
    //     setLoading(false);
    //     if (response.status === 200) {
    //       return response.json();
    //     } else {
    // if (!notifyInfo.current.classList.contains(styles.active)) {
    //   notifyInfo.current.classList.add(styles.active);
    // }
    // notifyInfo.current.innerText = "Incorrect username or password."
    //     }
    //   })
    //   .then((data) => {
    //     if (data) {
    //       dispatch(signIn(data));
    //       for (let key in data) {
    //         localStorage.setItem(key, data[key]);
    //       }
    //       messageApi.open({
    //         type: "info",
    //         content: `Hello, ${localStorage.getItem("firstName")} ${localStorage.getItem("lastName")}!`,
    //         duration: 0.75,
    //       })
    //         .then(() => data.role === 'admin' ? nav('/admin') : nav('/'))
    //     }
    //   })
    //   .catch((err) => console.error(`Error when sign in: ${err}`))
    await signInWithEmailAndPassword(auth, user.email, user.password)
      .then((userCredential) => {
        localStorage.setItem("uid", userCredential.user.uid)
        dispatch(signIn(user))
        setLoading(false);
        messageApi.open({
          type: "success",
          content: "Đăng nhập thành công!",
          duration: 0.75,
        })
          .then(() => nav("/")) 
      })
      .catch(err => {
        setLoading(false);
        if (err.code === "auth/wrong-password" || err.code === "auth/user-not-found") {
          if (!notifyInfo.current.classList.contains(styles.active)) {
            notifyInfo.current.classList.add(styles.active);
          } else {
            notifyInfo.current.classList.remove(styles.active);
          }
          notifyInfo.current.innerText = "Incorrect email or password."
        } else {
          if (err.code === "auth/too-many-requests") {
            Modal.warning({
              title: "Từ chối đăng nhập",
              content: "Quyền truy cập vào tài khoản này đã tạm thời bị vô hiệu hóa do nhiều lần đăng nhập không thành công. Bạn có thể khôi phục ngay lập tức bằng cách đặt lại mật khẩu của mình hoặc bạn có thể thử lại sau.",
              okText: "Đã hiểu",
              onOk() { }
            })
          }
        }
      })
  }

  const changeField = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
    removeNotification();
  }

  const removeNotification = () => {
    if (notifyInfo.current.classList.contains(styles.active)) {
      notifyInfo.current.classList.remove(styles.active);
    }
    notifyInfo.current.innerText = "";
  }

  useEffect(() => {
    document.title = "Đăng nhập";

    return () => {
      document.title = "Library";
    }
  })

  return (
    <>
      {contextHolder}
      <div className={styles.signInForm}>
        <h1 className={styles.headingFirst}>Sign In</h1>
        <form
          ref={formRef}
          className={styles.form}
          method="post"
          onSubmit={(e) => handelSubmit(e)}
        >
          <div>
            <span ref={notifyInfo} className={styles.spanNotify}></span>
          </div>
          <div className={styles.txtField}>
            {/* <input className={styles.input} type="email"
              name="email" onChange={(e) => changeField(e)}
              onFocus={removeNotification} required
            /> */}
            <input
              type="email"
              name="email"
              className={clsx([classList, styles.input, styles.inputEmail])}
              onChange={(e) => changeField(e)}
              onBlur={(e) => {
                if (e.target.value !== "") {
                  if (!classList.includes(styles.activeEmail)) {
                    setClassList(styles.activeEmail);
                  }
                } else {
                  setClassList("");
                }
              }}
              required
            />
            <span className={styles.span}></span>
            <label className={styles.label}>Email</label>
          </div>
          <div className={styles.txtField}>
            <input className={styles.input} type="password" name="password" onChange={(e) => changeField(e)}
              onFocus={removeNotification} required />
            <span className={styles.span}></span>
            <label className={styles.label}>Password</label>
          </div>
          <div className={styles.pass}>Forgot Password?</div>
          <Button
            className={styles.button}
            htmlType="submit"
            loading={loading}
          >
            Sign In
          </Button>
          <div className={styles.signUpLink}>
            Not a member? <p className={styles.paragraph} onClick={(e) => nav("/sign-up")}>Sign up</p>
          </div>
        </form>
      </div>
    </>
  )
}

export default SignIn;