import {uniqBy} from 'lodash'
import {LIKE_JOB} from '../actions/types'

const likedJobsReducer = (state = [], action) => {
  console.log('action: ', action);
  switch (action.type) {
    case LIKE_JOB:
      console.log('uniqBy([action.payload, ...state) ', uniqBy([action.payload, ...state], 'jobkey'));
      console.log('state: ', state);
      return uniqBy([action.payload, ...state], 'jobkey')
    default:
      return state;
  }
}

export default likedJobsReducer