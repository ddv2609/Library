// const API_DOMAIN = process.env.REACT_APP_API_BASE_URL;
// export const API_DOMAIN = "https://library-db-vercel.vercel.app";
export const API_DOMAIN = "http://localhost:3004";
// export const API_DOMAIN = "https://repulsive-bell-bottoms.cyclic.app";
// export const API_DOMAIN = "https://global-heady-ray.glitch.me";

export const logIn = async (path, user) => {
  try {
    const res = await fetch(`${API_DOMAIN}/${path}`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    return res.json();
  } catch (err) {
    console.error(`Error when sign in: ${err}`)
  }
}

export const signUp = async (path, user) => {
  try {
    const res = await fetch(`${API_DOMAIN}/${path}`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    return res.json();
  } catch (err) {
    console.error(`Error when sign up: ${err}`)
  }
}

export const getBookInfo = async (pathBooks, pathComments, pathRates, pathCarts) => {
  try {
    const [bookResponse, commentsResponse, ratesResponse, cartsResponse, usersResponse] = await Promise.all([
      fetch(`${API_DOMAIN}/${pathBooks}`),
      fetch(`${API_DOMAIN}/${pathComments}`),
      fetch(`${API_DOMAIN}/${pathRates}`),
      fetch(`${API_DOMAIN}/${pathCarts}`),
      fetch(`${API_DOMAIN}/users`)
    ]);

    return Promise.all([
      bookResponse.json(), 
      commentsResponse.json(), 
      ratesResponse.json(), 
      cartsResponse.json(),
      usersResponse.json()
    ]);
  } catch (err) {
    console.error(`Error why trying get book info: ${err}`);
  }
}

export const patchRate = async (pathBooks, booksBody, pathRates, ratesBody) => {
  try {
    const bookRes = await fetch(`${API_DOMAIN}/${pathBooks}`, {
      method: "PATCH",
      mode: "cors",
      body: JSON.stringify(booksBody),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    const rateRes = await fetch(`${API_DOMAIN}/${pathRates}`, {
      method: "PATCH",
      mode: "cors",
      body: JSON.stringify(ratesBody),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })

    return Promise.all([bookRes.json(), rateRes.json()]);
  } catch (err) {
    console.error(`Error when trying patch book rate: ${err}`);
  }
}

export const addIntoCart = async (path, option, payload) => {
  try {
    const res = await fetch(`${API_DOMAIN}/${path}`, {
      method: `${option}`,
      mode: "cors",
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    return res.json();
  } catch (err) {
    console.error(`Error when trying add book in cart: ${err}`);
  }
}

export const deleteComment = async (path, payload) => {
  try {
    const res = await fetch(`${API_DOMAIN}/${path}`, {
      method: "PATCH",
      mode: "cors",
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    return res.json();
  } catch (err) {
    console.error(`Error when trying delete comment: ${err}`);
  }
}

export const editComment = async (path, payload) => {
  try {
    const res = await fetch(`${API_DOMAIN}/${path}`, {
      method: "PATCH",
      mode: "cors",
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    return res.json();
  } catch (err) {
    console.error(`Error when trying edit comment: ${err}`);
  }
}

export const getCart = async (path) => {
  try {
    const res = await fetch(`${API_DOMAIN}/${path}`);
    return res.json();
  } catch (err) {
    console.error(`Error when trying get books in cart: ${err}`);
  }
}

export const deleteCart = async (path, payload) => {
  try {
    const res = await fetch(`${API_DOMAIN}/${path}`, {
      method: "PATCH",
      mode: "cors",
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    return res.json();
  } catch (err) {
    console.error(`Error when trying delete book in cart: ${err}`);
  }
}

export const changeQuantity = async (path, payload) => {
  try {
    const res = await fetch(`${API_DOMAIN}/${path}`, {
      method: "PATCH",
      mode: "cors",
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    return res.json();
  } catch (err) {
    console.error(`Error when trying change quantity book in cart: ${err}`);
  }
}

export const getBooks = async (path) => {
  try {
    const res = await fetch(`${API_DOMAIN}/${path}`);
    return res.json();
  } catch (err) {
    console.error(`Error when trying get books: ${err}`);
  }
}

export const getHome = async (pathRecommend, pathNewRelease) => {
  try {
    const [recommendRes, releaseRes] = await Promise.all(
      [
        fetch(`${API_DOMAIN}/${pathRecommend}`),
        fetch(`${API_DOMAIN}/${pathNewRelease}`)
      ]
    )

    return Promise.all([recommendRes.json(), releaseRes.json()]);
  } catch (err) {
    console.error(`Error when trying get books in home page: ${err}`);
  }
}

export const getUser = async (path) => {
  try {
    const res = await fetch(`${API_DOMAIN}/${path}`);
    return res.json();
  } catch (err) {
    console.error(`Error when trying get user info: ${err}`);
  }
}

export const postUser = async (path, payload) => {
  try {
    const res = await fetch(`${API_DOMAIN}/${path}`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    return res.json();
  } catch (err) {
    console.error(`Error when trying post user info: ${err}`);
  }
}

export const changeUser = async (path, payload) => {
  try {
    const res = await fetch(`${API_DOMAIN}/${path}`, {
      method: "PATCH",
      mode: "cors",
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })

    return res.json();
  } catch (err) {
    console.error(`Error when trying change user info: ${err}`);
  }
}