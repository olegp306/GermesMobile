import { Colors, Images, Metrics } from "../theme";
import axios from "axios";
import querystring from "querystring";
import { AsyncStorage, Platform } from "react-native";

import {
  storeCredentials,
  storeCredentialsHide,
  loadCredentials
} from "../middleware/utils/AsyncStorage";

//Germes Prod apiservice url
export const PROD_API_SERVER_URL = "https://service.allwingroup.ru/germes/v1";

//Germes Test apiservice url
export const TEST_API_SERVER_URL = "https://apitest.allwingroup.ru/germes/v1";

//Germes LOCAL Test apiservice url
export const LOCAL_API_SERVER_URL = "http:/192.168.1.67/ApiService/germes/v1";


const API_SERVER_URL = __DEV__ ? TEST_API_SERVER_URL : PROD_API_SERVER_URL;


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

const fetchCustomerRequests = () => {
  return apiInstance
    .get(
      "requestsgermes/mobile/customer/onwork"
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

const postFile = file => {
  var bodyFormData = new FormData();
  
  bodyFormData.append("file", {
    uri: file.uri,
    type: "image/jpeg", // or photo.type
    name: "fromMobApp.jpeg"
  });

  return apiInstance.post("/files", bodyFormData, {
    headers: { "Content-Type": "multipart/form-data" }
  });

  // return axios({
  //   method: "post",
  //   url: url,
  //   data: bodyFormData,
  //   config: { headers: { "Content-Type": "multipart/form-data" } }
  // });
};

const getChatsByRequestId = requestId => {
  return apiInstance.get(`chats?requestId=${requestId}`).catch(onError);
};

const createRequestChatsByRequestId = requestId => {
  return apiInstance
    .get(`chats?requestId=${requestId}&autoCreate=true`)
    .catch(onError);
};

// const addUsersToChat = users => {
//   return apiInstance.post("/userschats", users).then(checkStatus);
// };
const getReceptions = () => {
  return apiInstance.get("/receptions").catch(onError);
};



////chatsApp API
const getChatByChatId = chatId => {
  return axios.get("/chats/chat/" + chatId).then(checkStatus);
};

const fetchUserChats = userId => {
  return axios.get("/chats/user/" + userId).then(checkStatus);
};

const addUsersToChat = users => {
  return axios.post("/userschats", users).then(checkStatus);
};

const fetchChatUsers = chatId => {
  return axios.get("/users/chatId/" + chatId).then(checkStatus);
};

const fetchUsers = chatId => {
  return axios.get("/users/availabletoadd/" + chatId).then(checkStatus);
};

const fetchMessages = chatId => {
  return axios.get("/messages/chatid/" + chatId).then(checkStatus);
};
const addMessage = message => {
  return axios.post("/messages/", message).then(checkStatus);
};

const fetchUnreadMessage = userId => {
  return axios.get("/messsagesreadstatuses/userId/" + userId).then(checkStatus);
};

const updateMessagesReadStatus = readMessages => {
  return axios.put("/messsagesreadstatuses", readMessages).then(checkStatus);
};

// const postFile = file => {
//   var bodyFormData = new FormData();

//   bodyFormData.append("name", file.name);
//   bodyFormData.append("file", file);

//   return axios.post("/files", bodyFormData, {
//     headers: { "Content-Type": "multipart/form-data" }
//   });
// };

const  updateChat=updateParams=>{
  //const updateParams ={ id:currentChat.id ,changeData:action.payload };
  return axios.post("/chats/chat/"+updateParams.id, updateParams.changeData).then(checkStatus);
}
const  addChat=chat=>{
  
}
const  removeChat=chat=>{
  
}

export default {
  login,
  authorize,
  setAuthHeader,
  changeRequestStatus,
  fetchRequests,
  fetchCustomerRequests,
  getReceptions,

  getMessagesByChatId,
  getUsersByChatId,
  getCurrentUser,
  postMessage,
  postFile,
  getChatsByRequestId,
  createRequestChatsByRequestId,

  //chat app API
  getChatByChatId,
    fetchUserChats,
    fetchUsers,
    fetchChatUsers,
    addUsersToChat,
    fetchMessages,
    addMessage,
    fetchUnreadMessage,
    updateMessagesReadStatus,
    // postFile,
    updateChat,
    addChat,
    removeChat  
};
