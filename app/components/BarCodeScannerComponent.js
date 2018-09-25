import React, { Component } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';

import { Constants, BarCodeScanner, Permissions } from 'expo';

export default class BarCodeScannerComponent extends Component {
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
    Alert.alert(
      'Отсканирован штрих код',
      JSON.stringify(data)
    );
  };

  render() {
    return (
      <View>
        {this.state.hasCameraPermission === null ?
          // <Text>Requesting for camera permission</Text> :
          <Text>Запрашиваем разрешение на использование камеры</Text> :
          this.state.hasCameraPermission === false ?
            // <Text>Camera permission is not granted</Text> :
            <Text>Разоешени ек доступу к камере не предоставлены</Text> :
            <BarCodeScanner
              torchMode="on"
              onBarCodeRead={this._handleBarCodeRead}
              style={{ height: 300, width: 350 }}
            />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});
