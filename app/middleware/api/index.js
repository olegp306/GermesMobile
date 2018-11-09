import axios from 'axios'
import querystring from 'querystring'
import { AsyncStorage } from 'react-native'

import { storeCredentials, storeCredentialsHide, loadCredentials } from '../utils/AsyncStorage'


//export const API_SERVER_URL = 'http://192.168.1.66/ApiService/germes/v1/'
export const API_SERVER_URL = 'http://192.168.0.121/ApiService/germes/v1/'

//export const API_SERVER_URL = 'https://service.allwingroup.ru/germes/v1'

//export const CLARIS_SERVER_URL='http://test.allwingroup.ru:3652'


// export const API_SERVER_URL = 'https://service.allwingroup.ru/germes/v1/'
//export const FILE_SERVER_URL = 'https://saas.claris.su/UserSettings/9323/Docs/'

const apiConf = {
    baseURL: API_SERVER_URL,
    headers: { 'Cache-Control': 'no-cache' },
    timeout: 35000
}


//const accessToken=`Ex2xbK2ZuCsj0ZeDfU83FUVPLZxrXc0LFcCWjorRc7u8EZRbsB3cwxB1XwS6kI2GIFMyIWFICWcuiQW4uOlfHyLqO7_pmAgdcnajnB_fedDo6al__FRvnrwKYasjgvGxyg8GIjR5EDRm8W6aDGoGCnevlmq5lazPflfM2GPnstY0uRNmbBeRKbKz3GAdfVCsmBkFHw_SnMKxPaZSmkkh6AI4lJF9q_5w22vhbys9Ax8AxFxoajzXAUex5b1WkBOtpS5nfwo5Q1qFNPvoyInEkeeb4aS4TaiBO_Z5jaeT3Zi8Bhs_TOgXp3ipa9lIC68mZbLsb8kTytGeJO30i8TgWpbL9LBZ_FjhUFffrVRpuJTaI2D--wtkRTV_cSDG-Brrs00rIJ2hHy6Qc-t8wlaxgg`;


const apiInstance = axios.create(apiConf)


toAssociativeArray =(data,idFieldName)=>{
    if(!idFieldName){
      var  idFieldName="id";
    }
    let map = {};
    //console.log('toAssociativeArr', data);
    for (var i = 0, l = data.length; i < l; i++) {
      let item=data[i];
        map[item[idFieldName]] = item;
    }
    //console.log(map);
    return map;
  }
/*
instance.interceptors.request.use(request => {
    console.log('Starting Request', request)
    return request
})

instance.interceptors.response.use(response => {
    console.log('Response:', response)
    return response
})*/

const onError = (error) => {
    if (error.response) {
        //console.warn('axios onError', error.response)

        if (error.response.status === 400) {
            throw Error('Не верный логин или пароль')
        } else if (error.response.status === 401) {
            throw Error('Неккоректное имя пользователя или пароль'  )
        } else if (error.response.status > 401) {
            throw Error('При обработке запроса на сервере произошла ошибка, мы ее зафиксировали и уже разбираемся в причинах.' + error.response.status )
        }
    } else if (error.request) {
        console.warn('axios onError' + error.request)
        throw Error('Сервер недоступен. Проверьте свое интернет-соединение')
    } else {
        console.warn('Error', error.message)
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
const setAuthHeader = (token) => apiInstance.defaults.headers.authorization = `Bearer ${token}`

const fetchRequests = (fromRegistrationPlanDate,receptionId) =>{ 
    //console.log(API_SERVER_URL+'requestsgermes/mobile?fromRegistrationPlanDate='+fromRegistrationPlanDate+'&receptionId='+receptionId) ;
    return apiInstance.get('requestsgermes/mobile?fromRegistrationPlanDate='+fromRegistrationPlanDate+'&receptionId='+receptionId).catch(onError)
};

const changeRequestsStatus = async (requestsId) =>  {
    console.log("changeRequestsStatus");
    const { user, password } = await loadCredentials()    

    const url="BusinessCenterAPI.aspx?action=ChangeRequestsStatus"
    const body = `grant_type=password&username=${user}&password=${password}&requestsId=${requestsId}`

    const conf = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }}
    //console.log(instance);
    return clarisInstance.post(url, body, conf).catch(onError)
}



export default {
    login,
    authorize,
    setAuthHeader,
    changeRequestsStatus,
    // fetchTickets,
    // addTicket,
    // updateTicketStatus,
    // fetchCompanies,
    // fetchEmployees,
    fetchRequests,
    toAssociativeArray
}






















