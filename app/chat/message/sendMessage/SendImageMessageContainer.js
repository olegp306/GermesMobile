import React, { Component } from "react";

import SendImageMessageComponent from "./SendImageMessageComponent";

import { connect } from "react-redux";
import { addNewMessage } from "../../../chat/messages/actions";
import { postMessage } from "../actions";
import { postRequestTypeChat } from "../../chat/actions";
import { withNavigation } from "react-navigation";

const mapStateToProps = store => {
  return {
    currentUser: store.currentUser.toJS(),
    currentChat: store.currentChat.toJS()
  };
};

const mapDispatchToProps = dispatch => {
  return {
    //postMessage: message => dispatch(postMessage(message)),
    //addNewMessage: message => dispatch(addNewMessage(message)), ///добавляет в список, чтобы сразу показать
    postRequestTypeChat: (message, requestId) =>
      dispatch(postRequestTypeChat(message, requestId))
  };
};

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class SendImageMessageContainer extends Component {
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

  onPressIcon = () => {
    this.props.navigation.navigate("ImagePicker");
  };

  render() {
    return (
      <SendImageMessageComponent        
        onPressIcon={this.onPressIcon}
      />
    );
  }
}

export default withNavigation(SendImageMessageContainer);
