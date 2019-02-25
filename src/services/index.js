export const API_URL = 'http://localhost:8080/v1'

export const EMPTY_STATE = {
  featuredProducts: [],
  productsCurrentPage: [],
  productDetails: [{ images: [] }, { specs: [] }, { subCategories: [] }, { category: {} }],
}

export const saveLocalStorage = (state, key = 'state') => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem(key, serializedState)
  } catch (err) {
    console.error('save state error on local storagee', err)
  }
}

export const loadLocalStorage = (key = 'state') => {
  try {
    const serializedState = localStorage.getItem(key)
    if (serializedState === null) {
      return { isExist: false }
    }
    return JSON.parse(serializedState)
  } catch (err) {
    return { isExist: false }
  }
}

export const post = (path, data) => {
  return fetch(`${API_URL}/${path}`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => {
      return res.json()
    })
    .then(data => {
      return data
    })
    .catch(err => {
      throw err
    })
}
export const getByParam = (path, param) => {
  return fetch(`${API_URL}/${path}/${param}`)
    .then(res => {
      return res.json()
    })
    .then(data => {
      return data
    })
    .catch(err => {
      throw err
    })
}
