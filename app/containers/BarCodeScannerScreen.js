import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    FlatList,
    Vibration 
 } from 'react-native';
 import { connect } from 'react-redux'

 import _values from 'lodash/values';

 import { Colors, Images, Metrics } from '../theme';
 import { addBarcode, clearBarcodes } from '../middleware/redux/actions/Barcodes'
 import { selectItemByBarcode } from '../middleware/redux/actions/SelectedItems'

 import BarCodeScannerComponent from '../components/BarCodeScannerComponent';

 const mapStateToProps = store => {    
  
  return {      
      barcodes: store.barcodes.toJS()
  }
}

const mapDispatchToProps = dispatch =>{
   return {
       addBarcodeAction : barcode=> dispatch (addBarcode(barcode.data)),
       clearBarcodesAction : ()=> dispatch (clearBarcodes()),
       selectItemAction: ()=> dispatch(selectItemByBarcode(barcode.data))
   }
} 



@connect( mapStateToProps, mapDispatchToProps )
export default class BarCodeScannerScreen extends Component {
  

  _handlerScanBarcode=(barcode)=>{    
    
    if(this.props.barcodes.items.hasOwnProperty(barcode.data))
    {
       Vibration.vibrate(1000);
    }
    else
    {
      Vibration.vibrate(200);      
    }
    this.props.addBarcodeAction(barcode);
  }



  // _handlerScanBarcode=(barcode)=>{ 
  //   this.props.addBarcodeAction(barcode);
  //   //this.props.selectItemAction(barcode);    
  // };
  

  render() { 
    //const { isFetching ,items }=this.props.requests;
    const {items} = this.props.barcodes;  
    return (
      <View style={styles.screenContainer}>

        <View style={styles.barCodeScannerContainer}>
          <BarCodeScannerComponent onScanBarCode={this._handlerScanBarcode} />
        </View>
        
        <View>
            <Text style={styles.barCodeItem}> Здесь будут появляються отсканированные коды</Text>            
            <FlatList               
              data={_values(items)}            
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

    

    barCodeTextConteiner:{
      width: '100 %', 
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'stretch',
      borderColor: '#252828',
      borderWidth: 2,
      backgroundColor: 'white',
      borderRadius: 7,
      padding:0,        
      marginBottom:2

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

