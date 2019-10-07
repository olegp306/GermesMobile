import React, { Component } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';

import { Constants, BarCodeScanner, Permissions } from 'expo';

export default class BarcodeScannerComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasCameraPermission:null
    };
  }

  
  componentDidMount() {
    this._requestCameraPermission();
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  _handleBarCodeRead = data => {
    if(this.props.onScanBarCode){
      this.props.onScanBarCode(data)
    }    
  };

  render() {
    return (
      <View>
        {this.state.hasCameraPermission === null ?          
          <Text>Запрашиваем разрешение на использование камеры</Text> :
          this.state.hasCameraPermission === false ?           
            <Text>Разрешение к доступу к камере не предоставлены</Text> :
            <BarCodeScanner
              onBarCodeRead={this._handleBarCodeRead}
              style={{ height: 230, width: 350 }}
            >
              <View style={styles.layerTop} />
              <View style={styles.layerCenter}>
                <View style={styles.layerLeft} />
                <View style={styles.focused} />
                <View style={styles.layerRight} />
              </View>
              <View style={styles.layerBottom} />
            </BarCodeScanner>
        }
      </View>
    );
  }
}
const opacity = 'rgba(0, 0, 0, .6)';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
  layerTop: {
    flex: 2,
    backgroundColor: opacity
  },
  layerCenter: {
    flex: 10,
    flexDirection: 'row'
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
  },
  
});
