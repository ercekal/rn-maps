import {combineReducers} from 'redux'
import job from './jobReducer'
import auth from './authReducer'
import likedJobs from './likesReducer'

export default combineReducers({
  job,
  auth,
  likedJobs
})