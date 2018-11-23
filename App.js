import React, { Component } from 'react';
import  {StyleSheet} from 'react-native';
import { createStackNavigator } from 'react-navigation'
import {createDrawerNavigator } from 'react-navigation'

import { Provider } from 'react-redux'
import { store } from './app/store/index.js'

import HomeScreen from './app/containers/HomeScreen.js';
import LoginScreen from './app/containers/LoginScreen';
import RequestListScreen from './app/containers/RequestListScreen.js';
import AddCommentScreen from './app/containers/AddCommentScreen.js';
import BarCodeScannerScreen from './app/containers/BarCodeScannerScreen.js';
import NotifyOfficeScreen from './app/containers/NotifyOfficeScreen';

import './ReactotronConfig'

const styles = StyleSheet.create({
  back: { 
    backgroundColor: '#047591'
    //'#C9C8C7'
  }, 
  title:
   {
     color: 'white',
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
        headerTitle: 'Чат по заявке(МАКЕТ)'
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
            // headerTintColor: '#53565A',
            headerTintColor: '#047591'
        }
  }  
);

const routes = {
  Login: {
    sc: LoginScreen,
    
  },
  AddComment: {
    screen: AddCommentScreen,
    
  },
  NotifyOffice: {
    screen: NotifyOfficeScreen,
    
  }
  
};

const AppNavigator  = createDrawerNavigator({
  BarCodeScanner:{
    screen:BarCodeScannerScreen
  },
  NotifyOffice:{
    screen:NotifyOfficeScreen
  }
}
// ,
//  {
//   initialRouteName: 'Login',
//   navigationOptions: {
    
//   },
// }
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
