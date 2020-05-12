import {uniqBy} from 'lodash'
import {LIKE_JOB, RESET_JOBS} from '../actions/types'

const likedJobsReducer = (state = [], action) => {
  switch (action.type) {
    case LIKE_JOB:
      return uniqBy([action.payload, ...state], 'jobkey')
    case RESET_JOBS:
      return []
    default:
      return state;
  }
}

export default likedJobsReducer