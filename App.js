import React, { Component } from 'react';
import  {Text, View} from 'react-native';
// import { StackNavigator } from 'react-navigation'

import LoginComponent from './app/components/LoginComponent.js';
import RequestListComponent from './app/components/RequestListComponent.js';
import NorifyOfficeComponent from './app/components/NorifyOfficeComponent.js';
import  BarCodeScannerScreen from './app/components/BarCodeScannerScreen.js';
import  AddCommentScreen from './app/components/AddCommentScreen.js';


export default class HelloWorld extends Component{
  render(){
    return(
      <View>
        {/* <LoginComponent /> */}
        <RequestListComponent />
        {/* <NorifyOfficeComponent /> */}
        {/* <BarCodeScannerScreen /> */}
        {/* <AddCommentScreen /> */}
      </View>
    )

  }
}
