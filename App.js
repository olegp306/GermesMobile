import React, { Component } from 'react';
import  {Text, View, Button,KeyboardAvoidingView,StyleSheet} from 'react-native';
import { createStackNavigator } from 'react-navigation'

// import store from './app/middleware/redux'
import { Provider } from 'react-redux'
import { store } from './app/store/index.js'

import { MaterialIcons  } from '@expo/vector-icons';

import Icon from 'react-native-vector-icons/FontAwesome';

import HomeScreen from './app/containers/HomeScreen.js';
import LoginScreen from './app/containers/LoginScreen';
import RequestListScreen from './app/containers/RequestListScreen.js';
import AddCommentScreen from './app/containers/AddCommentScreen.js';
import BarCodeScannerScreen from './app/containers/BarCodeScannerScreen.js';
//import NotifyOfficeComponent from './app/components/NotifyOfficeComponent.js';
import NotifyOfficeScreen from './app/containers/NotifyOfficeScreen';
import CheckBoxExampleComponent from './app/components/CheckBoxExampleComponent.js'

import './ReactotronConfig'




const styles = StyleSheet.create({
  back: { 
    backgroundColor: '#C9C8C7'
  }, 
  title:
   {
     color: '#53565A',
     fontSize: 18
   },
   headButtonsContainer:{
    flexDirection: 'row',
   },
   
   iconContainer: {
    width: 45,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
})

const RootStack = createStackNavigator(
  {
    // Home: HomeScreen
      Home:{
       screen: HomeScreen,
       navigationOptions: { header: null }
    }
    ,
    Login: {screen: LoginScreen,  navigationOptions: { header: null }},

    
    RequestList: {
      screen: RequestListScreen,
      
   },

    AddComment: {
      screen: AddCommentScreen,
      navigationOptions:{
        headerTitle: 'Чат по заявке'
       }
   },

    
    BarCodeScanner: {
      screen: BarCodeScannerScreen,
      navigationOptions:{
        headerTitle: 'Сканирование штрихкодов'
       }
   },

  
    NotifyOffice: {
      screen: NotifyOfficeScreen,
      navigationOptions:{
        headerTitle: 'Уведомить о получении '
       }
   },

  
  },
  {
    initialRouteName: 'Login',

    navigationOptions: {
            headerStyle: styles.back,
            headerTitleStyle: styles.title,
            headerTintColor: '#53565A'
        }
  }
);

//Назначение функции connect вытекает из названия: подключи React компонент к Redux store.
// Результат работы функции connect - новый присоединенный компонент, который оборачивает переданный компонент.
// У нас был компонент <App />, а на выходе получился <Connected(App)>. В этом не трудно убедиться, если взглянуть в react dev tools.

export default class HelloWorld extends Component{
  render(){
    return (
      <Provider store={store}>
        <RootStack />
        {/* <RequestListScreen /> */}
        {/* <TestComponent /> */}
      </Provider>
    )
  }
}
