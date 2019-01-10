import React, { Component } from 'react';
import { View, Text } from 'react-native';
import MessagesComponent from './MessagesComponent';


export default class MessagesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Text> MessagesContainer </Text>
      </View>
    );
  }
}
