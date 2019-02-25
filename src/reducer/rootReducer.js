import { combineReducers } from 'redux'
import product from './productReducer'
import categories from './categoriesReducer'

export default combineReducers({
  product,
  categories,
})
