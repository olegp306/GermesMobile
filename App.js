import React, { Component } from 'react';
import  {Text, View, Button,KeyboardAvoidingView,StyleSheet} from 'react-native';
import { createStackNavigator } from 'react-navigation'

import HomeScreen from './app/containers/HomeScreen.js';
import LoginScreen from './app/components/LoginComponent.js';
import RequestListScreen from './app/containers/RequestListScreen.js';
import AddCommentScreen from './app/containers/AddCommentScreen.js';
import BarCodeScannerScreen from './app/containers/BarCodeScannerScreen.js';
import NorifyOfficeComponent from './app/components/NorifyOfficeComponent.js';
import CheckBoxExampleComponent from './app/components/CheckBoxExampleComponent.js'

const styles = StyleSheet.create({
  back: { 
      backgroundColor: '#C9C8C7'
  }, 
  title: { color: '#53565A', fontSize: 18 }
})

const RootStack = createStackNavigator(
  {
    // Home: HomeScreen
      Home:{
       screen: HomeScreen,
       navigationOptions: { header: null }
    }
    ,
    Login: {screen: LoginScreen},
    // Login: {
    //   screen: LoginScreen,
    //   navigationOptions:{
    //     headerTitle: 'вход'
    //    }
   //}
   //,

    // RequestList: RequestListScreen,
    RequestList: {
      screen: RequestListScreen,
      navigationOptions:{
        headerTitle: 'Заявки'
       }
   },

    // AddComment: AddCommentScreen,
    AddComment: {
      screen: AddCommentScreen,
      navigationOptions:{
        headerTitle: 'Комментарии по заявке'
       }
   },

    // BarCodeScanner: BarCodeScannerScreen,
    BarCodeScanner: {
      screen: BarCodeScannerScreen,
      navigationOptions:{
        headerTitle: 'Сканирование штрихкодов'
       }
   },

    // NorifyOffice: NorifyOfficeComponent,
    NorifyOffice: {
      screen: NorifyOfficeComponent,
      navigationOptions:{
        headerTitle: 'Уведомить о получении '
       }
   },

    // CheckBoxExample: CheckBoxExampleComponent
    CheckBoxExample: {
      screen: CheckBoxExampleComponent,
      navigationOptions:{
        headerTitle: 'примеры Чекбоксов'
       }
   }
  },
  {
    initialRouteName: 'Home',

    navigationOptions: {
            headerStyle: styles.back,
            headerTitleStyle: styles.title,
            headerTintColor: '#53565A'
        }
  }
);



export default class HelloWorld extends Component{
  render(){

    return (
      <RootStack />
    )
    

  }
}
