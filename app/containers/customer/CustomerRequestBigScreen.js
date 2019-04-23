import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Modal } from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
import { Caption, Button, withTheme } from "react-native-paper";

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
    this.state = {
      index: 0,
      modalVisible: false
    };
  }

  _downloadFile = () => {
    const { navigation } = this.props;
    const receiptUrl = navigation.getParam("receiptUrl", "");

    const images = [
      {
        // Simplest usage.
        url: receiptUrl,

        // width: number
        // height: number
        // Optional, if you know the image size, you can set the optimization performance

        // You can pass props to <Image />.
        props: {
          // headers: ...
        }
      }
    ];
  };

  //onCancel={_onCancelViewHandler} onSwipeDown ={_onSwipeDownHandler}
  _onCancelViewHandler = () => {
    this.setState({ modalVisible: false });
  };
  _onSwipeDownHandler = () => {
    this.setState({ modalVisible: false });
  };

  _downloadFile = () => {
    this.setState({ modalVisible: true });
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
        <Text style={styles.transactionParticipant}>
          {" "}
          {transactionParticipant}{" "}
        </Text>

        <Text style={styles.lable}> Заявка № </Text>
        <Text> {requestNumber} </Text>

        <Text style={styles.lable}> Статус заявки </Text>        
        <Text>{statusList[statusId].name } </Text>

        <Text style={styles.lable}> Адрес объекта </Text>
        <Text> {address}</Text>
        <View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.lable}> Номер расписки </Text>
            <Text> {receiptNumber} </Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Button
              style={{ width: "85%",margin: '4%', }}
              contentStyle={{ height: 45 }}
              mode="contained"
              onPress={this._downloadFile}
            >
              Скачать/посмотреть
            </Button>
          </View>
          {/* <Text>{receiptUrl} </Text> */}
        </View>

        <View
          style={{
            padding: 10
          }}
        >
          <Modal
            visible={this.state.modalVisible}
            transparent={true}
            onRequestClose={() => this.setState({ modalVisible: false })}
          >
            <ImageViewer
              imageUrls={images}
              index={this.state.index}
              onSwipeDown={() => {
                this.setState({ modalVisible: false });
              }}
              onMove={data => console.log(data)}
              enableSwipeDown={true}
            />
          </Modal>
        </View>

        

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
  transactionParticipant: {
    fontSize: 17,
    fontWeight: "500"
    //color: "gray"
  }
});
