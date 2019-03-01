import React, { Component } from "react";
import { View, Text } from "react-native";
import SendImageMessageContainer from "./SendImageMessageContainer";
import SendTextMessageContainer from "./SendTextMessageContainer";

export default class SendMessageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View
        style={{
          flexDirection: "row",
          width: "100%",         
        }}
      >
        <View slyle={{ flexDirection: "row", justifyContent: 'flex-start',alignItems: "center" }}>          
          <SendImageMessageContainer />
        </View>

        <View slyle={{ flexDirection: "row", justifyContent: 'flex-start',alignItems: "center"  }}>
          <SendTextMessageContainer />
        </View>
      </View>
    );
  }
}
