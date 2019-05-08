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
            
            {transactionParticipant}
          </Text>
          <View style={{height:"2%"}}/>
          {/* <Text> {customerName }</Text> */}
          {/* <Text> {transactionParticipant} </Text> */}
          <Text style={styles.addressText}> {address}</Text>
          <View style={{height:"2%"}}/>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.receiptNumberText}> {receiptNumber} </Text>
            <Text style={styles.requestNumberText}> № {requestNumber} </Text>
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
    //width: "96%",
    justifyContent: "space-evenly",
    borderRadius: 5,
    backgroundColor: "white",
    shadowOpacity: 0.75,
    shadowRadius: 2,
    shadowColor: "gray",
    shadowOffset: { height: 0, width: 0 },
    marginRight: 3,
    marginLeft: 3,
    marginTop: 5,
  },
  smGrayText: {
    fontSize: 11,
    color: "lightgray",
    textAlign: "center",
    marginTop: "2%"
  },
  transactionParticipantText: {
    fontSize: 15,
    fontWeight: "500"
  },
  addressText: {
    fontSize: 12,
    fontWeight: "200",
    // color: "gray"
  },
  requestNumberText: {
    fontSize: 13,
    fontWeight: "100"
    //color: "gray"
  },
  receiptNumberText: {
    fontSize: 13,
    fontWeight: "100",
    color: "gray"
  }
});
