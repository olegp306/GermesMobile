import React, { Component } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { View, StyleSheet, Modal } from "react-native";
import ImagePickerComponent from "../../../camera/ImagePickerComponent";

export default class SendNewMessageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      modalVisible: false,
    };
  }


  showModal = () => {   
    this.setState({modalVisible: true});
    
  };

  closeModal=()=>
  {
    this.setState({modalVisible: false});
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
              onPress={this.showModal}
            />

            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
              }}
            >
              <ImagePickerComponent               
                closePicker={this.closeModal}               
              />
            </Modal>
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

});
