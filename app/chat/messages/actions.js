
 import api from '../../middleware/api'
 import {keyBy} from 'lodash'
// https://medium.com/@kylpo/redux-best-practices-eef55a20cc72
// action name: <NOUN>_<VERB>
// action creator name: <verb><Noun>
// selector name: get<Noun>
 export const MESSAGES_GET='MESSAGES_GET';
 export const MESSAGES_GET_SUCCESS='MESSAGES_GET_SUCCESS';
 export const MESSAGES_GET_FAIL='MESSAGES_GET_FAIL';

 export const MESSAGES_ADD_NEW='MESSAGES_ADD_NEW';


 export function getMessages(chatId) {
    return async(dispatch, getState) => {
      try {
        dispatch({ type: MESSAGES_GET, chatId });

         api.getMessagesByChatId(chatId)
         .then(data=>dispatch(getMessagesSuccess(data.data)))

      } catch (error) {
        dispatch({ type: MESSAGES_GET_FAIL, error });        
      }
    };
  }

  export function getMessagesSuccess(items) {
    return {
      type: MESSAGES_GET_SUCCESS,
      payload:keyBy(items, 'id')
    }   
  }

  export function getMessagesFail(error) {
    return {
      type: MESSAGES_GET_FAIL,
      payload: error
    } 
  }
  
  export function addNewMessage(item) {
    return {
      type: MESSAGES_ADD_NEW,
      payload: item
    } 
  }
  