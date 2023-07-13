import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";

import { signIn } from "../../actions";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useEffect, useState } from "react";
import { getUserInfo } from "../../services";

function LayoutDefault() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const uid = localStorage.getItem("uid");
    if (uid !== undefined) {
      // fetch(`https://library-db-vercel.vercel.app/users/${uid}`)
      //   .then(res => res.json())
      getUserInfo(uid)
        .then(user => {
          dispatch(signIn(user));
          setLoading(false);
        })
        .catch(err => console.error(`Error when trying get user info: ${err}`))
    }
  }, [])

  return (
    <Layout 
      style={{
        backgroundColor: "#fff"
      }}
    >
      <Header loading={loading} />
      <Outlet />
      <Footer />
    </Layout>
  )
}

export default LayoutDefault;