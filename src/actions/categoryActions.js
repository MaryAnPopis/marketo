import { API_URL } from '../services'

export const INIT_STATE = 'INIT_STATE'
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS'
export const FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE'
export const FETCH_CATEGORIES_BEGIN = 'FETCH_CATEGORIES_BEGIN'

export const fetchCategoriesSuccess = categories => ({
  type: FETCH_CATEGORIES_SUCCESS,
  payload: { categories },
})
export const fetchCategoriesFailure = error => ({
  type: FETCH_CATEGORIES_FAILURE,
  payload: { error },
})

export const fetchCategoriesBegin = () => ({
  type: FETCH_CATEGORIES_BEGIN,
})

export const fetchCategories = () => {
  return dispatch => {
    dispatch(fetchCategoriesBegin())
    return fetch(`${API_URL}/category`)
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchCategoriesSuccess(json))
        return json
      })
      .catch(error => dispatch(fetchCategoriesFailure(error)))
  }
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText)
  }
  return response
}
