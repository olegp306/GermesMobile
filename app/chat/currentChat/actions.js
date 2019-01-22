
// https://medium.com/@kylpo/redux-best-practices-eef55a20cc72
// action name: <NOUN>_<VERB>
// action creator name: <verb><Noun>
// selector name: get<Noun>

import api from '../../middleware/api'
import { setCurrent as setCurrentChat ,  } from '../chat/actions'
//import { notFoundChatRequest } from '../chatScreen/actions'
import { getUsers as getChatUsersByChatId  } from '../users/actions'
import { getMessages as getChatMessagesByChatId } from '../messages/actions'
import { getCurrentUser } from '../currentUser/actions'

export const CURRENTCHAT_GET_ALL_DATA='CURRENTCHAT_GET_ALL_DATA';
export const CURRENTCHAT_GET_ALL_DATA_SUCCESS='CURRENTCHAT_GET_ALL_DATA_SUCCESS'
export const CURRENTCHAT_GET_ALL_DATA_FAIL='CURRENTCHAT_GET_ALL_DATA_FAIL'

export const CHAT_REQUEST_NOT_FOUND='CHAT_REQUEST_NOT_FOUND';
export const CHAT_REQUEST_EXIST='CHAT_REQUEST_EXIST';
 
export function getAllDataForChatByrequestId(requestId) {
  return async(dispatch, getState) => {
    try 
      {
        dispatch({ type: CURRENTCHAT_GET_ALL_DATA});
        api.getChatsByRequestId(requestId)        
        .then((data) => {
          if(data)
          {
            const currentChat=data.data[0];
            const currentChatId=currentChat.id;

            dispatch(existChatRequest(currentChat))
            dispatch(getCurrentUser());
            dispatch(setCurrentChat(currentChat))
            dispatch(getChatUsersByChatId(currentChatId))
            dispatch (getChatMessagesByChatId(currentChatId));
            
            dispatch({type: CURRENTCHAT_GET_ALL_DATA_SUCCESS})
          }
          //чат не найден
          else
          {
            dispatch({type: CURRENTCHAT_GET_ALL_DATA_SUCCESS})
            dispatch(notFoundChatRequest(requestId))            
          }
        })
        
      } 
      catch (error)
      {
        dispatch({type: CURRENTCHAT_GET_ALL_DATA_FAIL})
      }
      
    };
  }
  
  export function notFoundChatRequest(requestId) {
    return {
      type: CHAT_REQUEST_NOT_FOUND,
      payload: requestId
    } 
  }

  export function existChatRequest(currentChat) {
    return {
      type: CHAT_REQUEST_EXIST,
      payload: currentChat
    } 
  }

 




//  export function getChatsByRequestId(requestId) {
//     return async(dispatch, getState) => {
//       try {
//         dispatch({ type: CHATS_GET_BY_REQUESTID , requestId});
        
//         api.getChatsByRequestId(requestId)
//         .then(data=>dispatch(getChatsByRequestIdSuccess(data.data)))
        
//       } catch (error) {
//         dispatch({ type: CHATS_GET_BY_REQUESTID_FAIL, error });        
//       }
//     };
//   }

//   export function getChatsByRequestIdSuccess(items) {
//     return {
//       type: CHATS_GET_BY_REQUESTID_SUCCESS,
//       payload: items
//     }   
//   }

//   export function getChatsByRequestIdFail(error) {
//     return {
//       type: CHATS_GET_BY_REQUESTID_FAIL,
//       payload: error
//     } 
//   }