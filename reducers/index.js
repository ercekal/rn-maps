import {combineReducers} from 'redux'
import auth from './authReducer'
console.log('authReducer: ', auth);

export default combineReducers({
  auth
})