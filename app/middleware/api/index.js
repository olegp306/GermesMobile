import axios from 'axios'
import querystring from 'querystring'
import { AsyncStorage } from 'react-native'

import { storeCredentials, storeCredentialsHide, loadCredentials } from '../utils/AsyncStorage'


//export const API_SERVER_URL = 'http://192.168.1.66/ApiService/germes/v1/'

//Local api service
//export const API_SERVER_URL = 'http://192.168.0.121/ApiService/germes/v1/'

// we don't need claris CRM connetion !!!
// we need only api connection . Changes based on bol claris logic  will be throught API too

//Germes real apiservice url
export const API_SERVER_URL = 'https://service.allwingroup.ru/germes/v1'
//export const API_CHAT_SERVER_URL = 'https://service.allwingroup.ru/germes/v1'


//192.168.97.2
// export const API_SERVER_URL = 'http://192.168.1.71/ApiService/germes/v1'
// export const API_CHAT_SERVER_URL = 'http:/192.168.1.71/ApiService/germes/v1'

//export const FILE_SERVER_URL = 'https://saas.claris.su/UserSettings/9323/Docs/'

const apiConf = {
    baseURL: API_SERVER_URL,
    headers: { 'Cache-Control': 'no-cache' },
    timeout: 35000
}

// const chatApiConf = {
//     baseURL: API_CHAT_SERVER_URL,
//     headers: { 'Cache-Control': 'no-cache' },
//     timeout: 35000
// }

const apiInstance = axios.create(apiConf)
//const apiChatInstance = axios.create(chatApiConf)


const onError = (error) => {
    if (error.response) {
        //console.warn('axios onError', error.response)

        if (error.response.status === 400) {
            throw Error('Не верный логин или пароль')
        } else if (error.response.status === 401) {
            throw Error('Неккоректное имя пользователя или пароль'  )
        } else if (error.response.status === 404) {
            //console.warn('нет данных' )    
        } else if (error.response.status > 401) {
            throw Error('При обработке запроса на сервере произошла ошибка, мы ее зафиксировали и уже разбираемся в причинах.' + error.response.status )
        }
    } else if (error.request) {
        console.warn('axios onError' + error.request)
        throw Error('Сервер недоступен. Проверьте свое интернет-соединение')
    } else {
        // console.warn('Error', error.message)
    }
    console.log(error.config)
}


const login = (user, password) =>  {
    //console.log("apiLogin");
    const body = `grant_type=password&username=${user}&password=${password}`
    const conf = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }}
    //console.log(instance);
    return apiInstance.post('auth/token', body, conf).catch(onError)
}

const authorize = () => apiInstance.get('/vNext/v1/users/current').catch(onError)
const setAuthHeader = (token) => {
    apiInstance.defaults.headers.authorization = `Bearer ${token}`
    //apiChatInstance.defaults.headers.authorization = `Bearer ${token}`
}

const fetchRequests = (fromRegistrationPlanDate,receptionId) =>{ 
    return apiInstance.get('requestsgermes/mobile?fromRegistrationPlanDate='+fromRegistrationPlanDate+'&receptionId='+receptionId).catch(onError)
};

const changeRequestStatus = async (requestsId) =>  {
    //console.log("changeRequestsStatus");
    const { user, password } = await loadCredentials()    
    const url=`requestsgermes/mobile/changestatus/${requestsId}`
    const body = `grant_type=password&username=${user}&password=${password}`

    const conf = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }}
    //console.log(instance);
    return apiInstance.post(url, body, conf).catch(onError)
}

const getMessagesByChatId = (chatId) =>{     
    return apiInstance.get('messages/chatid/'+chatId )
};

const getUsersByChatId = (chatId) =>{     
    return apiInstance.get('users/chatid/'+chatId )
};

const getCurrentUser = () =>{     
    return apiInstance.get('users/currrentuser/' )
};

const postMessage = (message) => {
    return apiInstance.post('/messages/', message);
};


const getChatsByRequestId = (requestId) =>{     
    return apiInstance.get(`chats?requestId=${requestId}`).catch(onError)
};

const createRequestChatsByRequestId = (requestId) =>{     
    return apiInstance.get(`chats?requestId=${requestId}&autoCreate=true`).catch(onError)
};

const addUsersToChat = (users) => {
    return apiInstance.post('/userschats',users).then(checkStatus);
};


// export function addMessage (message) {
//   return axios.post('/messages/', message).then(checkStatus);
// }
// export function addUsersToChat (users) {
//     return axios.post('/userschats',users).then(checkStatus);
//   }
  


export default {
    login,
    authorize,
    setAuthHeader,
    changeRequestStatus,
    // fetchTickets,
    // addTicket,
    // updateTicketStatus,
    // fetchCompanies,
    // fetchEmployees,
    fetchRequests,
    
    getMessagesByChatId,
    getUsersByChatId,
    getCurrentUser,
    postMessage,
    getChatsByRequestId,
    createRequestChatsByRequestId
}






















