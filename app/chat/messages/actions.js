// https://medium.com/@kylpo/redux-best-practices-eef55a20cc72
// action name: <NOUN>_<VERB>
// action creator name: <verb><Noun>
// selector name: get<Noun>
 

// const Actions = {
//   LOAD_POSTS_REQUEST: 'LOAD_POSTS_REQUEST',
//   LOAD_POSTS_FAILURE: 'LOAD_POSTS_FAILURE',
//   LOAD_POSTS_SUCCESS: 'LOAD_POSTS_SUCCESS',
// };
 
//  export const GET_MESSAGES_REQUEST='GET_MESSAGES_REQUEST';
//  export const GET_MESSAGES_SUCCESS='GET_MESSAGES_SUCCESS';
//  export const GET_MESSAGES_FAIL='GET_MESSAGES_FAIL';
import {keyBy} from 'lodash'

 export const MESSAGES_GET='GET_MESSAGES_REQUEST';
 export const MESSAGES_GET_SUCCESS='GET_MESSAGES_SUCCESS';
 export const MESSAGES_GET_FAIL='GET_MESSAGES_FAIL';

 export function getMessages(chatId) {
    return async(dispatch, getState) => {
      try {        
        dispatch({ type: MESSAGES_GET, chatId });
      } catch (error) {
        dispatch({ type: MESSAGES_GET_FAIL, error });
        //console.error(error);
      }
    };
  }

  export function getMessagesSuccess(items) {
    return {
      type: FETCH_REQUESTS_SUCCESS,
      payload:keyBy(items, 'Id')
    }   
  }

  export function getMessagesFail(error) {
    return {
      type: FETCH_REQUESTS_FAIL,
      payload: error
    } 
  }