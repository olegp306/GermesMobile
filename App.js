import React, { Component } from 'react';
import  {StyleSheet, SafeAreaView, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import { createStackNavigator, createDrawerNavigator, createBottomTabNavigator, createMaterialTopTabNavigator,createMaterialBottomTabNavigator } from 'react-navigation'

import { Provider } from 'react-redux'
import { store } from './app/store/index.js'

import HomeScreen from './app/containers/HomeScreen.js';
import LoginScreen from './app/containers/LoginScreen';
import RequestListScreen from './app/containers/RequestListScreen.js';
import ChatScreen from './app/containers/ChatScreen';
import BarcodeScannerScreen from './app/containers/BarcodeScannerScreen.js';
import NotifyOfficeScreen from './app/containers/NotifyOfficeScreen';
//import CameraScreen from './app/camera/CameraScreen';
import ImagePickerComponent from './app/camera/ImagePickerComponent';




import Colors from "./app/theme/Colors.js"

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

const LoginStackNav = createStackNavigator({
  Login: { screen: LoginScreen,  navigationOptions: { header: null } },      
})


// сonst PrimaryNav= createStackNavigator({
//   LoginStack:{screen: LoginStackNav},
//   TabsNav:{screen: TabsNav},
//   // ChatStack :{screen: ChatStackNav}
//   },
//   {
//     initialRouteName: 'LoginStack',
//     navigationOptions: { header: null }
//   },
 
  
// )


const ChatStackNav=createStackNavigator({
  Chat:{ screen: ChatScreen },
  //Camera:{ screen: CameraScreen },
  ImagePicker: {screen: ImagePickerComponent }
},
{
  initialRouteName: 'ImagePicker',
  navigationOptions: { header: null }
})


const RequestStackNav=createStackNavigator({
  RequestList: {screen: RequestListScreen },
  ChatStack: {screen: ChatStackNav }
  }
  ,
{
  initialRouteName: 'RequestList',
  navigationOptions: { header: null }
})


const TabsNav  = createBottomTabNavigator(
  {

    RequestList: { 
      screen: RequestStackNav,
      navigationOptions: {
        tabBarLabel:"Заявки",
        tabBarIcon: ({ tintColor }) => <Icon2 size={20} name={"library-books"} color={tintColor} />
    }
      
    },
    BarcodeScanner:{ 
      screen:BarcodeScannerScreen,
      navigationOptions: {
        tabBarLabel:"Сканер",
        tabBarIcon: ({ tintColor }) => <Icon2 size={20} name={"barcode-scan"} color={tintColor} />
    }
 
     },
    NotifyOffice:{ 
      screen:NotifyOfficeScreen,
      navigationOptions: {
        tabBarLabel:"Отправить",
        tabBarIcon: ({ tintColor }) => <Icon size={20} name={"send"} color={tintColor} />
      }
    }  
  }          
  ,
  {
    order: ['RequestList','BarcodeScanner','NotifyOffice'],
    animationEnabled: true,
    tabBarOptions:{
      activeTintColor : "white",
      inactiveBackgroundColor:Colors.navigatorBackgroudDarkColor,
      activeBackgroundColor:Colors.navigatorBackgroudColor

    }
  }

);


const PrimaryNav= createStackNavigator({
  LoginStack:{screen: LoginStackNav},
  TabsNav:{screen: TabsNav},
  // ChatStack :{screen: ChatStackNav}
  },
  {
    initialRouteName: 'LoginStack',
    navigationOptions: { header: null }
  },
 
  
)




//Назначение функции connect вытекает из названия: подключи React компонент к Redux store.
// Результат работы функции connect - новый присоединенный компонент, который оборачивает переданный компонент.
// У нас был компонент <App />, а на выходе получился <Connected(App)>. В этом не трудно убедиться, если взглянуть в react dev tools.

export default class HelloWorld extends Component{
  render(){
    return (
      <Provider store={store}>
        <View style={{ flex:1 , paddingTop:25,backgroundColor: Colors.navigatorBackgroudDarkColor}}>
          <PrimaryNav />
        </View>
        {/* <RequestListScreen /> */}
        {/* <TestComponent /> */}
      </Provider>
    )
  }
}
