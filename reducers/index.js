import {combineReducers} from 'redux'
import job from './jobReducer'
import auth from './authReducer'

export default combineReducers({
  job,
  auth
})