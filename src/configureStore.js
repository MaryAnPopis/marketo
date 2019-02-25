import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducer/rootReducer'
import throttle from 'lodash/throttle'
import thunk from 'redux-thunk'
import { saveLocalStorage, loadLocalStorage } from './services'

const configureStore = () => {
  const persistedState = loadLocalStorage('state')
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  let store = createStore(rootReducer, persistedState, composeEnhancers(applyMiddleware(thunk)))

  store.subscribe(
    throttle(() => {
      saveLocalStorage(store.getState(), 'state')
    }),
    1000
  )

  return store
}

export default configureStore
