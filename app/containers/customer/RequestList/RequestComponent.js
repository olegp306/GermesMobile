import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";

//export default withNavigation(SendImageMessageContainer);
class RequestComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _onPressHandler = () => {
    //this.props.navigation.navigate({routeName: "CustomerRecievedRequestScreen"})
    //this.props.navigation.navigate("CustomerRequestBigScreen", this.props.item);
    this.props.navigation.navigate("CustomerRequestBigScreen", this.props.item);
  };

  render() {
    const {
      requestId,
      requestNumber,
      customerName,
      transactionParticipant,
      address,
      receiptNumber,
      fromRegistrationPlanDate
    } = this.props.item;

    return (
      <TouchableOpacity
        style={styles.bigContainerWithShadowStyle}
        onPress={this._onPressHandler}
      >
        <View style={{ flex: 1, margin: "2%" }}>
          <Text style={styles.transactionParticipantText}>
            {" "}
            {transactionParticipant}{" "}
          </Text>

          {/* <Text> {customerName }</Text> */}
          {/* <Text> {transactionParticipant} </Text> */}
          <Text style={styles.addressText}> {address}</Text>
          <View style={{ flexDirection: "row" ,justifyContent:"space-around"}}>
          <Text style={styles.smGrayText}> № {requestNumber} расписка №{receiptNumber}</Text>
            {/* <Text style={styles.smGrayText}> {receiptNumber} </Text> */}
            
          </View>
          {/* <Text> {fromRegistrationPlanDate} </Text> */}
        </View>
      </TouchableOpacity>
    );
  }
}
export default withNavigation(RequestComponent);

const styles = StyleSheet.create({
  bigContainerWithShadowStyle: {
    width: "96%",
    justifyContent: "space-evenly",
    borderRadius: 5,
    backgroundColor: "white",
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: "gray",
    shadowOffset: { height: 0, width: 0 },
    margin: 7
  },
  smGrayText: {
    fontSize: 11,
    color: "lightgray",
    textAlign: "center",
    marginTop: '2%',
  },
  transactionParticipantText: {
    fontSize: 15,
    fontWeight: "500"
  },
  addressText: {
    fontSize: 13,
    fontWeight: "100",
    color: "gray"
  }
});
