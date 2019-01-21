
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


 
export const GET_ALL_DATA_FOR_CHAT_BY_REQUESTID='GET_ALL_DATA_FOR_CHAT_BY_REQUESTID';

export const CHAT_REQUEST_NOT_FOUND='CHAT_REQUEST_NOT_FOUND';
export const CHAT_REQUEST_EXIST='CHAT_REQUEST_EXIST';


 
  export function getAllDataForChatByrequestId(requestId) {
    return async(dispatch, getState) => {
      try 
      {           
        dispatch(getCurrentUser());
        api.getChatsByRequestId(requestId)
        //.then(data=> dispatch(getChatsByRequestIdSuccess(data.data))
        .then((data) => {
          if(data)
          {
            dispatch( existChatRequest(requestId))

            const currentChat=data.data[0];
            const currentChatId=currentChat.id;
            
            
            dispatch(setCurrentChat(currentChat))
            
            dispatch(getChatUsersByChatId(currentChatId))
            
            dispatch (getChatMessagesByChatId(currentChatId));
          }
          else
          {
            dispatch(notFoundChatRequest(requestId))
          }
        })
        
      } 
      catch (error)
      {
        dispatch({ type: GET_ALL_DATA_FOR_CHAT_BY_REQUESTID_FAIL, error })
      }
      
    };
  }

  
  export function notFoundChatRequest(requestId) {
    return {
      type: CHAT_REQUEST_NOT_FOUND,
      payload: requestId
    } 
  }
  export function existChatRequest(requestId) {
    return {
      type: CHAT_REQUEST_EXIST,
      payload: requestId
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