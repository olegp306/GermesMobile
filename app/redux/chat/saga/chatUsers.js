import { call, put, select } from "redux-saga/effects";

import { isFetching, fetchSuccess, fetchFail } from "../actions/chatUsers";
import api from "../../../api";
import { getCurrentChat} from "../../selectors";

function* fetchChatUsersSaga(action) {
  
  yield put(isFetching());  
  
  const store = yield select()  
  const currentChat= getCurrentChat(store);  
  
  try {
    const response = yield call(api.fetchChatUsers ,currentChat.id);

    yield put(fetchSuccess(response.data));
  } catch (error) {
    yield put(fetchFail(error));
  }
}

export default fetchChatUsersSaga;
