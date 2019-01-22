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

// import 'moment/min/moment-with-locales'

//import 'moment/min/moment-with-locales'
import moment from 'moment';
import { MaterialIcons  } from '@expo/vector-icons';
import RequestComponentBig from '../components/RequestComponentBig';
import MessagesComponent from '../chat/messages/MessagesComponent'
import SendNewMessageComponent from '../chat/message/SendNewMessageComponent'

import { getMessages, addNewMessage , removeMessages } from '../chat/messages/actions'
import { postMessage  } from '../chat/message/actions'

import { getUsers } from '../chat/users/actions'
import { getCurrentUser } from '../chat/currentUser/actions'
import { getChatsByRequestId, setCurrent, postRequestTypeChat } from '../chat/chat/actions'
import { getAllDataForChatByrequestId } from '../chat/currentChat/actions'

import _ from 'lodash' 



// если @connect наверху то mapStateToProps уже должен быть объявлен перед @connect
// приклеиваем данные из store
const mapStateToProps = store => {
  return {
      currentUser : store.currentUser.toJS(),
      messages : store.messages.toJS(), 
      users : store.users.toJS(), 

      message : store.message.toJS(),      
      chat : store.chat.toJS(), 
      currentChat : store.currentChat.toJS(), 

  }
}

const mapDispatchToProps = dispatch =>{
   return {
    getChatMessagesByChatId : (requestId) => dispatch (getMessages(requestId)),
    getChatUsersByChatId : (requestId)=> dispatch (getUsers(requestId)),
    getCurrentUser : () => dispatch ( getCurrentUser()),
    postMessage : (message) => dispatch (postMessage(message)),
    addNewMessage : (message) => dispatch (addNewMessage(message)),///добавляет в список, чтобы сразу показать
    
    getChatsByRequestId :(requestId)=> dispatch(getChatsByRequestId(requestId)),
    setCurrentChat: (chat) => dispatch(setCurrent(chat)),
    getAllDataForChatByrequestId : (requestId) => dispatch(getAllDataForChatByrequestId(requestId)),
    postRequestTypeChat: (message, requestId) => dispatch(postRequestTypeChat(message, requestId)),
    removeMessages: () => dispatch(removeMessages())
   }
} 

@connect( mapStateToProps, mapDispatchToProps )
export default class ChatScreen extends Component {
  
  constructor(props) {
    super(props);
  }

  componentDidMount () {
    const { navigation, currentChat, currentUser } = this.props;
    const requestId=navigation.getParam('requestId', '');
    
    if(currentChat.item && currentChat.item.requestGermesId!=requestId){
      this.props.removeMessages()
    }
    if( currentUser.item==null )
      this.props.getCurrentUser().then(()=>{
        this.props.getAllDataForChatByrequestId(requestId);
      })
    else{
      this.props.getAllDataForChatByrequestId(requestId);
    }
    
  }

  componentWillUnmount = () => {
    //todo удалить сообщения
  };
  
  
   _handlerPostMessage=(messageText)=>{
    const { currentChat , currentUser , navigation}=this.props;

    const currentChatId=(currentChat.item ? currentChat.item.id :"")      
    const currentUserId=currentUser.item.id

    let message={
      text: messageText,
      userId: currentUserId,
      chatId : currentChatId,
      tempFrontId : messageText + new Date(),
      creationDate :  new Date()
    }

    if (currentChat.isRequestChatExist)
    {
      //отослать на сервер
       this.props.postMessage(message);
       //добавить  на вью
       this.props.addNewMessage(message);
       
    }
    else
    {
      const requestId = navigation.getParam('requestId', '');     

      this.props.postRequestTypeChat(message, requestId);
    }
    
     //добавить сообщение в список с крутилкой
     //как сообщение дойдет до сервера убрать крутилку
      
  }

  _handleOnRefreshList=()=>{   
    const currentChatId=this.props.chat.currentChat.id
    this.props.getChatUsersByChatId(currentChatId);
    this.props.getChatMessagesByChatId(currentChatId);
  }  

  render() {
    const { navigation } = this.props;

    const receiptNumber = navigation.getParam('receiptNumber', '');
    const requestNumber = navigation.getParam('requestNumber', '');
    const address = navigation.getParam('address', '');    
    const customerName = navigation.getParam('customerName', '');
    const transactionParticipant = navigation.getParam('transactionParticipant', '');
    const notice = navigation.getParam('notice', '');
    
    const { currentUser, messages , users , currentChat}= this.props;
    const messagesAr=_.values(messages.items);
   
    const messagesSortAr = _.sortBy(messagesAr, ['creationDate']).reverse();
    
    
    return (
      
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        keyboardVerticalOffset={+20}>

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
          // (currentUser.isFetching || messages.isFetching || users.isFetching )
          (currentChat.isFetching)
          ?
          (
            <View style={styles.noDataLable}>
                <Text>Загрузка данных </Text>
                {/* <Text> подождите чуть-чуть </Text>               */}
            </View>         
          )
          :          
          (
            (currentChat.isRequestChatExist)
            ?
            <MessagesComponent 
              messagesSortAr={ messagesSortAr } 
              users={ users }
              currentUser={ currentUser } 
              onRefresh={ this._handleOnRefreshList }
              refreshing={messages.refreshing}          
            />
            :
            (
              <View style={styles.noDataLable}>
                  <Text> По зтой заявке еще нет чата</Text>
                  <Text> Отправьте первое сообщение и чат будет создан автоматически.  </Text>
                  <Text> участники чата будут добавлены  автоматически </Text>              
              </View>
            )            
          )
        }
        
            {/* <FlatList style={ styles.commentsContainer } 
              inverted
              onRefresh={ this._handleOnRefreshList }
              refreshing={ messages.refreshing }

              data={ messagesSortAr }
              keyExtractor={ (item, index) => item.id}
              renderItem={ ({item}) =>              
                <MessageComponent 
                  isMyMessage={( currentUser.item.id == item.userId ) ? true : false }
                  author={users.items[item.userId] ? users.items[item.userId].name : 'неизвестный отправитель' }                  
                  text= {item.text}
                  creationDate= {moment(item.creationDate).format('MMMM Do YYYY, hh:mm ')}                  
                />
              }
            /> */}
        <View style={styles.horizontalDivider} />

        <SendNewMessageComponent sendNewMessage={this._handlerPostMessage} />
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
    // commentsContainer:{
    //   // backgroundColor:'white',
    //   width: '90%',
    //   marginTop: 10,     
    // },

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

