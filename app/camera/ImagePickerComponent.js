import React, { Component } from "react";
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

export default class ImagePickerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null
    };
  }

  _cancelButtonHandler = () => {
    this.props.onSetImageSource(null);   
  };

  render() {
    const { image } = this.state;
    const pickerItemsArr = _.values(this.props.photoSourceItems);
    const arrLength = pickerItemsArr.length;

    let pickerItemsList = pickerItemsArr.map((item, index) => {
      return (
        <View>
          <PickerItem
            key={item.id}
            pickerItemText={item.text}
            onPressItem={() => {
              return this.props.onSetImageSource(item);
            }}
            isLastElement={arrLength == index + 1}
          />
          {(arrLength == index + 1) ? null : (
            <View
              style={{ width: "100%", height: 1, backgroundColor: "#D3D3D3" }}
            />
          )}
        </View>
      );
    });

    return (
      <Modal
        visible={this.props.pickerDisplayed}
        animationType={"fade"}
        transparent={true} //Setting this to true will render the modal over a transparent background.
        onRequestClose={() => this._togglePicker()}
      >
        {/* фон */}
        <View style={{ flex: 1, backgroundColor: "#D3D3D3", opacity: 0.9 }} />

        <View style={styles.menuContainer}>
          <View style={styles.horizontalBlockDivider} />

          <View style={styles.middleContainer}>
            {pickerItemsList}
            {/* {pickerItemsList[0]}
            <View
              style={{ width: "100%", height: 1, backgroundColor: "#D3D3D3" }}
            />
            {pickerItemsList[1]} */}
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

        {/* {image &&   <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />} */}
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  menuContainer: {
    flex: 1,
    position: "absolute",
    justifyContent: "flex-end",

    top: "65%",
    bottom: "5%",
    left: "2%",
    right: "2%"
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
