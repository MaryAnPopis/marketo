import { API_URL } from '../services'

export const INIT_STATE = 'INIT_STATE'
export const FETCH_PRODUCT_SUCCESS = 'FETCH_PRODUCT_SUCCESS'
export const FETCH_PRODUCT_BY_CATEGORY_SUCCESS = 'FETCH_PRODUCT_BY_CATEGORY_SUCCESS'
export const FETCH_PRODUCT_FAILURE = 'FETCH_PRODUCT_FAILURE'
export const FETCH_PRODUCT_BEGIN = 'FETCH_PRODUCT_BEGIN'

export const fetchProductsSuccess = product => ({
  type: FETCH_PRODUCT_SUCCESS,
  payload: { product },
})
export const fetchProductsByCategorySuccess = products => ({
  type: FETCH_PRODUCT_BY_CATEGORY_SUCCESS,
  payload: { products },
})
export const fetchProductsFailure = error => ({
  type: FETCH_PRODUCT_FAILURE,
  payload: { error },
})

export const fetchProductsBegin = () => ({
  type: FETCH_PRODUCT_BEGIN,
})

export const fetchProduct = id => {
  return dispatch => {
    dispatch(fetchProductsBegin())
    return fetch(`${API_URL}/products/${id}`)
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchProductsSuccess(json))
        return json
      })
      .catch(error => dispatch(fetchProductsFailure(error)))
  }
}

export const fetchProductByCategory = id => {
  return dispatch => {
    dispatch(fetchProductsBegin())
    return fetch(`${API_URL}/products/category/${id}?page=0&size=8/`)
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchProductsByCategorySuccess(json))
        return json
      })
      .catch(error => dispatch(fetchProductsFailure(error)))
  }
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText)
  }
  return response
}
