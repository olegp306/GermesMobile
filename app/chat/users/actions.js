
 import api from '../../middleware/api'
 import {keyBy} from 'lodash'
// https://medium.com/@kylpo/redux-best-practices-eef55a20cc72
// action name: <NOUN>_<VERB>
// action creator name: <verb><Noun>
// selector name: get<Noun>
 export const USERS_GET='USERS_GET';
 export const USERS_GET_SUCCESS='USERS_GET_SUCCESS';
 export const USERS_GET_FAIL='USERS_GET_FAIL';

 export function getUsers(chatId) {
    return async(dispatch, getState) => {
      
        try {
          dispatch({ type: USERS_GET, chatId });

         api.getUsersByChatId(chatId)
         .then(data=>dispatch(getUsersSuccess(data.data)))

      } catch (error) {
        dispatch({ type: USERS_GET_FAIL, error });        
      }
    };
  }

  export function getUsersSuccess(items) {
    return {
      type: USERS_GET_SUCCESS,
      payload:keyBy(items, 'id')
    }   
  }

  export function getUsersFail(error) {
    return {
      type: USERS_GET_FAIL,
      payload: error
    } 
  }