import React, { Component } from 'react';
import { View, Text } from 'react-native';

import ChatsList from "../../components/ChatsList/ChatList";

import { fetch as fetchChats } from "../../redux/entities/chats/actions";

export default class ChatsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Text> ChatsContainer </Text>
        <ChatsList />

      </View>
    );
  }
}
