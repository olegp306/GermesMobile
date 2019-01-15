import React, { Component } from 'react';
import { View, Text } from 'react-native';
import UserComponent from './UserComponent';


export default class UsersContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <UserComponent> UsersContainer </UserComponent>
      </View>
    );
  }
}
