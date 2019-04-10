import { Colors, Images, Metrics } from "../../theme";
import axios from "axios";
import querystring from "querystring";
import { AsyncStorage, Platform } from "react-native";

import {
  storeCredentials,
  storeCredentialsHide,
  loadCredentials
} from "../utils/AsyncStorage";

//Germes Prod apiservice url
export const PROD_API_SERVER_URL = "https://service.allwingroup.ru/germes/v1";

//Germes Test apiservice url
export const TEST_API_SERVER_URL = "https://apitest.allwingroup.ru/germes/v1";

//Germes LOCAL Test apiservice url
export const LOCAL_API_SERVER_URL = "http://192.168.1.69/ApiService/germes/v1";

const API_SERVER_URL = __DEV__ ? LOCAL_API_SERVER_URL : PROD_API_SERVER_URL;

// export const API_SERVER_URL = 'http://192.168.1.69/ApiService/germes/v1'

//export const API_CHAT_SERVER_URL = 'https://service.allwingroup.ru/germes/v1'

//export const FILE_SERVER_URL = 'https://saas.claris.su/UserSettings/9323/Docs/'

const apiConf = {
  baseURL: API_SERVER_URL,
  headers: { "Cache-Control": "no-cache" },
  timeout: 35000
};

const apiInstance = axios.create(apiConf);
// 200 - OK
// 400 - Bad Request (Client Error) - A json with error \ more details should return to the client.
// 401 - Unauthorized
// 500 - Internal Server Error - A json with an error should return to the client only when there is no security risk by doing that.
//https://blog.restcase.com/rest-api-error-codes-101/

const onError = error => {
  if (error.response) {
    if (error.response.status === 400) {
      throw Error("Не верный логин или пароль");
    } else if (error.response.status === 401) {
      throw Error("Неккоректное имя пользователя или пароль");
    } else if (error.response.status === 404) {
      //console.warn('нет данных' )
    } else if (error.response.status > 401 && error.response.status < 500) {
      throw Error(
        "При обработке запроса на сервере произошла ошибка, мы ее зафиксировали и уже разбираемся в причинах." +
          error.response.status
      );
    } else if (error.response.status >= 500) {
      throw Error(error.response.data);
    }
  } else if (error.request) {
    console.warn("axios onError" + error.request);
    throw Error("Сервер недоступен. Проверьте свое интернет-соединение");
  } else {
    // console.warn('Error', error.message)
  }
  console.log(error.config);
};

const login = (user, password) => {
  const body = `grant_type=password&username=${user}&password=${password}`;
  const conf = {
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  };
  return apiInstance.post("auth/token", body, conf).catch(onError);
};

const authorize = () =>
  apiInstance.get("/vNext/v1/users/current").catch(onError);
const setAuthHeader = token => {
  apiInstance.defaults.headers.authorization = `Bearer ${token}`;
};

const fetchRequests = (fromRegistrationPlanDate, receptionId) => {
  return apiInstance
    .get(
      "requestsgermes/mobile?fromRegistrationPlanDate=" +
        fromRegistrationPlanDate +
        "&receptionId=" +
        receptionId
    )
    .catch(onError);
};

const changeRequestStatus = async requestsId => {
  const { user, password } = await loadCredentials();
  const url = `requestsgermes/mobile/changestatus/${requestsId}`;
  const body = `grant_type=password&username=${user}&password=${password}`;

  const conf = {
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  };
  return apiInstance.post(url, body, conf).catch(onError);
};

const getMessagesByChatId = chatId => {
  return apiInstance.get("messages/chatid/" + chatId);
};

const getUsersByChatId = chatId => {
  return apiInstance.get("users/chatid/" + chatId);
};

const getCurrentUser = () => {
  return apiInstance.get("users/currrentuser/");
};

const postMessage = message => {
  return apiInstance.post("/messages/", message);
};

const postFile = message => {
  var bodyFormData = new FormData();    

  //return apiInstance.post("/files/", bodyFormData, { headers: {'Content-Type': 'multipart/form-data' }} );
  const url = API_SERVER_URL + "/files";

  bodyFormData.append("file", {
    uri: message.image.uri,
    type: "image/jpeg", // or photo.type
    name: "fromMobApp.jpeg"
  });

  
  return axios({
    method: "post",
    url: url,
    data: bodyFormData,
    config: { headers: { "Content-Type": "multipart/form-data" } }
  });
};

const getChatsByRequestId = requestId => {
  return apiInstance.get(`chats?requestId=${requestId}`).catch(onError);
};

const createRequestChatsByRequestId = requestId => {
  return apiInstance
    .get(`chats?requestId=${requestId}&autoCreate=true`)
    .catch(onError);
};

const addUsersToChat = users => {
  return apiInstance.post("/userschats", users).then(checkStatus);
};

export default {
  login,
  authorize,
  setAuthHeader,
  changeRequestStatus,
  fetchRequests,

  getMessagesByChatId,
  getUsersByChatId,
  getCurrentUser,
  postMessage,
  postFile,
  getChatsByRequestId,
  createRequestChatsByRequestId
};
