import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class MessageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Text> MessageComponent </Text>
      </View>
    );
  }
}
