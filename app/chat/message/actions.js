
 import api from '../../middleware/api'
 import {keyBy} from 'lodash'
// https://medium.com/@kylpo/redux-best-practices-eef55a20cc72
// action name: <NOUN>_<VERB>
// action creator name: <verb><Noun>
// selector name: get<Noun>
 export const MESSAGE_POST='MESSAGE_POST';
 export const MESSAGE_POST_SUCCESS='MESSAGE_POST_SUCCESS';
 export const MESSAGE_POST_FAIL='MESSAGE_POST_FAIL';

 export function postMessage(message) {
    return async(dispatch, getState) => {
      dispatch({ type: MESSAGE_POST });
        try {

         api.addMessage(message)
         .then(data=>dispatch(postMessageSuccess(data.data)))

      } catch (error) {
        dispatch({ type: MESSAGE_POST_FAIL, error });        
      }
    };
  }

  export function postMessageSuccess(items) {
    return {
      type: MESSAGE_POST_SUCCESS,
      payload: item
    }   
  }

  export function postMessageFail(error) {
    return {
      type: MESSAGE_POST_FAIL,
      payload: error
    } 
  }