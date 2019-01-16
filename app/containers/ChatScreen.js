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

import moment from 'moment'
import 'moment/src/locale/ru'
import 'moment/src/locale/fr'
// import 'moment/min/moment-with-locales'

//import 'moment/min/moment-with-locales'
//import Moment from 'moment';
import { MaterialIcons  } from '@expo/vector-icons';
import RequestComponentBig from '../components/RequestComponentBig';
import MessageComponent from '../chat/message/MessageComponent'
import SendNewMessageComponent from '../chat/message/SendNewMessageComponent'

import { getMessages  } from '../chat/messages/actions'
import { postMessage  } from '../chat/message/actions'

import { getUsers } from '../chat/users/actions'
import { getCurrentUser } from '../chat/currentUser/actions'
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
      message : store.message.toJS(),
      users : store.users.toJS(),      
      currentUser : store.currentUser.toJS(),

  }
}

const mapDispatchToProps = dispatch =>{
   return {
    getChatMessagesByChatId : (requestId) => dispatch (getMessages(requestId)),
    getChatUsersByChatId : (requestId)=> dispatch (getUsers(requestId)),
    getCurrentUser : () => dispatch ( getCurrentUser()),
    addMessage : (message) => dispatch (postMessage(message))
   }
} 

@connect( mapStateToProps, mapDispatchToProps )
export default class ChatScreen extends Component {
  
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    const testChatId=2768203390000;

    this.props.getChatUsersByChatId(testChatId);
    this.props.getChatMessagesByChatId(testChatId);
    this.props.getCurrentUser();

  }
  
   _handlerAddMessage=(messageText)=>{
     let message={
       text: messageText,
       chatId : 2768203390000
     }
      this.props.addMessage(message);
  }
  

  render() {
    const { navigation } = this.props;

    const receiptNumber = navigation.getParam('receiptNumber', '');
    const requestNumber = navigation.getParam('requestNumber', '');
    const address = navigation.getParam('address', '');    
    const customerName = navigation.getParam('customerName', '');
    const transactionParticipant = navigation.getParam('transactionParticipant', '');
    const notice = navigation.getParam('notice', '');


    
    const { currentUser, messages , users }= this.props;
    const messagesAr=_.values(messages.items);
   
    const messagesSortAr = _.sortBy(messagesAr, ['creationDate']).reverse();
    
    
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
        { 
          (currentUser.isFetching ||messages.isFetching || users.isFetching)
          ?
          (
            <View style={styles.noDataLable}>
              <Text>Загрузка данных </Text>
              <Text> подождите чуть-чуть </Text>                
            </View>
          )
          :
          (
            <FlatList style={styles.commentsContainer} 
              inverted
              data={ messagesSortAr }
              keyExtractor={(item, index) => item.id}
              renderItem={({item}) =>
              // const  isMyMessage =this.props.isMyMessage;
              // const  author = this.props.author;
              // const  text = this.props.text;
               
                <MessageComponent 
                  isMyMessage={( currentUser.item.id == item.userId ) ? true: false }
                  author={users.items[item.userId] ? users.items[item.userId].name : 'неизвестный отправитель' }
                  //author={item.userId}
                  text= {item.text}
                  //creationDate= {Moment(item.creationDate).format('MMMM Do YYYY, hh:mm ')}
                  creationDate= {moment(item.creationDate).format('MMMM Do YYYY, hh:mm ')}
                  
                />
                
              }
            />
          )
        }

        
        <View style={styles.horizontalDivider} />

        <SendNewMessageComponent
          sendNewMessage={this._handlerAddMessage}
          
          //message={newMessage}
        />

         
                 
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
      width: '98%',
      height: 1,
      backgroundColor: "#f6f6f6",
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
    noDataLable:{
      flexDirection: 'column', 
      justifyContent: 'center',
      alignItems: 'center',
  },
});

