import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Caption, Button , withTheme} from "react-native-paper";

class CustomerRequestBigScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { navigation } = this.props;

    const requestId = navigation.getParam("requestId", "");
    const receiptNumber = navigation.getParam("receiptNumber", "");
    const requestNumber = navigation.getParam("requestNumber", "");
    const address = navigation.getParam("address", "");
    const customerName = navigation.getParam("customerName", "");
    const transactionParticipant = navigation.getParam(
      "transactionParticipant",
      ""
    );
    const statusId = navigation.getParam("statusId", "");
    const notice = navigation.getParam("notice", "");

    return (
      <View
        style={{
          flex: 1,

          // alignItems: "center",
          justifyContent: "space-evenly",
          margin: "5%"
        }}
      >
        {/* <Text> {requestId} </Text> */}
        {/* <Text> {transactionParticipant} </Text> */}
        <Text style={styles.lable}> Участник сделки </Text>
        <Text style={styles.transactionParticipant}> {transactionParticipant} </Text>

        <Text style={styles.lable}> Заявка № </Text>
        <Text> {requestNumber} </Text>
        
        <Text style={styles.lable}> Адрес объекта </Text>
        <Text> {address}</Text>
        <View>
        <View style={{flexDirection: 'row',justifyContent:"sre"}}>
          <Text style={styles.lable}> Номер расписки </Text>
          <Text> {receiptNumber} </Text>
        </View>
        <View style={{alignItems: 'flex-end',}}>
        <Button
                  style={{ width: "85%" }}
                  contentStyle={{ height: 45 }}
                  mode="contained"
                  onPress={() => {
                    this.props.logIn();
                  }}
                >
                  Скачать/посмотреть
                </Button>
          {/* <Button>   </Button> */}
          
        </View>
        </View>
        <Text style={styles.lable}> Статус заявки </Text>
        <Text>{statusId} </Text>

        {/* <Text> {customerName }</Text> */}
        {/* <Text> {transactionParticipant} </Text> */}
        {/* <Text> {address}</Text>
        <Text> {receiptNumber} </Text> */}
        {/* <Text> {fromRegistrationPlanDate} </Text> */}
      </View>
    );
  }
}
export default withTheme(CustomerRequestBigScreen);

const styles = new StyleSheet.create({
  lable: {
    fontSize: 10,
    color: "gray"
  },
  transactionParticipant:{
    fontSize:17,
    fontWeight: "500",
    //color: "gray"
  }
});
