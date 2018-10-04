import React, { Component } from 'react';
import  {Text, View, Button,KeyboardAvoidingView} from 'react-native';
import { createStackNavigator } from 'react-navigation'

import LoginComponent from './app/components/LoginComponent.js';
import RequestListComponent from './app/components/RequestListComponent.js';
import NorifyOfficeComponent from './app/components/NorifyOfficeComponent.js';
import BarCodeScannerScreen from './app/components/BarCodeScannerScreen.js';
import AddCommentScreen from './app/components/AddCommentScreen.js';
import HomeScreen from './app/components/HomeScreen.js'

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Login: LoginComponent,
    RequestList: RequestListComponent,
    AddComment: AddCommentScreen,
    BarCodeScanner: BarCodeScannerScreen,
    NorifyOffice: NorifyOfficeComponent,
  },
  {
    initialRouteName: 'Home',
  }
);



export default class HelloWorld extends Component{
  render(){

    return (
      <RootStack />
    )
    

  }
}
