import { createStore, compose, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import {AsyncStorage} from 'react-native'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['likedJobs']
}

const persistedReducer = persistReducer(persistConfig, rootReducer, {})

export default () => {
  let store = createStore(persistedReducer, compose(applyMiddleware(thunk)))
  let persistor = persistStore(store)
  return { store, persistor }
}