import React, { Component } from "react";
import { CheckBox } from "react-native-elements";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { Clipboard } from 'react-native';

import { Colors } from "../theme";

export default class RequestComponent extends Component {
  _handleShortPress = () => {
    this.props.onShortPressRequest(this.props);
  };

  _handleLongPress = () => {
    this.props.onLongPressRequest(this.props.requestId);
  };

  _handleOnChangeRequestCheckBox = requestId => {
    this.props.onChangeRequestCheckBox(this.props.requestId);
  };

  writeToClipboard = async (text) => {
    await Clipboard.setString(text);
    console.warn('ошибка скопированна в буфер!', text ? text : "ошибок нет")
    alert('ошибка скопированна в буфер!')
  };

  render() {
    return (
      <TouchableOpacity
        onPress={this._handleShortPress}
        // onLongPress={()=>{this.writeToClipboard(this.props.errorText)}}
        onLongPress={()=>{this.writeToClipboard(this.props.errorText)}}
      >
        {/* <ActivityIndicator size='large' /> */}
        <View
          style={
            this.props.isSelected == true
              ? styles.selectedContentContainer
              : styles.unselectedContentContainer
          }
        >
          <View style={styles.receiptNumberContainer}>
            <Text style={styles.receiptNumber}>
              {" "}
              {this.props.receiptNumber}{" "}
            </Text>
          </View>

          <View style={styles.middleContainer}>
            <View style={styles.leftMiddleContainer}>
              <Text>{this.props.requestNumber + " " + this.props.address}</Text>
              <Text>{this.props.transactionParticipant}</Text>
              {this.props.notice ? (
                <Text style={styles.notice}> {this.props.notice} </Text>
              ) : null}
            </View>

            <View style={styles.rightMiddleContainer}>
              <CheckBox
                onPress={this._handleOnChangeRequestCheckBox}
                containerStyle={styles.checkboxContainer}
                checkedColor="green"
                checked={this.props.isSelected}
              />

              {this.props.isUpdating ? (
                <ActivityIndicator size="large" />
              ) : null}
            </View>
          </View>

          <View style={styles.bottomStikersContainer}>
            <View style={styles.bottomContainer} onPress={()=>{this.writeToClipboard(this.props.errorText)}}>
              {this.props.errorText ? (
                <View style={styles.stikerError}>
                  {/* <Text> Ошибка: {this.props.errorText} </Text> */}
                  <Text> Ошибка </Text>
                </View>
              ) : null}
              {this.props.isBarcodeExist ? (
                <View style={styles.stikerContainer}>
                  <Text>Прочитан баркод </Text>
                </View>
              ) : null}
              {this.props.isChangeStatusSuccess ? (
                <View style={styles.stikerContainer}>
                  <Text>Статус ПОЛУЧЕНА </Text>
                </View>
              ) : null}

              {this.props.isStatusPriostanovka ? (
                <View style={styles.stikerPriostanovka}>
                  <Text>приостановка </Text>
                </View>
              ) : null}
            </View>
          </View>
        </View>
        <View style={styles.horizontalDivider} />
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  unselectedContentContainer: {
    width: "100 %",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
    marginBottom: 2
    //backgroundColor:Colors.ligth2
  },

  selectedContentContainer: {
    width: "100 %",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
    marginBottom: 2,
    opacity: 0.5
  },

  checkboxContainer: {
    backgroundColor: "white",
    borderWidth: 0
  },

  receiptNumberContainer: {
    //backgroundColor: Colors.baseBackgroundColor
  },
  receiptNumber: {
    fontWeight: "500",
    fontSize: 17,
    marginLeft: 10
  },

  stikerContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 1,
    backgroundColor: "#4ef235"
  },

  stikerPriostanovka: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 1,
    backgroundColor: Colors.statusPriostanovkaBackgroundColor
  },

  stikerError: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 1,
    backgroundColor: Colors.warningBackgroundColor
  },

  notice: {
    fontStyle: "italic"
  },

  middleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch",
    marginLeft: 10
  },

  leftMiddleContainer: {
    width: "85%"
  },

  rightMiddleContainer: {
    width: "15%",
    alignItems: "center"
    //backgroundColor:Colors.ligth2
  },

  bottomContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch"
  },

  bottomStikersContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch"
  },

  horizontalDivider: {
    width: "100%",
    height: 1,
    backgroundColor: "#6E6E6E"
    // justifyContent: 'space-between',
  },
  checkbox: {
    // borderColor:Colors.actionItemColor,
    // color:Colors.actionItemColor
  }
});
