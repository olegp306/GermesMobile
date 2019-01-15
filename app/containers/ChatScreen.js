import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    FlatList,
    TextInput,
    KeyboardAvoidingView
 } from 'react-native';
import { connect } from 'react-redux'

import { Colors, Metrics } from '../theme';
import { MaterialIcons  } from '@expo/vector-icons';
import RequestComponentBig from '../components/RequestComponentBig';
import MessageComponent from '../chat/message/MessageComponent'
import _ from 'lodash' 

// если @connect наверху то mapStateToProps уже должен быть объявлен перед @connect
// приклеиваем данные из store
const mapStateToProps = store => {
  return {
      // filterDate: store.filter.get("filterDate"),
      // filterReceptionId: store.filter.get("filterReceptionId"),        
      // requests: store.requests.toJS(),
      // selectedItems: store.selectedItems.toJS(),
      // barcodes: store.barcodes.toJS()
      messages : store.messages.toJS(),
      requests : store.requests.toJS()
  }
}

const mapDispatchToProps = dispatch =>{
   return {
      //  setFilterDateAction : date => dispatch (setFilterDate(date)),
      //  setReceptionIdAction : receptionId => dispatch (setReception(receptionId)),
      //  fetchRequestsAction: ( filterDate, filterReceptionId ) => dispatch(fetchRequests( { filterDate, filterReceptionId } )),

      //  selectItemAction : requestId=>dispatch(selectItem(requestId)),
      //  unSelectItemAction : requestId=>dispatch(unSelectItem(requestId)),
      //  clearSelectedItemAction : ()=>dispatch(clearSelectedItems()),

      //  addBarcodeAction : barcode=> dispatch (addBarcode(barcode)),
      //  clearBarcodesAction : ()=> dispatch (clearBarcodes()),
      //  startRequestsStatusChangeAction: ()=> dispatch(startRequestsStatusChange())
      //getMessages : () => dispatch (getMessages)
   }
} 

@connect( mapStateToProps, mapDispatchToProps )
export default class ChatScreen extends Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    const { navigation } = this.props;

    const receiptNumber = navigation.getParam('receiptNumber', '');
    const requestNumber = navigation.getParam('requestNumber', '');
    const address = navigation.getParam('address', '');    
    const customerName = navigation.getParam('customerName', '');
    const transactionParticipant = navigation.getParam('transactionParticipant', '');
    const notice = navigation.getParam('notice', '');


    //const messages=this.props.messages.items;
    
    const messagesAr=_.values(this.props.messages.items);
    return (
      
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        keyboardVerticalOffset={+80}>

      <View style={styles.screenContainer}>

        <View style={styles.requestContainer}>
          <RequestComponentBig
            receiptNumber={receiptNumber}
            requestNumber={requestNumber}
            address={address}
            customerName={customerName}
            transactionParticipant={transactionParticipant}
            notice={notice}        
          />
        </View>

        <View style={styles.horizontalDivider} />     

        <FlatList style={styles.commentsContainer} 
          data={ messagesAr }
          keyExtractor={(item, index) => item.id}
          renderItem={({item}) =>
            <MessageComponent 
              item={item}
            />
            
          }
        />
        <View style={styles.inputFieldContainer}>
          <View style={styles.iconContainer}>
            <MaterialIcons  name='camera' size={30} color='#53565A' />
          </View>

          <View style={styles.verticalDivider} />
            <TextInput
              style={styles.input}
              autoCapitalize='none'
              placeholder='Введите сообщение'
              autoCorrect={false}
              value={this.props.password}
              disabled={this.props.disabled}
              underlineColorAndroid='transparent'
            />
          </View>          
       </View>
      </KeyboardAvoidingView>
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
      backgroundColor: 'white',
     
    },
    
    
    requestContainer: {
        width: '98%',
        height: '20%',
        justifyContent: 'center',
        alignItems: 'center',
        
        
    },

    horizontalDivider: {
      width: '100%',
      height: 1,
      backgroundColor: "#6E6E6E",
      // justifyContent: 'space-between',
    },
    commentsContainer:{
      // backgroundColor:'white',
      width: '90%',
      marginTop: 10,     
    },

    leftCommentContainer:{
      borderWidth: 1,
      backgroundColor: 'white',
      borderRadius: 7,
      alignItems:"flex-start",
      marginTop:10,
      marginRight:20
    },

    
    rightCommentContainer:{
      borderWidth: 1,
      backgroundColor: '#88c9e8',
      borderRadius: 7,
      alignItems:"flex-end",
      marginTop:10,
      marginLeft:20
    },

    commentsText:{
      fontSize: 18
    },

    inputFieldContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      width: '100%',
      height: 50,
      backgroundColor: 'white',
      borderRadius: 7,
      marginTop: 10
    },
    iconContainer: {
      width: 45,
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center'
    },
    verticalDivider: {
        width: 1,
        height: '100%',
        backgroundColor: '#f6f6f6'
    },
    input: {
        width: Metrics.screenWidth - 80,
        height: 50,
        marginLeft: 7,
        marginTop: 1,
        textAlignVertical: 'center',
        fontSize: 17,
        color: 'gray'
    },

    contentContainer: {
        //height: 80,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        //backgroundColor:'#f6f6f6',
      
    },
    receiptNumber:{
        textAlign:'center',
        fontWeight:'500',
        fontSize: 20,
    },
    notice:{
        fontStyle:'italic'
    },
});

