import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { fetch as fetchChats } from "../../redux/chat/entities/chats/actions";

import { setCurrentChat } from "../../redux/chat/actions/chatApp";
import { fetch as fetchChatAppData } from "../../redux/chat/actions/chatApp";

import {
  getChats,
  //getCurrentChat,
  // getChatApp,
  //getChatsFilter,
  getCurrentUserId,
  //getUnreadMessages
} from "../../redux/chat/selectors/index";
import { connect } from "react-redux";


import ChatsList from "../../components/ChatsList/ChatList";



const mapStateToProps = store => {
  return {
    // chatApp: getChatApp(store),
    chats: getChats(store),
    // chatsFilter: getChatsFilter(store),
    currentUserId: getCurrentUserId(store),
    // unreadMessages: getUnreadMessages(store)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchChats: userId => dispatch(fetchChats(userId)),
    onClickChat: chat => dispatch(setCurrentChat(chat)),
    // setChatsFilter: filter => dispatch(setChatsFilter(filter)),
    // resetChatsFilter: () => dispatch(resetChatsFilter()),
    fetchChatAppData: userId => dispatch(fetchChatAppData(userId))
  };
};


 class ChatsContainer extends Component {
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatsContainer);