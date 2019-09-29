import { call, put, select } from "redux-saga/effects";

import { isFetching, fetchSuccess, fetchFail } from "../users/actions";
import api from "../../../api";
import { getCurrentUserId } from "../../selectors";

function* fetchUsersSaga(action) {
  yield put(isFetching());

  const store = yield select();
  const currentUserId = getCurrentUserId(store);

  try {
    const response = yield call(api.fetchUsers, currentUserId);

    yield put(fetchSuccess(response.data));
  } catch (error) {
    yield put(fetchFail(error));
  }
}

export default fetchUsersSaga;
