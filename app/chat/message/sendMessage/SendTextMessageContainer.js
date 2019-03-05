import React, { Component } from "react";
import { connect } from "react-redux";
import SendTextMessageComponent from "../sendMessage/SendTextMessageComponent";

import { addNewMessage } from "../../../chat/messages/actions";
import { postMessage } from "../actions";
import { postRequestTypeChat } from "../../chat/actions";

const mapStateToProps = store => {
  return {
    currentUser: store.currentUser.toJS(),
    currentChat: store.currentChat.toJS()
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postMessage: message => dispatch(postMessage(message)),
    addNewMessage: message => dispatch(addNewMessage(message)), ///добавляет в список, чтобы сразу показать
    postRequestTypeChat: (message, requestId) =>
      dispatch(postRequestTypeChat(message, requestId))
  };
};

@connect(
  mapStateToProps,
  mapDispatchToProps
)
export default class SendTextMessageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _sendTextMessageHandler = messageText => {
    const { currentChat, currentUser, navigation } = this.props;

    const currentChatId = currentChat.item ? currentChat.item.id : "";
    const currentUserId = currentUser.item.id;

    let message = {
      type: 2768777882000, //текстовое
      text: messageText,
      userId: currentUserId,
      chatId: currentChatId,
      tempFrontId: messageText + new Date(),
      creationDate: new Date()
    };

    if (currentChat.isRequestChatExist) {
      //отослать на сервер
      this.props.postMessage(message);

      //добавить  на вью
      this.props.addNewMessage(message);
    } else {
      const requestId = currentChat.requestId;
      this.props.postRequestTypeChat(message, requestId);
    }

    //добавить сообщение в список с крутилкой
    //как сообщение дойдет до сервера убрать крутилку
    //console.log(_sendTextMessageHandler);
  };

  render() {
    return (
      <SendTextMessageComponent
        sendTextMessage={this._sendTextMessageHandler}
      />
    );
  }
}
