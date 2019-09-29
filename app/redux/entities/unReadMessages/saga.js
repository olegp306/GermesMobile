import { call, put, select } from "redux-saga/effects";

import { isFetching, fetchSuccess, fetchFail, isUpdating,updateSuccess,updateFail } from "../unReadMessages/actions";
import api from "../../../api";
import { getCurrentUserId , getCurrentChat, getUnreadMessages} from "../../selectors";
import _ from "lodash"

export function* fetchUnReadMessagesSaga(action) {
  yield put(isFetching());

  const store = yield select();
  const userId = getCurrentUserId(store);

  try {
    const response = yield call(api.fetchUnreadMessage, userId);

    yield put(fetchSuccess(response.data));
  } catch (error) {
    yield put(fetchFail(error));
  }
}


export function* updateReadMessagesStatus(action) {
  yield put(isUpdating());  
  const store = yield select()

  // const session = getSession(store);
  const currentChat=getCurrentChat(store);
  const unreadMessages=getUnreadMessages(store);
  const countOfUnreadMessages = _.groupBy(unreadMessages.items, "chatId");
  
  const readedMessages=countOfUnreadMessages[currentChat.id];

  
  try {
    const response = yield call(api.updateMessagesReadStatus , readedMessages);
    yield call (fetchUnReadMessagesSaga)
    yield put(updateSuccess(response.data));
    //нужно по хорошему почистить state
    
  } catch (error) {
    yield put(updateFail(error));
  }
}


