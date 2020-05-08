import axios from 'axios';
import reverseGeocode from 'latlng-to-zip';
import qs from 'qs';
import {
  FETCH_JOBS
} from './types';
import MOCKDATA from '../mockData/mock.json'

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

export const fetchJobs = (region) => async (dispatch) => {
  console.log('region: ', region);
  // try {
  //   let zip = await reverseGeocode(region)
  //   console.log('zip: ', zip);
  //   const url = buildJobsUrl(zip)
  //   // let {data} = await axios.get(url)
  //   console.log('MOCKDATA: ', MOCKDATA);
  //   dispatch({type: FETCH_JOBS, payload: MOCKDATA})
  // } catch (e) {
  //   console.log('e: ', e);
  // }
}