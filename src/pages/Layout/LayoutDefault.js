import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";

import { signIn } from "../../actions";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useEffect } from "react";

function LayoutDefault() {
  const dispatch = useDispatch();

  useEffect(() => {
    const uid = localStorage.getItem("uid");
    if (uid !== undefined) {
      fetch(`http://localhost:3004/users/${uid}`)
        .then(res => res.json())
        .then(user => dispatch(signIn(user)))
        .catch(err => console.error(`Error when trying get user info: ${err}`))
    }
  }, [])

  return (
    <Layout 
      style={{
        backgroundColor: "#fff"
      }}
    >
      <Header />
      <Outlet />
      <Footer />
    </Layout>
  )
}

export default LayoutDefault;