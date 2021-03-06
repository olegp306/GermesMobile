import React, { Component } from "react";
import {
  TextInput,
  Button,
  Checkbox,
  TouchableRipple,
  Text
} from "react-native-paper";

import {
  StyleSheet,
  View,
  ActivityIndicator,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Animated,
  Dimensions
} from "react-native";
import { withTheme } from "react-native-paper";

import { Colors, Images, Metrics } from "../theme";

// const IMAGE_HEIGHT = 55;
// const IMAGE_HEIGHT_SMALL = 75;

const IMAGE_WIDTH = Dimensions.get('window').width * 0.90;
const IMAGE_WIDTH_SMALL = Dimensions.get('window').width * 0.7 ;

class LoginComponent extends Component {
  constructor(props) {
    super(props);

    //this.imageHeight = new Animated.Value(IMAGE_HEIGHT);
    this.imageWidth = new Animated.Value(IMAGE_WIDTH);
  }

  componentWillMount() {
    this.keyboardWillShowSub = Keyboard.addListener(
      "keyboardWillShow",
      this.keyboardWillShow
    );
    this.keyboardWillHideSub = Keyboard.addListener(
      "keyboardWillHide",
      this.keyboardWillHide
    );
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }

  keyboardWillShow = event => {
    // Animated.timing(this.imageHeight, {
    //   duration: event.duration,
    //   toValue: IMAGE_HEIGHT_SMALL
    // }).start();

    Animated.timing(this.imageWidth, {
      duration: event.duration,
      toValue: IMAGE_WIDTH_SMALL
    }).start();
  };

  keyboardWillHide = event => {
    // Animated.timing(this.imageHeight, {
    //   duration: event.duration,
    //   toValue: IMAGE_HEIGHT
    // }).start();

    Animated.timing(this.imageWidth, {
      duration: event.duration,
      toValue: IMAGE_WIDTH
    }).start();


  };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.screenContainer}>
            <View style={styles.logoContainer}>
              <Animated.Image
                source={Images.logo}
                resizeMode="contain"
                // style={[styles.logo, { height: this.imageHeight }]}
                style={[styles.logo, { width: this.imageWidth }]}
              />
            </View>

            <View style={styles.contentContainer}>
              {/* Login pasw inputs */}
              <View style={styles.inputsContainer}>
                <TextInput
                  style={styles.input}
                  //   mode= 'outlined'
                  onChange={e => this.props.changeUser(e.nativeEvent.text)}
                  autoCapitalize="none"
                  label="Имя пользователя"
                  value={this.props.user}
                  disabled={this.props.disabled}
                  autoCorrect={false}
                  underlineColorAndroid="transparent"
                />

                <View style={{ height: "5%", width: "100%" }} />

                <TextInput
                  style={styles.input}
                  //   mode='outlined'
                  onChange={e => this.props.changePassword(e.nativeEvent.text)}
                  autoCapitalize="none"
                  label="Пароль"
                  autoCorrect={false}
                  value={this.props.password}
                  disabled={this.props.disabled}
                  secureTextEntry={true}
                  underlineColorAndroid="transparent"
                />
              </View>

              {this.props.disabled ? (
                <View style={{ alignSelf: "center" }}>
                  <ActivityIndicator size="large" color="#627ab4" />
                </View>
              ) : null}

              <View style={{ height: "15%", width: "100%" }} />

              <View style={styles.enterContainer}>
                <Button
                  style={{ width: "100%" }}
                  contentStyle={{ height: 55 }}
                  mode="contained"
                  onPress={() => {
                    this.props.logIn();
                  }}
                >
                  Войти
                </Button>
                {/* </TouchableRipple> */}

                <View style={{ flex: 1, height: "10%" }} />
                <TouchableRipple onPress={this.props.changeRemember}>
                  <View style={styles.row}>
                    <View pointerEvents="none">
                      <Checkbox
                        //style={{border:1, borderColor: Colors.lightGray }}
                        status={this.props.remember ? "checked" : "unchecked"}
                        onPress={this.props.changeRemember}
                      />
                    </View>
                    <Text style={styles.rememberMeLabel}>Запомнить меня</Text>
                  </View>
                </TouchableRipple>
              </View>
            </View>
{/* 
            <View style={styles.bottomContainer}>
              <Text style={styles.bottomText}>
                Юридические и кадастровые услуги в сфере недвижимости
              </Text>
              <Text style={styles.bottomText}>Оллвин Груп © 2006 – 2019</Text>

              <View style={{ height: "10%", width: "100%" }} />
            </View> */}

          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

export default withTheme(LoginComponent);

const styles = StyleSheet.create({
  screenContainer: {
    // flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: Colors.baseBackgroundColor
  },
  logoContainer: {
    width: "100%",
    height: "35%",
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    //width: "90%"
  },
  contentContainer: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    //alignItems: "stretch",
    width: "85%",
    height: "50%"

    // backgroundColor: lightGreenA100
  },

  bottomContainer: {
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",

    width: "85%",
    height: "15%"
    // backgroundColor: green300
  },

  inputsContainer: {
    flex: 1,
    height: "65%",
    //flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
    // backgroundColor: green100
  },

  input: {
    width: "100%",
    backgroundColor: "white"
    // backgroundColor: lightBlue100,
  },

  enterContainer: {
    height: "35%",
    // backgroundColor: blue100,
    alignItems: "center"
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },

  rememberMeLabel: {
    color: "gray"
  },

  bottomText: {
    textAlign: "center",
    color: "gray",
    fontSize: 12
  }
});
