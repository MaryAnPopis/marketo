import { createStore } from 'redux'
import Reducer from './reducer'
import throttle from 'lodash/throttle'

import { saveLocalStorage, loadLocalStorage } from './services'

const configureStore = () => {
  const persistedState = loadLocalStorage('state')

  let store = createStore(
    Reducer,
    persistedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )

  store.subscribe(
    throttle(() => {
      saveLocalStorage(store.getState(), 'state')
    }),
    1000
  )

  return store
}

export default configureStore
