
 import api from '../../middleware/api'
 import {keyBy} from 'lodash'
// https://medium.com/@kylpo/redux-best-practices-eef55a20cc72
// action name: <NOUN>_<VERB>
// action creator name: <verb><Noun>
// selector name: get<Noun>
 export const CURRENTUSER_GET='CURRENTUSER_GET';
 export const CURRENTUSER_GET_SUCCESS='CURRENTUSER_GET_SUCCESS';
 export const CURRENTUSER_GET_FAIL='CURRENTUSER_GET_FAIL';


 export function getCurrentUser() {
    return async(dispatch, getState) => {
      dispatch({ type: CURRENTUSER_GET});
        try {
          api.getCurrentUser()
          .then(data=>dispatch(getCurrentUserSuccess(data.data) ))
          //.then(action=>  dispatch(getChatsByRequestId(action.payload[0]) ))
          
      } catch (error) {
        dispatch(requestsFetchingError(error));
        //dispatch({ type: CURRENTUSER_GET_FAIL, error });        
      }
    };
  }

  export function getCurrentUserSuccess(item) {
    return {
      type: CURRENTUSER_GET_SUCCESS,
      payload:item
    }   
  }

  export function getCurrentUserFail(error) {
    return {
      type: CURRENTUSER_GET_FAIL,
      payload: error
    } 
  }