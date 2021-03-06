import React, { Component } from "react";
import { View, Text, StyleSheet, Linking } from "react-native";

import { Caption, Button, withTheme } from "react-native-paper";
import Colors from "../theme/Colors";

const statusList = {
  "95485390000": {
    id: "95485390000",
    name: "сдана"
  },
  "97670516000": {
    id: "97670516000",
    name: "приостановлена"
  },
  "95486490000": {
    id: "95486490000",
    name: "получена"
  }
};

const SDANA = 95485390000;
const PRIOSTANOVLENA = 97670516000;
const POLUCHENA = 95486490000;

class CustomerRequestBigScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _handleDocumentClick = bill => {
    const { navigation } = this.props;
    const requestNumber = navigation.getParam("requestNumber", "");
    const receiptUrl = navigation.getParam("receiptUrl", "");

    if (!receiptUrl) {
      Alert.alert(
        "Внимание",
        "У данной заявки отсутствует прикрепленный документ",
        [{ text: "Закрыть", onPress: () => {} }]
      );
    } else {
      Linking.canOpenURL(receiptUrl).then(supported => {
        if (supported) {
          Linking.openURL(receiptUrl);
        } else {
          Alert.alert(
            "Ошибка",
            "Не удалось найти программу, чтобы открыть файл данного формата",
            [{ text: "Закрыть", onPress: () => {} }]
          );
        }
      });
    }
  };

  render() {
    const { navigation } = this.props;

    const requestId = navigation.getParam("requestId", "");
    const receiptNumber = navigation.getParam("receiptNumber", "");
    const requestNumber = navigation.getParam("requestNumber", "");
    const address = navigation.getParam("address", "");
    const customerName = navigation.getParam("customerName", "");
    const receiptUrl = navigation.getParam("receiptUrl", "");
    const images = [
      {
        url: receiptUrl
      }
    ];

    const transactionParticipant = navigation.getParam(
      "transactionParticipant",
      ""
    );
    const fromRegistrationPlanDateUTC = navigation.getParam(
      "fromRegistrationPlanDate",
      ""
    );
    const statusId = navigation.getParam("statusId", "");
    const notice = navigation.getParam("notice", "");
    const fromRegistrationPlanDate = new Date(fromRegistrationPlanDateUTC);
    return (
      <View style={styles.screenContainer}>
        {/* <Text> {requestId} </Text> */}
        {/* <Text> {transactionParticipant} </Text> */}
        <Text style={styles.lable}> Участник сделки </Text>
        <Text style={styles.transactionParticipant}>
          {" "}
          {transactionParticipant}{" "}
        </Text>

        <Text style={styles.lable}> Заявка № </Text>
        <Text style={styles.requestNumberText}> {requestNumber} </Text>

        <Text style={styles.lable}> Текущий статус заявки </Text>
        <Text style={styles.requestStatusText}>
          {statusList[statusId].name}{" "}
        </Text>

        <Text style={styles.lable}> Планируемая дата получения </Text>
        <Text>
          {" "}
          {+fromRegistrationPlanDate.getDate() +
            "." +
            (fromRegistrationPlanDate.getMonth() + 1) +
            "." +
            fromRegistrationPlanDate.getFullYear()}{" "}
        </Text>
        <View style={{ height: "4%" }} />
        <Text style={styles.lable}> Адрес объекта </Text>
        <Text> {address}</Text>
        <View style={{ height: "4%" }} />
        <View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.lable}> Номер расписки </Text>
            <Text> {receiptNumber} </Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Button
              style={{ width: "85%", margin: "4%" }}
              contentStyle={{ height: 45 }}
              mode="contained"
              onPress={this._handleDocumentClick}
            >
              Скачать/посмотреть
            </Button>
          </View>
          {/* <Text>{receiptUrl} </Text> */}
        </View>
      </View>
    );
  }
}
export default withTheme(CustomerRequestBigScreen);

const styles = new StyleSheet.create({
  screenContainer: {
    flex: 1,

    // alignItems: "center",
    justifyContent: "space-evenly",
    margin: "1%",
    backgroundColor: Colors.baseBackgroundColor,
    padding: '2%',
    borderRadius: 3,
  },
  lable: {
    fontSize: 10,
    color: "gray"
  },
  transactionParticipant: {
    fontSize: 17,
    fontWeight: "500"
    //color: "gray"
  },
  requestNumberText: {
    fontSize: 24,
    color: "gray",
    fontWeight: "500"
  },
  requestStatusText: {
    fontSize: 24,
    color: Colors.navigatorBackgroudColor,
    fontWeight: "500"
  }
});
