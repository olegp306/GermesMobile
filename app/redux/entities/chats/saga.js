import { call, put, select } from "redux-saga/effects";

import {
  isFetching,
  fetchSuccess,
  fetchFail,
  updateDataViewChats
} from "../chats/actions";
import api from "../../../api";
import { getSession, getChats } from "../../selectors";

function* fetchChatsSaga(action) {
  yield put(isFetching());
  const store = yield select();
  const session = getSession(store);

  try {
    const response = yield call(api.fetchUserChats, session.userId);
    yield put(fetchSuccess(response.data));
  } catch (error) {
    yield put(fetchFail(error));
  }
}

function* updateViewChatsSaga(action) {
  const store = yield select();
  const chats = getChats(store);

  for (let index = 0; index < chats.items.length; index++) {
    const element = chats.items[index];
    if (element.id === action.payload.chatId) {
      for (let prop in action.payload) {
        //action.payload[prop];
        chats.items[index][prop] = action.payload[prop];
      }
      //chats.items[index].lastMessage = action.payload;
    }
  }
  try {
    yield put(updateDataViewChats(chats.items));
  } catch (error) {
    console.log("error updateViewChatsSaga error:" + error);
  }
}

function* updateLastMessageViewChatsSaga(action) {
  const store = yield select();
  const chats = getChats(store);

  for (let index = 0; index < chats.items.length; index++) {
    const element = chats.items[index];
    if (element.id === action.payload.chatId) {
      chats.items[index].lastMessage = action.payload;
    }
  }
  try {
    yield put(updateDataViewChats(chats.items));
  } catch (error) {
    console.log("error updateViewChatsSaga error:" + error);
  }
}

export { fetchChatsSaga, updateLastMessageViewChatsSaga ,updateViewChatsSaga};
