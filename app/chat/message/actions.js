import api from "../../middleware/api";
import { keyBy } from "lodash";
import {
  addNewMessage,
  getMessages as getChatMessagesByChatId, 
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
        // let fileMessage = {
        //   type: 2768654243000, //картинка
        //   image: image,
        //   text: "file message",
        //   userId: currentUserId,
        //   chatId: currentChatId,
        //   tempFrontId: image.uri + new Date(),
        //   creationDate: new Date()
        // };
        //забераем из data info о загруженной картинке и
        //response.data.id
        //добавляем данные в сообщение о картинке
        //message.file.Id=response.data[0].id

        //message.type= 2768842251000 // файл
        //type: 2768777880000, //картинка

        imageId = response.data[0].id;
        fileMessage.fileId = response.data[0].id;
        //fileMessage.type = 2768654243000; //картинка
        //fileMessage.text = "сообщение типа картинка";

        api.postMessage(fileMessage).then(data => {
          dispatch(postMessageSuccess(data.data));
        });
        //dispatch(postMessageSuccess(data.data));

        //todo add new message in MESSAGES
        //dispatch(addNewMessage(data.data))
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
