import React, { Component } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import MessageComponent from "../message/MessageComponent";

import moment from "moment";
import "moment/src/locale/ru";
import "moment/src/locale/fr";

export default class MessagesComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const messagesSortAr = this.props.messagesSortAr;
    const currentUserId = this.props.currentUser.item.id;
    const users = this.props.users;

    return (
      <FlatList
        style={styles.messagesContainer}
        inverted
        onRefresh={this.props.OnRefresh}
        refreshing={this.props.refreshing}
        data={messagesSortAr}
        keyExtractor={(item, index) => item.id}
        renderItem={({ item }) => (
          <MessageComponent
            isMyMessage={currentUserId == item.userId ? true : false}
            author={
              users.items[item.userId]
                ? users.items[item.userId].name
                : "неизвестный отправитель"
            }
            text={item.text}
            type={item.type}
            creationDate={moment(item.creationDate).format(
              "MMMM Do YYYY, hh:mm "
            )}
            fileUrl={item.fileUrl}
          />
        )}
      />
    );
  }
}
const styles = StyleSheet.create({
  messagesContainer: {
    // backgroundColor:'white',
    width: "90%",
    marginTop: 10
  }
});
