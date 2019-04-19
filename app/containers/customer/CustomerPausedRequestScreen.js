import React, { Component } from "react";
import { View, Text } from "react-native";
import { Caption } from "react-native-paper";

export default class CustomerPausedRequestScreen extends Component {
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
        <Caption>CustomerPausedRequestScreen</Caption>
      </View>
    );
  }
}
