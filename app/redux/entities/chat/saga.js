import { call, put ,select} from "redux-saga/effects";

import {fetch as fetchChats} from "../chats/actions"
import {getCurrentChat} from "../../selectors/index"

import {
  isUpdating,
  updated,
  updateFailed,
  isAdding,
  added,
  addingFailed,
  isRemoving,
  removingFailed,
  removed
} from "./actions";
import api from "../../../api/index";

export function* updateChatSaga(action) {
  yield put(isUpdating());
  
  try {
    const store = yield select()
    //const currentChat = getCurrentChat(store);

    //action.payload.id=currentChat.id;

    const response = yield call(api.updateChat, action.payload);
    yield put(updated());
    // yield put(fetchChats());  
    // yield put(fetchChats());  
  } catch (error) {
    yield put(updateFailed(error));
  }
}

export function* addChatSaga(action) {
  yield put(isAdding());

  try {
    const response = yield call(api.addChat, action.payload);
    yield put(added());
    // yield put(fetchChats());  
  } catch (error) {
    yield put(addingFailed(error));
  }
}

export function* removeChatSaga(action) {
  yield put(isRemoving());

  try {
    const response = yield call(api.removeChat, action.payload);
    yield put(removed());
    //yield put(fetchChats());    
  } catch (error) {
    yield put(removingFailed(error));
  }
}

