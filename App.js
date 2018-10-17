import React, { Component } from 'react';
import  {Text, View, Button,KeyboardAvoidingView,StyleSheet} from 'react-native';
import { createStackNavigator } from 'react-navigation'
//import { MaterialIcons  } from '@expo/vector-icons';

import HomeScreen from './app/containers/HomeScreen.js';
import LoginScreen from './app/containers/LoginScreen.js';
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
        headerTitle: 'Заявки',
        headerRight: (
          <View style={styles.iconContainer}>
            {/* <MaterialIcons  
            name='barcode'
            size={28}
            //color='#53565A'
            //onPress={() => alert('This is a button!')}
             /> */}
          </View>          
        ),
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
