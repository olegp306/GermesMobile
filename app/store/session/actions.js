export const LOGIN_REQUEST = "loginRequest";
export const IS_LOGGING = "isLogging";
export const LOGGED = "logged";
export const LOGIN_FAILED = "loginFailed";

import api from "../../api";

export const login = (user, password) => {
  console.log("Action login");
  return (dispatch, getState) => {
    //getState можно получить данные из STORE
    dispatch(isLogging());

    api
      .login(user, password)
      .then(data => {
        const session = {
          token: data.data.accessToken,
          contractorId: data.data.contractorId,
          roles:data.data.employee.extInfo,
          employee:data.data.employee

        };
        api.setAuthHeader(data.data.accessToken);
        dispatch(logged(session));
      })
      .catch(error => dispatch(loginFailed(error)));
  };

  // return {
  //     type: LOGIN_REQUEST,
  //     payload: {
  //         user,
  //         password
  //     }
  // }
};

export const isLogging = isLogging => {
  return {
    type: IS_LOGGING,
    payload: isLogging
  };
};

export const logged = session => {
  return {
    type: LOGGED,
    payload: session
  };
};

export const loginFailed = error => {
  return {
    type: LOGIN_FAILED,
    payload: error
  };
};
