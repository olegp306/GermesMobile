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
import AddCommentScreen from './app/containers/AddCommentScreen.js';
import BarcodeScannerScreen from './app/containers/BarcodeScannerScreen.js';
import NotifyOfficeScreen from './app/containers/NotifyOfficeScreen';

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
  // SignUp: { screen: SignUpScreen },
  // ForgottenPassword: { screen: ForgottenPasswordScreen, navigationOptions: { title: 'Forgot Password' } }
// }, 
// {
//   headerMode: 'float',
//   navigationOptions: {
//     headerStyle: {backgroundColor: 'red'},
//     title: 'You are not logged in'
  // }
})

// const StackNav = createStackNavigator(
//   {
//     // Home: HomeScreen
//     Home: { screen: HomeScreen, navigationOptions: { header: null } },    
//     Login: { screen: LoginScreen,  navigationOptions: { header: null } },    
//     RequestList: { screen: RequestListScreen},
//     AddComment: { screen: AddCommentScreen},
//     BarcodeScanner: { screen: BarcodeScannerScreen },  
//     NotifyOffice: { screen: NotifyOfficeScreen },  
//   },
//   {
//     initialRouteName: 'Login',

//     navigationOptions: {
//             headerStyle: styles.back,
//             headerTitleStyle: styles.title,
//             headerTintColor: Colors.darkBackgroundColor
//     }
//   }  
// );

const TabsNav  = createBottomTabNavigator(
  {
    RequestList: { 
      screen: RequestListScreen,
      navigationOptions: {
        tabBarLabel:"Заявки",
        tabBarIcon: ({ tintColor }) => <Icon name={"library-books"} color={tintColor} />
      }
    },
    BarcodeScanner:{ 
      screen:BarcodeScannerScreen,
      navigationOptions: {
        tabBarLabel:"Сканер",
        tabBarIcon: ({ tintColor }) => <Icon2 name={"barcode-scan"} color={tintColor} />
    }

     },
    NotifyOffice:{ 
      screen:NotifyOfficeScreen,
      navigationOptions: {
        tabBarLabel:"Отправить",
        tabBarIcon: ({ tintColor }) => <Icon name={"send"} color={tintColor} />
      }
    }  
  }
  ,
  {
    order: ['RequestList','BarcodeScanner','NotifyOffice'],
    animationEnabled: true,
  }

);

// const DrawerNav = createDrawerNavigator(
//   { 
//     //StackNav : {screen: StackNav },
//     //TabsNav : {screen: TabsNav },
//     //Login: { screen: LoginScreen },
//     AddComment: { screen: AddCommentScreen },
//     NotifyOffice: { screen: NotifyOfficeScreen }, 
//   },

//   // {
//   //   initialRouteName: 'Login',

//   //   // navigationOptions: {
//   //   //         headerStyle: styles.back,
//   //   //         headerTitleStyle: styles.title,
//   //   //         headerTintColor: Colors.darkBackgroundColor
//   //   // }
//   // }
// );


const PrimaryNav= createStackNavigator({
  LoginStack:{screen: LoginStackNav},
  TabsNav:{screen: TabsNav}
  },
  {
    initialRouteName: 'LoginStack',
    navigationOptions: { header: null }
  }
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
