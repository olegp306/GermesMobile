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
 import { addBarcode, clearBarcodes } from '../store/germes/barcodes/actions.js'
 import { selectItem } from '../store/germes/selectedItems/actions.js'

 import TotalRequestsContainer from '../containers/TotalRequestsContainer';
 import BarCodeScannerComponent from '../components/BarCodeScannerComponent';

 const mapStateToProps = store => {    
  
  return {      
    requests: store.requests.toJS(),
    selectedItems: store.selectedItems.toJS(),
    barcodes: store.barcodes.toJS()
  }
}

const mapDispatchToProps = dispatch =>{
   return {
       addBarcodeAction : barcode=> dispatch (addBarcode(barcode.data)),
       clearBarcodesAction : ()=> dispatch (clearBarcodes()),
       selectItemAction: (requestId)=> dispatch(selectItem(requestId))
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
    this._selectRequestByBarcode(barcode);
  }

  _getRequestIdByBarcode = (barcode)=>
  {
    const{requests,barcodes,selectedItems}=this.props;

    let requestId;

    for(key in requests.items)
    {
      let request=requests.items[key];
      if(request.receiptNumber==barcode || request.incomingPacketId==barcode)
      {
        requestId = request.requestId;
        break;
      }
    }
    return requestId;
  }

  _selectRequestByBarcode=(barcode)=>{
    const requestId=this._getRequestIdByBarcode(barcode.data);
    if (requestId)
    {
      this.props.selectItemAction(requestId);      
    }

  }

  render() { 
    //const { isFetching ,items }=this.props.requests;
    const {items} = this.props.barcodes;  
    return (
      <View style={styles.screenContainer}>

        <View style={styles.barCodeScannerContainer}>
          <BarCodeScannerComponent onScanBarCode={this._handlerScanBarcode} />
        </View>
        
        <View style={styles.barcodeItemsContainer}>
            <Text style={styles.barCodeItem}> Здесь будут появляються отсканированные коды</Text>            
            <FlatList               
              data={_values(items)}            
              keyExtractor={(item, index) => item.codeText}
              renderItem={({item}) =>            
                <View style={styles.barcodeItemContainer}>
                  <Text>{item.codeText}</Text>
                </View>
            }            
          />   
         </View>
         <TotalRequestsContainer />

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

    barcodeItemsContainer:{
      height: '42%',
      width: '100%',
      flexDirection: 'column',
      // justifyContent: 'center',
      // alignItems: 'center',
      //backgroundColor:Colors.navigatorBackgroudColor

    },

    barcodeItemContainer:{
      width: '100 %', 
      flexDirection: 'row',
      justifyContent: 'flex-start',
      //justifyContent: 'flex-start',
      //alignItems: 'stretch',
      margin: 4,
      backgroundColor: '#EEEEEE',
      //opacity:0.5
    }

    
});

