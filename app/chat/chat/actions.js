
 import api from '../../middleware/api'
 import {keyBy} from 'lodash'
// https://medium.com/@kylpo/redux-best-practices-eef55a20cc72
// action name: <NOUN>_<VERB>
// action creator name: <verb><Noun>
// selector name: get<Noun>


 export const CHAT_SET_CURRENT='CHAT_SET_CURRENT';
 

 export const CHATS_GET_BY_REQUESTID='CHATS_GET_BY_REQUESTID';
 export const CHATS_GET_BY_REQUESTID_SUCCESS='CHATS_GET_BY_REQUESTID_SUCCESS';
 export const CHATS_GET_BY_REQUESTID_FAIL='CHATS_GET_BY_REQUESTID_FAIL';


  export function setCurrent(chat) {
    return async(dispatch, getState) => {
      dispatch({ type: CHAT_SET_CURRENT, chat });       
    };
  }


//  export const CHAT_POST='CHAT_POST';
//  export const CHAT_POST_SUCCESS='CHAT_POST_SUCCESS';
//  export const CHAT_POST_FAIL='CHAT_POST_FAIL';

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


 export function getChatsByRequestId(requestId) {
    return async(dispatch, getState) => {
      try {
        dispatch({ type: CHATS_GET_BY_REQUESTID , requestId});
        
        api.getChatsByRequestId(requestId)
        .then(data=>dispatch(getChatsByRequestIdSuccess(data.data)))
        
      } catch (error) {
        dispatch({ type: CHATS_GET_BY_REQUESTID_FAIL, error });        
      }
    };
  }

  export function getChatsByRequestIdSuccess(items) {
    return {
      type: CHATS_GET_BY_REQUESTID_SUCCESS,
      payload: items
    }   
  }

  export function getChatsByRequestIdFail(error) {
    return {
      type: CHATS_GET_BY_REQUESTID_FAIL,
      payload: error
    } 
  }