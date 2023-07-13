import { useEffect, useRef, useState } from "react";
import { Button } from "antd";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../configs";

import styles from "./SignUp.module.css";
import { postUserInfo } from "../../services";
// import { signUp } from "../../utils";

function SignUp() {
  const [user, setUser] = useState({});
  const [classList, setClassList] = useState("");
  const [loading, setLoading] = useState(false);
  const notifyInfo = useRef();
  const nav = useNavigate();

  const handelSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // signUp("sign-up", user)
    //   .then((response) => {
    //     setLoading(false);
    //     if (response.status === 200) {
    //       nav("/sign-in");
    //     } else {
    //       if (response.status === 204) {
    //         if (!notifyInfo.current.classList.contains(styles.active)) {
    //           notifyInfo.current.classList.add(styles.active);
    //         }
    //         notifyInfo.current.innerText = "Username or Email already exists, please re-enter.";
    //       }
    //     }
    //     return response.json();
    //   })
    //   .catch((err) => console.error(`Error when sign up: ${err}`)

    await createUserWithEmailAndPassword(auth, user.email, user.password)
      .then((userCredential) => {
        // fetch(`https://library-db-vercel.vercel.app/users`, {
        //   method: "POST",
        //   mode: "cors",
        //   body: JSON.stringify({
        //     id: userCredential.user.uid,
        //     username: user.username,
        //     firstName: user.firstName,
        //     lastName: user.lastName
        //   }),
        //   headers: {
        //     'Content-Type': 'application/json; charset=UTF-8',
        //   }
        // })
        postUserInfo({
          id: userCredential.user.uid,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName
        })
          .then(() => {
            setLoading(false);
            nav("/sign-in");
          })
          .catch(err => console.error(`Error when trying post user info: ${err}`))
      })
      .catch(err => console.error(`Error when trying sign up: ${err}`))
  }

  const handleChangeEmail = (e) => {
    setUser({
      ...user,
      email: e.target.value
    });
    removeNotification();
  }

  const handelChangeUser = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const removeNotification = () => {
    if (notifyInfo.current.classList.contains(styles.active)) {
      notifyInfo.current.classList.remove(styles.active);
    }
    notifyInfo.current.innerText = "";
  }

  useEffect(() => {
    document.title = "Đăng ký";

    return () => {
      document.title = "Library";
    }
  })

  return (
    <div className={styles.signUpForm}>
      <h1 className={styles.headingFirst}>Sign Up</h1>
      <form className={styles.form} method="post" onSubmit={(e) => handelSubmit(e)}>
        <div className={styles.txtField}>
          <input
            type="email"
            name="email"
            className={clsx([classList, styles.input, styles.inputEmail])}
            onChange={(e) => handleChangeEmail(e)}
            onBlur={(e) => {
              if (e.target.value !== "") {
                if (!classList.includes(styles.activeEmail)) {
                  setClassList(styles.activeEmail);
                }
              } else {
                setClassList("");
              }
            }}
            required />
          <span className={styles.span}></span>
          <label className={styles.label}>Email</label>
        </div>
        <div className={styles.txtField}>
          <input
            className={styles.input}
            type="text"
            name="firstName"
            onChange={(e) => handelChangeUser(e)}
            required
          />
          <span className={styles.span}></span>
          <label className={styles.label}>First name</label>
        </div>
        <div className={styles.txtField}>
          <input
            className={styles.input}
            type="text"
            name="lastName"
            onChange={(e) => handelChangeUser(e)}
            required
          />
          <span className={styles.span}></span>
          <label className={styles.label}>Last name</label>
        </div>
        {/* <div className={styles.txtField}>
          <input className={styles.input} type="text" onChange={(e) => changeUsername(e)}
            onFocus={removeNotification} required />
          <span className={styles.span}></span>
          <label className={styles.label}>Username</label>
        </div> */}
        <div className={styles.txtField}>
          <input
            className={styles.input}
            type="password"
            name="password"
            onChange={(e) => handelChangeUser(e)}
            required
          />
          <span className={styles.span}></span>
          <label className={styles.label}>Password</label>
        </div>
        <div className={styles.notification}>
          <span ref={notifyInfo} className={styles.spanNotify}></span>
        </div>
        <Button
          className={styles.button}
          htmlType="submit"
          loading={loading}
        >
          Sign Up
        </Button>
      </form>
    </div>
  )
}

export default SignUp;