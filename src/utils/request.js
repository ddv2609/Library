// const API_DOMAIN = process.env.REACT_APP_API_BASE_URL;
const API_DOMAIN = "https://library-db-vercel.vercel.app";

export const logIn = async (path, user) => {
  try {
    const res = await fetch(`${API_DOMAIN}/${path}`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      }
    })
    return res;
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
        'Content-Type': 'application/json; charset=UTF-8',
      }
    })
    return res;
  } catch (err) {
    console.error(`Error when sign up: ${err}`)
  }
}

export const getBookInfo = async (pathBooks, pathComments, pathRates, pathCarts) => {
  try {
    const [bookResponse, commentsResponse, ratesResponse, cartsResponse] = await Promise.all([
      fetch(`${API_DOMAIN}/${pathBooks}`),
      fetch(`${API_DOMAIN}/${pathComments}`),
      fetch(`${API_DOMAIN}/${pathRates}`),
      fetch(`${API_DOMAIN}/${pathCarts}`)
    ]);

    return Promise.all([bookResponse.json(), commentsResponse.json(), ratesResponse.json(), cartsResponse.json()])
  } catch (err) {
    console.error(`Error why trying get book info: ${err}`);
  }
}

export const patchRate = async (pathBooks, booksBody, pathRates, ratesBody) => {
  try {
    const [bookRes, rateRes] = await Promise.all([
      fetch(`${API_DOMAIN}/${pathBooks}`, {
        method: "PATCH",
        mode: "cors",
        body: JSON.stringify(booksBody),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        }
      }),
      fetch(`${API_DOMAIN}/${pathRates}`, {
        method: "PATCH",
        mode: "cors",
        body: JSON.stringify(ratesBody),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        }
      })
    ]);

    return Promise.all([bookRes.json(), rateRes.json()]);
  } catch (err) {
    console.error(`Error why trying patch book rate: ${err}`);
  }
}

export const patchCart = async (path, payload) => {
  try {
    const res = await fetch(`${API_DOMAIN}/${path}`, {
      method: "PATCH",
      mode: "cors",
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
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
        'Content-Type': 'application/json; charset=UTF-8',
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
        'Content-Type': 'application/json; charset=UTF-8',
      }
    })
    return res.json();
  } catch (err) {
    console.error(`Error when trying edit comment: ${err}`);
  }
}