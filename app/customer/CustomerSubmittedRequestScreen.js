import React, { Component } from "react";
import { View, Text } from "react-native";
import { Caption } from "react-native-paper";

import RequestListContainer from "./RequestList/RequestListContainer";

import _ from "lodash";

const SDANA = 95485390000;
const PRIOSTANOVLENA = 97670516000;
const POLUCHENA = 95486490000;


export default class CustomerSubmittedRequestScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }  

  render() {
    
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "space-evenly"
        }}
      >
        <RequestListContainer statusFilter={SDANA} />
      </View>
    );
  }
}
