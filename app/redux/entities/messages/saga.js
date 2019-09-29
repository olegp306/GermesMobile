import { call, put, select } from "redux-saga/effects";
import { isFetching, fetchSuccess, fetchFail } from "../messages/actions";
import { getCurrentChat } from "../../selectors";
import api from "../../../api";

function* fetchMessagesSaga(action) {
  yield put(isFetching());

  const store = yield select();
  const currentChat = getCurrentChat(store);

  try {
    const response = yield call(api.fetchMessages, currentChat.id);

    yield put(fetchSuccess(response.data));
  } catch (error) {
    yield put(fetchFail(error));
  }
}

export default fetchMessagesSaga;
