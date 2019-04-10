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
import ImagePickerComponent from "../../../camera/ImagePickerComponent";

export default class SendNewMessageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      pickerDisaplayed: false
    };
  }
  _togglePicker = () => {
    // this.setState({
    //   pickerDisaplayed: !this.state.pickerDisaplayed
    // });
  };
  onPressIcon=()=>{
    //this.props.navigation.navigate('ImagePicker')
    this.props.onPressIcon();
  }

  render() {
    return (
      <View>
        <View style={styles.inputFieldContainer}>
          <View style={styles.iconContainer}>            
            <MaterialIcons
              name="camera"
              size={30}
              color="#53565A"              
              onPress={this.onPressIcon}
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
