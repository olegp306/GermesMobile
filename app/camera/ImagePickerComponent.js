import React, { Component } from "react";
import { connect } from "react-redux";
import { postRequestTypeChat } from "../chat/chat/actions";
import { postMessage, postFileMessage } from "../chat/message/actions";
import { addNewMessage as addNewMessageOnView } from "../chat/messages/actions";
import { postFile } from "../redux/germes/file/actions";
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

  cancelButtonHandler = () => {
    this.props.closePicker();
  };

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      quality: 0.2
      //aspect: [4, 3],
    });
    if (!result.cancelled) {
      this.props.closePicker();
      this.sendImageMessage(result);
      
    }
  };

  launchCamera = async () => {
    await this.askPermissionsAsync();
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      quality: 0.2,
      exif: true
      //aspect: [4, 3],
    });

    if (!result.cancelled) {
      this.props.closePicker();
      this.sendImageMessage(result);
      
    }
  };

  askPermissionsAsync = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    // you would probably do something to verify that permissions
    // are actually granted, but I'm skipping that for brevity
  };

  sendImageMessage = file => {
    //сформировать с типом Image
    const { currentChat, currentUser } = this.props;
    const currentChatId = currentChat.item ? currentChat.item.id : "";
    const currentUserId = currentUser.item.id;

    let fileMessage = {
      type: 2768909676000, //картинка
      file: file,
      fileUrl: file.uri,
      text: "добавлено изображение",
      userId: currentUserId,
      chatId: currentChatId,
      tempFrontId: file.uri + new Date(),
      creationDate: new Date()
    };

    if (currentChat.isRequestChatExist) {
      //отослать на сервер маленьккую картинку
      //отослать на сервер большую картинку
      this.props.postFileMessage(fileMessage);

      //добавить  на вью
      this.props.addNewMessageOnView(fileMessage);
    } else {
      const requestId = currentChat.requestId;

      this.props.postRequestTypeChat(fileMessage, requestId);
    }

    //добавить сообщение в список с крутилкой
    //как сообщение дойдет до сервера убрать крутилку
  };

  render() {
    return (
      <View style={styles.screenContainer}>
        <View style={styles.menuContainer}>
          <View style={styles.middleContainer}>
            <View style={styles.pickerItemText}>
              <PickerItem
                key={photoSourceItems[1].id}
                pickerItemText={photoSourceItems[1].text}
                onPressItem={this.launchCamera}
              />
            </View>
            <View
              style={{ width: "100%", height: 1, backgroundColor: "#D3D3D3" }}
            />

            <View style={styles.pickerItemText}>
              <PickerItem
                key={photoSourceItems[2].id}
                pickerItemText={photoSourceItems[2].text}
                onPressItem={this.pickImage}
              />
            </View>
          </View>

          <View style={styles.horizontalBlockDivider} />

          <View style={styles.bottomContainer}>
            <TouchableOpacity
              style={{ width: "100%", alignItems: "center" }}
              onPress={this.cancelButtonHandler}
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
  screenContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(52, 52, 52, 0.8)"
    //transparent: "80%"
  },

  menuContainer: {
    height: "45%",
    width: "90%",
    justifyContent: "flex-end",
    margin: 20
  },

  headContainer: {
    height: "10%",
    justifyContent: "space-evenly",

    backgroundColor: "white",
    borderRadius: 10
  },

  middleContainer: {
    height: "55%",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",

    backgroundColor: "white",
    borderRadius: 10
  },

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
