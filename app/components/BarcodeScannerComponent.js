import React, { Component } from "react";
import { Text, View, StyleSheet, Alert } from "react-native";

import * as Permissions from "expo-permissions";

import { BarCodeScanner } from "expo-barcode-scanner";

export default class BarcodeScannerComponent extends Component {
  state = {
    hasCameraPermission: null,
    scanned: false
  };

  componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  };

  _handleBarCodeRead = data => {
    if (this.props.onScanBarCode) {
      this.props.onScanBarCode(data);
    }
  };

  handleBarCodeScanned = ({ type, data }) => {
    //this.setState({ scanned: true });
    //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    if (this.props.onScanBarCode) {
      this.props.onScanBarCode(data);
    }
  };

  render() {
    const { hasCameraPermission, scanned } = this.state;
    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned }
          style={{ height: 230, width: 350 }}
          //style={StyleSheet.absoluteFillObject}
        >
          <View style={styles.layerTop} />
          <View style={styles.layerCenter}>
            <View style={styles.layerLeft} />
            <View style={styles.focused} />
            <View style={styles.layerRight} />
          </View>
          <View style={styles.layerBottom} />
        </BarCodeScanner>
        
      </View>
    );
  }
}
const opacity = "rgba(0, 0, 0, .6)";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40,
    backgroundColor: "#ecf0f1"
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#34495e"
  },
  layerTop: {
    flex: 2,
    backgroundColor: opacity
  },
  layerCenter: {
    flex: 10,
    flexDirection: "row"
  },

  layerLeft: {
    flex: 1,
    backgroundColor: opacity
  },
  focused: {
    flex: 20
  },
  layerRight: {
    flex: 1,
    backgroundColor: opacity
  },
  layerBottom: {
    flex: 2,
    backgroundColor: opacity
  }
});
