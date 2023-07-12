// const API_DOMAIN = process.env.REACT_APP_API_BASE_URL;
const API_DOMAIN = "http://localhost:8080";

export const get = async (path) => {
  try {
    const res = await fetch(`${API_DOMAIN}${path}`);
    return res.json();
  } catch (err) {
    console.error(`Error when getting books: ${err}`);
  }
}

export const del = async (path, book) => {
  try {
    const res = await fetch(`${API_DOMAIN}${path}`, {
      method: "DELETE",
      mode: "cors",
      body: JSON.stringify(book),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      }
    })
    return res.json();
  } catch (err) {
    console.error(`Error when deleting book: ${err}`)
  }
}

export const getDetail = async (pathItem, pathImage) => {
  try {
    const [response, image] = await Promise.all([
      fetch(`${API_DOMAIN}${pathItem}`),
      fetch(`${API_DOMAIN}${pathImage}`)
    ]);
    return Promise.all([response.json(), Promise.resolve(image)]);
  } catch (err) {
    console.error(`Error when getting book: ${err}`)
  }
}

export const save = async (pathCreate, pathSave, book, bookcode) => {
  try {
    const res = await fetch(bookcode < 0 ? `${API_DOMAIN}${pathCreate}` : `${API_DOMAIN}${pathSave}`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(book),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      }
    })

    return res.json();
  } catch (err) {
    console.error(`Error when changing / adding new book: ${err}`);
  }
}

export const upload = async (path, image) => {
  try {
    const formData = new FormData();
    formData.append('image', image);
    const res = await fetch(`${API_DOMAIN}${path}`, {
      method: 'POST',
      body: formData,
    })
    return res;
  } catch (err) {
    console.error(`Error uploading image: ${err}`);
  }
}

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

export const categories = async (path) => {
  try {
    const res = await fetch(`${API_DOMAIN}/${path}`);
    return res.json();
  } catch (err) {
    console.error(`Error when getting categories: ${err}`)
  }
}

export const booksInCart = async (path, user_id) => {
  try {
    const res = await fetch(`${API_DOMAIN}/${path}/${user_id}`)
    return res.json();
  } catch (err) {
    console.error(`Error when getting books in cart: ${err}`)
  }
}

export const vote = async (path, user_id, body) => {
  try {
    const res = await fetch(`${API_DOMAIN}/${path}/${user_id}`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      }
    })
    return res;
  } catch (err) {
    console.error(`Error when getting vote: ${err}`)
  }
}

export const getImage = async (path, bookcode) => {
  try {
    const res = await fetch(`${API_DOMAIN}/${path}/${bookcode}`);
    return res;
  } catch (err) {
    console.error(`Error when getting image: ${err}`)
  }
}

export const delComment = async (path, comment_id) => {
  try {
    const res = await fetch(`${API_DOMAIN}/${path}/${comment_id}`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      }
    })
    return res;
  } catch (err) {
    console.error(`Error when removing comment: ${err}`)
  }
}

export const editComment = async (path, info) => {
  try {
    const res = await fetch(`${API_DOMAIN}/${path}`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(info),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      }
    });
    return res;
  } catch (err) {
    console.error(`Error when editting comment: ${err}`)
  }
}

export const postComment = async (path, info) => {
  try {
    const res = await fetch(`${API_DOMAIN}/${path}`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(info),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      }
    });
    return res;
  } catch (err) {
    console.error(`Error when posting comment: ${err}`)
  }
}

export const addBooksInCart = async (path, user_id, body) => {
  try {
    const res = await fetch(`${API_DOMAIN}/${path}/${user_id}`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      }
    })
    return res;
  } catch (err) {
    console.error(`Error when adding books in cart: ${err}`)
  }
}

export const deleteBooksInCart = async (path, user_id, book_id) => {
  try {
    const res = await fetch(`${API_DOMAIN}/${path}/${user_id}/${book_id}`)
    return res;
  } catch (err) {
    console.error(`Error when deleting books in cart: ${err}`)
  }
}