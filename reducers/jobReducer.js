import {
  FETCH_JOBS
} from '../actions/types'

const initialState = {
  jobs: []
}

const jobReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_JOBS:
      return {...state, jobs: action.payload}
    default:
      return state;
  }
}

export default jobReducer