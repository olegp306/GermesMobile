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
 import { addBarcode, clearBarcodes } from '../redux/germes/barcodes/actions.js'
 import { selectItem } from '../redux/germes/selectedItems/actions.js'

 import TotalRequestsContainer from './TotalRequestsContainer';
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
export default class BarcodeScannerScreen extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      lastBarcode: null,
      lastBarcodeNotice: "можно начинать сканировать",
      isOkScanResult: true,
      waitAfterSuccessScan : false
    };
  }

  // Ovveride базовый navigationOptions и дополнил кнопками в хедере
  static navigationOptions=({ navigation, navigationOptions })=>{
    const { params } = navigation.state;

    return {
      title: 'Сканирование штрихкодов',                 
    }
            
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

        this.setState({
          waitAfterSuccessScan:true
        })  
        setTimeout(this._wait,750);   
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
          setTimeout(this._wait,750);
          Vibration.vibrate(100);   
        }
        else
        {
          //Нет доходящей заявки в выборке
          lastBarcodeNotice='Нет заявок с таким баркодом. 1) Проверьте есть ли заявка в списке заявок. 2) Измените фильтр';
          
          setTimeout(this._wait,750);  
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
    alignItems: 'center',
    borderRadius: 15,
  },

  lastBarcodeOk:{
    width: '98 %',
    height: '10%', 
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: Colors.lightBackgroundColor,
    borderRadius: 5,
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
      textAlign: 'center',
      color:Colors.lightBlackTextColor
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

