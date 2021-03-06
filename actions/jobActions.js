import axios from 'axios';
import reverseGeocode from 'latlng-to-zip';
import qs from 'qs';
import { GEOLOCATION_API_KEY } from 'react-native-dotenv'
import { FETCH_JOBS, LIKE_JOB, RESET_JOBS } from './types';
import { mockData } from '../mockData/mock'


const JOB_ROOT_URL = 'https://api.indeed.com/ads/apisearch?'
const JON_QUERY_PARAMS = {
  publisher: '123',
  format: 'json',
  v: '2',
  latlong: 1,
  radius: 10,
  q: 'javascript'
}

const buildJobsUrl = zip => {
  const query = qs.stringify({...JON_QUERY_PARAMS, l: zip})
  return `${JOB_ROOT_URL}${query}`
}

export const fetchJobs2 = () => (dispatch) => {
  dispatch({type: FETCH_JOBS, payload: MOCKDATA})
}

export const fetchJobs = (region, callback) => async (dispatch) => {
  const {latitude, longitude} = region
  let zip = await reverseGeocode({latitude, longitude}, GEOLOCATION_API_KEY)
  try {
    const url = buildJobsUrl(zip)
    // let {data} = await axios.get(url)
    dispatch({ type: FETCH_JOBS, payload: mockData });
    callback();
  } catch (e) {
    console.log('e: ', e);
  }
}

export const likeJob = (job) => {
  return {
    payload: job,
    type: LIKE_JOB
  };
};

export const resetJobs = () => {
  return {
    type: RESET_JOBS
  };
};
