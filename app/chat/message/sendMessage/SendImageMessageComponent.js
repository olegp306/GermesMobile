import React, { Component } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from "react-native";
import { Colors, Metrics } from "../../../theme";
import { ImagePicker, Permissions } from "expo";

import ImagePickerComponent from "../../../camera/ImagePickerComponent";

const photoSourceItems = {
  1: {
    id: 1,
    text: "Камер2"
  },
  2: {
    id: 2,
    text: "Галерея"
  }
};

export default class SendNewMessageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      pickerDisaplayed: false
    };
  }

  togglePicker = () => {
    this.setState({
      pickerDisaplayed: !this.state.pickerDisaplayed
    });
  };

  pickImage = async () => {
    await this.askPermissionsAsync();
    this.togglePicker();
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      quality: 0.5
      //aspect: [4, 3],
    });
    

    if (!result.cancelled) {
      this.setState({ image: result.uri });
      this.props.sendImageMessage(result);
    }
  };

  launchCamera = async () => {
    await this.askPermissionsAsync();
    this.togglePicker();
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      quality: 0.5,
      exif: true
      //aspect: [4, 3],
    });
    
    if (!result.cancelled) {
      this.setState({ image: result.uri });
      this.props.sendImageMessage(result);
    }
  };

  askPermissionsAsync = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    // you would probably do something to verify that permissions
    // are actually granted, but I'm skipping that for brevity
  };

  onSetImageSource = item => {
    if (item == null) {
      return;
    }
    if (item.id == 1) {
      this.launchCamera();
    }
    if (item.id == 2) {
      this.pickImage();
    }
  };

  render() {
    return (
      <View>
        <View style={styles.inputFieldContainer}>
          <View style={styles.iconContainer}>
            <MaterialIcons
              name="camera"
              size={30}
              color="#53565A"
              onPress={this.togglePicker}
            />

            <ImagePickerComponent
              pickerTitle={"источник картинки"}
              photoSourceItems={photoSourceItems}
              onSetImageSource={this.onSetImageSource}
              pickerDisplayed={this.state.pickerDisaplayed}

              // onTogglePicker={this._togglePicker}
              // pickerDisaplayed={this.state.pickerDisaplayed}
              // sendImageMessage={this.props.sendImageMessage}
            />
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  inputFieldContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    width: "100%",
    height: 50,
    backgroundColor: "white",
    borderRadius: 7
  },

  iconContainer: {
    width: 45,
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  verticalDivider: {
    width: 1,
    height: "100%",
    backgroundColor: "#f6f6f6"
  },

  input: {
    width: Metrics.screenWidth - 100,
    height: 50,
    marginLeft: 7,
    marginTop: 1,
    textAlignVertical: "center",
    fontSize: 17,
    color: "gray"
  },
  horizontalDivider: {
    width: "98%",
    height: 1,
    backgroundColor: "#f6f6f6"
    // justifyContent: 'space-between',
  }
});
