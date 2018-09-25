import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    FlatList,
    Vibration 
 } from 'react-native';

 import { Colors, Images, Metrics } from '../theme';
 import BarCodeScannerComponent from './BarCodeScannerComponent.js';

export default class BarCodeScannerScreen extends Component {
  constructor(props) {
    console.log("constructor");
    super(props);
    this.state = {
      lastBarCodesAr: [
        {codeText: "50-50/001-50/001/010/2018-28772"},
        {codeText: "50-50/001-50/001/010/2018-28780"},
        {codeText: "50-50/001-50/001/010/2018-28901"}        
      ]
    };
  }

  scanBarCodeHandler=(barcode)=>{
    
    const newAr=this.state.lastBarCodesAr;
    //newAr.lastBarCodesAr.push({codeText : barcode.data});
    var isBarCodeExist=false;

    for (let index = 0; index < this.state.lastBarCodesAr.length; index++) {
      const element = this.state.lastBarCodesAr[index];
      console.log("element: "+element+"   barcode.data: "+ barcode.data)
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
      console.log(barcode.data);
    
      this.setState({
        lastBarCodesAr : [{codeText: barcode.data},... this.state.lastBarCodesAr]
      })
  }

  }

  render() {
    return (
      <View style={styles.screenContainer}>

        <View style={styles.barCodeScannerContainer}>
          <BarCodeScannerComponent onScanBarCode={this.scanBarCodeHandler} />
        </View>
        
        <View style={styles.barCodeListContainer}>
            <Text style={styles.barCodeItem}> Здесь будут появляються отсканированные коды</Text>
            
            <FlatList style={styles.list}            
            data={this.state.lastBarCodesAr}
            keyExtractor={(item, index) => item.codeText}
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

