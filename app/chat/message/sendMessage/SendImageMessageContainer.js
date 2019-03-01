import React, { Component } from "react";

import SendImageMessageComponent from "./SendImageMessageComponent";

import { connect } from "react-redux";
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
export default class SendImageMessageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      pickerDisaplayed: false
    };
  }

  _togglePicker = () => {
    this.setState({
      pickerDisaplayed: !this.state.pickerDisaplayed
    });
  };

  _sendImageMessageHandler = image => {
    //сформировать с типом Image
    const { currentChat, currentUser, navigation } = this.props;

    const currentChatId = currentChat.item ? currentChat.item.id : "";
    const currentUserId = currentUser.item.id;

    let message = {
      type: 2768777880000, //картинка
      text: image.uri,
      userId: currentUserId,
      chatId: currentChatId,
      tempFrontId: image.uri + new Date(),
      creationDate: new Date()
    };

    if (currentChat.isRequestChatExist) {
      //отослать на сервер маленьккую картинку
      //отослать на сервер большую картинку
      this.props.postMessage(message);

      //добавить  на вью
      this.props.addNewMessage(message);
    } else {
      const requestId = navigation.getParam("requestId", "");

      this.props.postRequestTypeChat(message, requestId);
    }

    //добавить сообщение в список с крутилкой
    //как сообщение дойдет до сервера убрать крутилку
  };

  render() {
    return (
      <SendImageMessageComponent
        sendImageMessage={this._sendImageMessageHandler}
      />
    );
  }
}
