import React, { Component } from "react";
import { StyleSheet, SafeAreaView, View, Text, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import {
  createStackNavigator,
  createDrawerNavigator,
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
  createMaterialBottomTabNavigator
} from "react-navigation";

import { Provider as StoreProvider } from "react-redux";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

import { store } from "./app/store/index.js";

import HomeScreen from "./app/containers/HomeScreen.js";
import LoginScreen from "./app/containers/LoginScreen";
import RequestListScreen from "./app/containers/RequestListScreen.js";
import ChatScreen from "./app/containers/ChatScreen";
import BarcodeScannerScreen from "./app/containers/BarcodeScannerScreen.js";
import NotifyOfficeScreen from "./app/containers/NotifyOfficeScreen";
//import CameraScreen from './app/camera/CameraScreen';
import ImagePickerComponent from "./app/camera/ImagePickerComponent";

import CustomerGeneralScreen from "./app/customer/CustomerGeneralScreen";

import CustomerPausedRequestScreen from "./app/customer/CustomerPausedRequestScreen";
import CustomerSubmittedRequestScreen from "./app/customer/CustomerSubmittedRequestScreen";
import CustomerRecievedRequestScreen from "./app/customer/CustomerRecievedRequestScreen";
// import CustomerRecievedRequestScreen from './app/customer/CustomerRecievedRequestScreen';
import CustomerRequestBigScreen from "./app/customer/CustomerRequestBigScreen";
import { CustomerDrawerContentComponent } from "./app/customer/CustomerDrawerContentComponent";

// import CustomerSecondScreen from './app/customer/CustomerSubmittedRequestScreen';
// import CustomerThirdScreen from './app/customer/CustomerRecievedRequestScreen';
// import CustomerRequestListScreen from './app/customer/CustomerPausedRequestScreen';

import Colors from "./app/theme/Colors.js";
//import {colors as Colors2} from "./app/theme/colors2.js"
import color from "color";
import { black, white } from "./app/theme/paperUicolors.js";
import fonts from "./app/theme/fonts";

import "./ReactotronConfig";

const styles = StyleSheet.create({
  back: {
    backgroundColor: "#047591"
    //'#C9C8C7'
  },
  title: {
    color: "white",
    fontSize: 18
  },
  headButtonsContainer: {
    flexDirection: "row"
  },

  iconContainer: {
    width: 45,
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  tabNavContainerStyle: { alignItems: "center", justifyContent: "center" },
  tabNavTextStyle: {
    //alignItems: "center",
    color: "white",
    fontSize: 16,
    fontWeight: "400"
  }
});

const LoginStackNav = createStackNavigator({
  Login: { screen: LoginScreen, navigationOptions: { header: null } }
});

const ChatStackNav = createStackNavigator(
  {
    Chat: { screen: ChatScreen },
    //Camera:{ screen: CameraScreen },
    ImagePicker: { screen: ImagePickerComponent }
  },
  {
    initialRouteName: "Chat",
    navigationOptions: { header: null }
  }
);

const RequestStackNav = createStackNavigator(
  {
    RequestList: { screen: RequestListScreen },
    ChatStack: { screen: ChatStackNav }
  },
  {
    initialRouteName: "RequestList",
    navigationOptions: { header: null }
  }
);

const TabsNav = createBottomTabNavigator(
  {
    RequestList: {
      screen: RequestStackNav,
      navigationOptions: {
        tabBarLabel: "Заявки",
        tabBarIcon: ({ tintColor }) => (
          <Icon2 size={20} name={"library-books"} color={tintColor} />
        )
      }
    },
    BarcodeScanner: {
      screen: BarcodeScannerScreen,
      navigationOptions: {
        tabBarLabel: "Сканер",
        tabBarIcon: ({ tintColor }) => (
          <Icon2 size={20} name={"barcode-scan"} color={tintColor} />
        )
      }
    },
    NotifyOffice: {
      screen: NotifyOfficeScreen,
      navigationOptions: {
        tabBarLabel: "Отправить",
        tabBarIcon: ({ tintColor }) => (
          <Icon size={20} name={"send"} color={tintColor} />
        )
      }
    }
  },
  {
    order: ["RequestList", "BarcodeScanner", "NotifyOffice"],
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: "white",
      inactiveBackgroundColor: Colors.navigatorBackgroudDarkColor,
      activeBackgroundColor: Colors.navigatorBackgroudColor
    }
  }
);

const CustomerTabNav = createMaterialTopTabNavigator(
  {
    CustomerSubmittedRequestScreen: {
      screen: CustomerSubmittedRequestScreen,
      navigationOptions: {
        tabBarLabel: (
          <View style={styles.tabNavContainerStyle}>
            <Text style={styles.tabNavTextStyle}>сдана</Text>
          </View>
        )
        // ,
        // tabBarIcon: ({ tintColor }) => (
        //   <Icon2 size={20} name={"library-books"} color={tintColor} />
        // )
      }
    },

    CustomerPausedRequestScreen: {
      screen: CustomerPausedRequestScreen,
      navigationOptions: {
        tabBarLabel: (
          <View style={styles.tabNavContainerStyle}>
            <Text style={styles.tabNavTextStyle}>приостановка</Text>
          </View>
         
        )
        // ,
        // tabBarIcon: ({ tintColor }) => (
        //   <Icon2 size={20} name={"barcode-scan"} color={tintColor} />
        // )
      }
    },
    CustomerRecievedRequestScreen: {
      screen: CustomerRecievedRequestScreen,
      navigationOptions: {
        tabBarLabel: (
          <View style={styles.tabNavContainerStyle}>
            <Text style={styles.tabNavTextStyle}>получена</Text>
          </View>
         
        )
        // ,
        // tabBarIcon: ({ tintColor }) => (
        //   <Icon size={20} name={"send"} color={tintColor} />
        // )
      }
    }
  },
  {
    order: [
      "CustomerSubmittedRequestScreen",
      "CustomerPausedRequestScreen",
      "CustomerRecievedRequestScreen"
    ],
    animationEnabled: true,

    tabBarOptions: {
      activeTintColor: "red", // Color of tab when pressed
      inactiveTintColor: "#b5b5b5", // Color of tab when not pressed
      showIcon: "true", // Shows an icon for both iOS and Android
      showLabel: "true", //No label for Android

      // activeTintColor: "white",
      inactiveBackgroundColor: Colors.navigatorBackgroudDarkColor,
      activeBackgroundColor: "red"
    }
  }
);

const CustomerStackNav = createStackNavigator(
  {
    CustomerGeneralScreen: {
      screen: CustomerGeneralScreen,
      navigationOptions: { header: null }
    },
    CustomerMyRequestsScreen: {
      screen: CustomerTabNav,
      navigationOptions: () => ({ title: `Мои заявки`, headerBackTitle: null })
    },
    CustomerRequestBigScreen: {
      screen: CustomerRequestBigScreen,
      navigationOptions: () => ({
        title: `Заявка подробно`,
        headerBackTitle: null
      })
    }
  },
  {
    initialRouteName: "CustomerGeneralScreen"
    // navigationOptions: { header: "Test header" }
  }
);

const CustomerDrawerNav = createDrawerNavigator(
  {
    General: {
      screen: CustomerStackNav
    },
    MyRequests: {
      screen: CustomerTabNav
    }
  },
  {
    contentComponent: CustomerDrawerContentComponent
  }
);

const PrimaryNav = createStackNavigator(
  {
    LoginStack: { screen: LoginStackNav },
    TabsNav: { screen: TabsNav },
    CustomerStackNav: { screen: CustomerStackNav },
    CustomerDrawerNav: { screen: CustomerDrawerNav }
    // ChatStack :{screen: ChatStackNav}
  },
  {
    initialRouteName: "LoginStack",
    navigationOptions: { header: null }
  }
);

const theme = {
  dark: false,
  roundness: 4,
  colors: {
    primary: Colors.navigatorBackgroudColor,
    accent: "#03dac4",
    background: "#f6f6f6",
    surface: white,
    error: "#B00020",
    text: "#000000",
    disabled: color(black)
      .alpha(0.26)
      .rgb()
      .string(),
    placeholder: color(black)
      .alpha(0.54)
      .rgb()
      .string(),
    backdrop: color(black)
      .alpha(0.5)
      .rgb()
      .string()
  },
  fonts
};

//Назначение функции connect вытекает из названия: подключи React компонент к Redux store.
// Результат работы функции connect - новый присоединенный компонент, который оборачивает переданный компонент.
// У нас был компонент <App />, а на выходе получился <Connected(App)>. В этом не трудно убедиться, если взглянуть в react dev tools.

export default class HelloWorld extends Component {
  render() {
    return (
      <StoreProvider store={store}>
        <PaperProvider theme={theme}>
          {/* <View style={{ flex:1 , paddingTop:25,backgroundColor: Colors.whiteSmoke}}> */}
          <View style={{ flex: 1, paddingTop: 25 }}>
            <PrimaryNav />
          </View>
        </PaperProvider>
      </StoreProvider>
    );
  }
}


