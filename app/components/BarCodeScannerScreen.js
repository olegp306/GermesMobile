import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    FlatList,
    Vibration 
 } from 'react-native';

 import testData from '../middleware/TestData.json';

 import _values from 'lodash/values';

 import { Colors, Images, Metrics } from '../theme';
 import BarCodeScannerComponent from './BarCodeScannerComponent.js';

export default class BarCodeScannerScreen extends Component {
  constructor(props) {
    console.log("constructor");
    super(props);
    testData.barcodes
    this.state = {
      barcodes: testData.barcodes
    };
  }

  scanBarCodeHandler=(barcode)=>{
    var isBarCodeExist=false;

    for (let id in this.state.barcodes){
      let element=this.state.barcodes[id];
      if(element.codeText==barcode.data)
      {
        isBarCodeExist=true;
        break;
      }
    }

    if(isBarCodeExist)
    {
      Vibration.vibrate(1000);
    }
    else
    {
      Vibration.vibrate(200);    
      //console.log(barcode.data);
      const newBarcode= {
        "id" : "45",
        "codeText":barcode.data,
        "scanDateTime":new Date(),
        "isSelected": true
        };
    
      this.setState({
        barcodes : {newBarcode ,... this.state.barcodes}
      })
  }

  }

  render() {
    console.log(_values(this.state.barcodes));
    return (
      <View style={styles.screenContainer}>

        <View style={styles.barCodeScannerContainer}>
          <BarCodeScannerComponent onScanBarCode={this.scanBarCodeHandler} />
        </View>
        
        <View style={styles.barCodeListContainer}>
            <Text style={styles.barCodeItem}> Здесь будут появляються отсканированные коды</Text>
            
            <FlatList 
            style={styles.list}            
            data={_values(this.state.barcodes)}            
            keyExtractor={(item, index) => item.id}
            renderItem={({item}) =>
            
            <View style={styles.barCodeTextConteiner}>
              <Text style={styles.barCodeText}>{item.codeText}</Text>
            </View>
            }
            
          />
          
                
         </View>

       </View>
    );
  }
}
const styles = StyleSheet.create({
    screenContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: Colors.backgroundColor
    },

    barCodeScannerContainer: {
        width: '100%',
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    barCodeListContainer: {
      width: '100%',
      height: '50%',
      justifyContent: 'center',
      alignItems: 'center'
  },   

    barCodeTextConteiner:{
      backgroundColor:'white',
      width: '100%',
      marginTop: 10
    },

    barCodeText:{
        textAlign:'center',
        fontWeight:'500',
        fontSize: 18,
        backgroundColor:'white',

    },
    notice:{
        fontStyle:'italic'
    }    
});

