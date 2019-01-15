import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class UserComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Text> UserComponent </Text>
      </View>
    );
  }
}
