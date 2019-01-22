
// https://medium.com/@kylpo/redux-best-practices-eef55a20cc72
// action name: <NOUN>_<VERB>
// action creator name: <verb><Noun>
// selector name: get<Noun>

import api from '../../middleware/api'
import { postMessage }  from '../message/actions'
import { getAllDataForChatByrequestId } from '../currentChat/actions';

 export const CHAT_SET_CURRENT='CHAT_SET_CURRENT';
 export const CHAT_REQUEST_NOT_FOUND='CHAT_REQUEST_NOT_FOUND';

 export const CHAT_POST='CHAT_POST';
 //export const CHAT_POST_REQUEST_TYPE_CHAT='CHAT_POST_REQUEST_TYPE_CHAT';
 export const CHAT_POST_SUCCESS='CHAT_POST_SUCCESS';
 export const CHAT_POST_FAIL='CHAT_POST_FAIL';
 
 export const CHATS_GET_BY_REQUESTID='CHATS_GET_BY_REQUESTID';
 export const CHATS_GET_BY_REQUESTID_SUCCESS='CHATS_GET_BY_REQUESTID_SUCCESS';
 export const CHATS_GET_BY_REQUESTID_FAIL='CHATS_GET_BY_REQUESTID_FAIL';
 


  export function setCurrent(chat) {
    return async(dispatch, getState) => {
      dispatch({ type: CHAT_SET_CURRENT, chat });       
    };
  }
 
  export function postRequestTypeChat(message, requestId) {
    return async(dispatch, getState) => {
      //dispatch(postChat(requestId))     
      dispatch({ type: CHAT_POST }); 
        try {
         api.createRequestChatsByRequestId(requestId)
         .then((data)=>{

           dispatch(postChatSuccess(data.data))
           const chat=data.data
           //dispatch(setCurrentChat(data.data))
           
           message.chatId=chat[0].id
           dispatch(postMessage (message))
            .then(()=>{
              dispatch(getAllDataForChatByrequestId(requestId))
           }
           )
           
          })

      } catch (error) {
        dispatch({ type: CHAT_POST_FAIL, error });        
      }
    };
 } 

  export function postChat(requestId) {
     return async(dispatch, getState) => {
 
       //dispatch(addNewMessage(message))
       dispatch({ type: CHAT_POST });
         try {
          api.postChat(message)
          .then((data)=>{
            dispatch(postChatSuccess(data.data))
             //todo add new message in MESSAGES
            //dispatch(addNewMessage(data.data))
           })
 
       } catch (error) {
         dispatch({ type: CHAT_POST_FAIL, error });        
       }
     };
  } 
   export function postChatSuccess(item) {
     return {
       type: CHAT_POST_SUCCESS,
       payload: item
     }   
   } 
   export function postChatFail(error) {
     return {
       type: CHAT_POST_FAIL,
       payload: error
     } 
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
  
