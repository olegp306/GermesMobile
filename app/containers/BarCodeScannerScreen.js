import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    FlatList,
    Vibration 
 } from 'react-native';
 import { connect } from 'react-redux'

 //import _values from 'lodash/values';
 import _ from 'lodash'

 import { Colors, Images, Metrics } from '../theme';
 import { addBarcode, clearBarcodes } from '../store/germes/barcodes/actions.js'
 import { selectItem } from '../store/germes/selectedItems/actions.js'

 import TotalRequestsContainer from '../containers/TotalRequestsContainer';
 import BarcodeItemComponent from '../components/BarcodeItemSmallComponent';
 import BarcodeScannerComponent from '../components/BarcodeScannerComponent';

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
  
  _handlerScanBarcode= (barcode)=>{        
    if(this.props.barcodes.items.hasOwnProperty(barcode.data))
    { 
      //уже есть такой     
      Vibration.vibrate(200);       
    }    
    else
    {
      const requestId=this._getRequestIdByBarcode(barcode.data);
      if(requestId)
      {        
        this.props.addBarcodeAction(barcode.data);      
        this._selectRequestByBarcode(barcode.data);

        Vibration.vibrate(100);           
      }
      else
      {
        //Нет доходящей заявки в выборке        
        Vibration.vibrate(100); 
        //в выбранных заявках нет какого штрихкода      
      }
    }
   
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
    const {requests} = this.props; 
    return (
      <View style={styles.screenContainer}>

        <View style={styles.barCodeScannerContainer}>
          <BarcodeScannerComponent onScanBarCode={this._handlerScanBarcode} />
        </View>
        
        <View style={styles.barcodeItemsContainer}>
            <Text style={styles.barCodeItem}> Здесь будут появляються отсканированные коды</Text>            
            <FlatList               
              data={_.sortBy(items,'scanDateTime') }            
              keyExtractor={(item, index) => item.codeText}
              renderItem={({item}) =>{
                const requestId=this._getRequestIdByBarcode(item.codeText);
                return(
                <BarcodeItemComponent
                  barcodeText={item.codeText}
                  requestNumber={(requestId) ? requests.items[requestId].requestNumber: ''}
                  transactionParticipant={(requestId)? requests.items[requestId].transactionParticipant: ''}                  
                />)
              }               
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
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: Colors.backgroundColor
    },

    barCodeScannerContainer: {
        width: '100%',
        height: '40%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    barcodeItemsContainer:{
      height: '42%',
      width: '100%',
      flexDirection: 'column',
    },

    barcodeItemContainer:{
      width: '100 %', 
      flexDirection: 'row',
      justifyContent: 'flex-start',      
      margin: 4,
      backgroundColor: '#EEEEEE',      
    }

    
});

