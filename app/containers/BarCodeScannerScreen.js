import React, { Component } from 'react';
import TimerMixin from 'react-timer-mixin'
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

//  var Sound = require('react-native-sound');
//  var whoosh = new Sound()

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
  constructor(props) {
    super(props);

    this.state = {
      lastBarcode: null,
      lastBarcodeNotice: "можно начинать сканировать",
      isOkScanResult: true,
      waitAfterSuccessScan : false
    };
  }
  _wait=()=>{this.setState({
    waitAfterSuccessScan:false
  })

  }

  _handlerScanBarcode= (barcode)=>{

    if(!this.state.waitAfterSuccessScan)
    {
      const lastBarcode=barcode.data;
      let lastBarcodeNotice=null;
      let isOkScanResult=false;

      if(this.props.barcodes.items.hasOwnProperty(barcode.data))
      { 
        lastBarcodeNotice="Такой бар код уже добавлен"
        Vibration.vibrate(200);       
      }    
      else
      {
        const requestId=this._getRequestIdByBarcode(barcode.data);
        if(requestId)
        {        
          this.props.addBarcodeAction(barcode);      
          this._selectRequestByBarcode(barcode);

          lastBarcodeNotice="баркод добавлен, заявка найдена";
          isOkScanResult=true;

          this.setState({
            waitAfterSuccessScan:true
          })

          Vibration.vibrate(100);   
          //Sound

          setTimeout(this._wait,500);
        }
        else
        {
          //Нет доходящей заявки в выборке
          lastBarcodeNotice='Нет заявок с таким баркодом. 1) Проверьте есть ли заявка в списке заявок. 2) Измените фильтр';
            
          Vibration.vibrate(100);        
          //в выбранных заявках нет какого штрихкода      
        }
      }
      this.setState({
        lastBarcode: lastBarcode,
        lastBarcodeNotice: lastBarcodeNotice,
        isOkScanResult: isOkScanResult     
      });
    
    
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
    const {items} = this.props.barcodes; 
    const {requests} = this.props; 
    return (
      <View style={styles.screenContainer}>

        <View style={styles.barCodeScannerContainer}>
          <BarcodeScannerComponent onScanBarCode={this._handlerScanBarcode} />
        </View>

         <View style={this.state.isOkScanResult ? (styles.lastBarcodeOk): (styles.lastBarcodeErr) }>
            <Text style={styles.lastBarcodeText}> {this.state.lastBarcode} </Text>
            <Text style={styles.lastBarcodeNoticeText}>  {this.state.lastBarcodeNotice}  </Text>
         </View>
        
        <View style={styles.barcodeItemsContainer}>
         
            <FlatList               
              data={_.sortBy(items,'scanDateTime').reverse() }            
              keyExtractor={(item, index) => item.codeText}
              renderItem={({item}) =>{
                const requestId=this._getRequestIdByBarcode(item.codeText);
                return(
                <BarcodeItemComponent
                  barcodeText={item.codeText}
                  requestNumber={(requestId) ? requests.items[requestId].requestNumber: ''}
                  incomingPacketId={(requestId) ? requests.items[requestId].incomingPacketId: ''}
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

  lastBarcodeOk:{
    width: '98 %',
    height: '10%', 
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: Colors.lightBackgroundColor
  },

  lastBarcodeErr:{
    width: '98 %',
    height: '10%',  
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: Colors.warningBackgroundColor
  },

  lastBarcodeText:{
      fontWeight:'500',
      fontSize: 17,
      marginLeft: 5,
      textAlign: 'center'
  },

  lastBarcodeNoticeText:{
    textAlign: 'center'
    //backgroundColor:Colors.warningBackgroundColor
  },

  barcodeItemsContainer:{
    height: '42%',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
    
});

