import { call, put } from "redux-saga/effects";

import { login, isLogging, logged, loginFailed } from "../actions/Session";

import api from "../../../api";

function* loginSaga(action) {
  //yield put(login());
  //console.log("loginSaga")
  const { user, password } = action.payload;

  yield put(isLogging());

  try {
    let loginResponse = null;   

    if (action.type == "LOGIN_BY_USERID" || action.type == "FETCH_APPCHAT_DATA" ) {
      loginResponse = yield call(api.authenticateByUserId, action.payload.userId);
    } else {
      loginResponse = yield call(api.login, user, password);
    }
    
    yield call(api.setAuthHeader, loginResponse.data.accessToken);

    const { id, contractorId, employee, accessToken,  } = loginResponse.data;

    const session = {
      token: accessToken,
      userId: employee.id,
      contractorId: contractorId,
      avatarUrl: employee.avatar.url.replace("/UserSettings/0/Docs/","/UserSettings/"+employee.instanceId+"/Docs/"),
      userName: employee.name,
      roles: employee.extInfo
    };

    //yield put(isLogging(false))
    yield put(logged(session));
  } catch (error) {
    //yield put(isLogging(false))
    yield put(loginFailed(error.message));
  }
}

export default loginSaga;
