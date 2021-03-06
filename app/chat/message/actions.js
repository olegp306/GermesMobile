import api from "../../api";
import { keyBy } from "lodash";
import {
  addNewMessage,
  getMessages as getChatMessagesByChatId
} from "../messages/actions";

// https://medium.com/@kylpo/redux-best-practices-eef55a20cc72
// action name: <NOUN>_<VERB>
// action creator name: <verb><Noun>
// selector name: get<Noun>
export const MESSAGE_POST = "MESSAGE_POST";
export const MESSAGE_POST_SUCCESS = "MESSAGE_POST_SUCCESS";
export const MESSAGE_POST_FAIL = "MESSAGE_POST_FAIL";

export function postMessage(message) {
  return async (dispatch, getState) => {
    dispatch({ type: MESSAGE_POST });
    try {
      api.postMessage(message).then(data => {
        dispatch(postMessageSuccess(data.data));
        //todo add new message in MESSAGES
        //dispatch(addNewMessage(data.data))
      });
    } catch (error) {
      dispatch({ type: MESSAGE_POST_FAIL, error });
    }
  };
}

export function postFileMessage(fileMessage) {
  return async (dispatch, getState) => {
    dispatch({ type: MESSAGE_POST });
    try {
      //отправляем новый файл на сервер
      api.postFile(fileMessage.file).then(response => {
        imageId = response.data[0].id;
        fileMessage.fileId = response.data[0].id;
        
        api.postMessage(fileMessage).then(data => {
          dispatch(postMessageSuccess(data.data));
        });
        
      });
    } catch (error) {
      dispatch({ type: MESSAGE_POST_FAIL, error });
    }
  };
}

export function postMessageSuccess(item) {
  return {
    type: MESSAGE_POST_SUCCESS,
    payload: item
  };
}

export function postMessageFail(error) {
  return {
    type: MESSAGE_POST_FAIL,
    payload: error
  };
}
