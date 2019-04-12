import React, { Component } from "react";
import { connect } from "react-redux";
import { postRequestTypeChat } from "../chat/chat/actions";
import { postMessage, postFileMessage } from "../chat/message/actions";
import { addNewMessage as addNewMessageOnView } from "../chat/messages/actions";
import { postFile } from "../store/germes/file/actions";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image
} from "react-native";
import { ImagePicker, Permissions } from "expo";

import PickerItem from "./PickerItem";
import _ from "lodash";

const photoSourceItems = {
  1: {
    id: 1,
    text: "Камера"
  },
  2: {
    id: 2,
    text: "Галерея"
  }
};

const mapStateToProps = store => {
  return {
    currentUser: store.currentUser.toJS(),
    currentChat: store.currentChat.toJS()
  };
};
const mapDispatchToProps = dispatch => {
  return {
    postMessage: message => dispatch(postMessage(message)),
    postFileMessage: message => dispatch(postFileMessage(message)),
    addNewMessageOnView: message => dispatch(addNewMessageOnView(message)), ///добавляет в список, чтобы сразу показать
    postRequestTypeChat: (message, requestId) =>
      dispatch(postRequestTypeChat(message, requestId)),
      postFile: file => dispatch(postFile(file))
  };
};
@connect(
  mapStateToProps,
  mapDispatchToProps
)
export default class ImagePickerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null
    };
  }

  _cancelButtonHandler = () => {
    //this.props.onTogglePicker();
    this.props.navigation.popToTop (); 
  };

  _pickImage = async () => {
    this.props.navigation.goBack(); 
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      quality: 0.5
      //aspect: [4, 3],
    });
    console.log(result);
    if (!result.cancelled) {
      //this.setState({ image: result.uri });
      // this.props.sendImageMessage(result);
      this._sendImageMessage(result);
    }
  };

  _launchCamera = async () => {
    this.props.navigation.goBack(); 
    await this._askPermissionsAsync();
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      quality: 0.5,
      exif: true
      //aspect: [4, 3],
    });
    console.log(result);
    //this.props.onTogglePicker();
    
    if (!result.cancelled) {
      //this.setState({ image: result.uri });
      //this.props.sendImageMessage(result);
      this._sendImageMessage(result);
    }
  };

  _askPermissionsAsync = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    // you would probably do something to verify that permissions
    // are actually granted, but I'm skipping that for brevity
  };

  _onSetValueHandler = item => {
    if (item.id == 1) {
      this._launchCamera();
    }
    if (item.id == 2) {
      this._pickImage();
    }
  };

  _sendImageMessage = file => {
    //сформировать с типом Image
    const { currentChat, currentUser } = this.props;
    const currentChatId = currentChat.item ? currentChat.item.id : "";
    const currentUserId = currentUser.item.id;

    let fileMessage = {
      type: 2768654243000, //картинка
      file: file,
      text: "file message",
      userId: currentUserId,
      chatId: currentChatId,
      tempFrontId: file.uri + new Date(),
      creationDate: new Date()
    };

    if (currentChat.isRequestChatExist) {
      //отослать на сервер маленьккую картинку
      //отослать на сервер большую картинку
      this.props.postFileMessage(fileMessage)
      

      //добавить  на вью
      this.props.addNewMessageOnView(fileMessage);
    } else {
      const requestId = currentChat.requestId;

      this.props.postRequestTypeChat(fileMessage, requestId);
    }

    //добавить сообщение в список с крутилкой
    //как сообщение дойдет до сервера убрать крутилку
  }

  render() {
    const { image } = this.state;
    const pickerItemsArr = _.values(photoSourceItems);
    const arrLength = pickerItemsArr.length;
    let pickerItemsList = pickerItemsArr.map((item, index) => {
      return (
        <PickerItem
          key={item.id}
          pickerItemText={item.text}
          onPressItem={() => {
            return this._onSetValueHandler(item);
          }}
          isLastElement={arrLength == index + 1}
        />
      );
    });

    return (
      <View style={styles.screenContainer }>        
        {/* <View style={{ flex: 1, backgroundColor: "#D3D3D3", opacity: 0.8 }} /> */}

        <View style={styles.menuContainer}>
          <View style={styles.horizontalBlockDivider} />

          <View style={styles.middleContainer}>
            {pickerItemsList[0]}
            <View
              style={{ width: "100%", height: 1, backgroundColor: "#D3D3D3" }}
            />
            {pickerItemsList[1]}
          </View>

          <View style={styles.horizontalBlockDivider} />

          <View style={styles.bottomContainer}>
            <TouchableOpacity
              style={{ width: "100%", alignItems: "center" }}
              onPress={this._cancelButtonHandler}
            >
              <View style={styles.bottomItemContainer}>
                <Text style={styles.cancelText}> Отмена </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screenContainer:{
    flex: 1,
    justifyContent: "flex-end",
    alignItems: 'center',
  },

  menuContainer: {
    height:'50%',
    width:'95%',
    justifyContent: "flex-end",
    //backgroundColor: 'blue'
  },
  /*************** */
  headContainer: {
    height: "10%",
    justifyContent: "space-evenly",

    backgroundColor: "white",
    borderRadius: 10
  },
  /*************** */
  middleContainer: {
    height: "55%",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",

    backgroundColor: "white",
    borderRadius: 10
  },
  // middleItemContainer:{
  //   width:'95%',
  //   alignItems:"center",

  //   //backgroundColor:"blue",
  // },
  /*************** */
  bottomContainer: {
    height: "30%",
    alignItems: "center",
    justifyContent: "space-evenly",

    backgroundColor: "white",
    borderRadius: 10
  },

  bottomItemContainer: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "white"
  },

  pickerItemText: {
    fontSize: 18,
    color: "blue",
    width: "90%",
    //backgroundColor:"gray",
    textAlign: "center"
  },

  cancelText: {
    fontSize: 19,
    fontWeight: "400",
    color: "red"
  },

  horizontalBlockDivider: {
    width: "100%",
    height: 3
  }
});
