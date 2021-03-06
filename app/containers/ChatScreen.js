import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    FlatList,
    TextInput,
    KeyboardAvoidingView,
    ActivityIndicator
 } from 'react-native';
import { connect } from 'react-redux'

import { Colors, Metrics } from '../theme';

// import 'moment/min/moment-with-locales'

//import 'moment/min/moment-with-locales'
import moment from 'moment';
import { MaterialIcons  } from '@expo/vector-icons';
import RequestComponentBig from '../components/RequestComponentBig';
import MessagesComponent from '../chat/messages/MessagesComponent'
//import SendNewMessageComponent from '../chat/message/sendMessage/SendImageMessageContainer'
import SendMessageContainer from '../chat/message/sendMessage/SendMessageContainer'



import { getMessages, addNewMessage , removeMessages } from '../chat/messages/actions'
import { postMessage  } from '../chat/message/actions'

import { getUsers } from '../chat/users/actions'
import { getCurrentUser } from '../chat/currentUser/actions'
import { getChatsByRequestId, setCurrent, postRequestTypeChat } from '../chat/chat/actions'
import { getAllDataForChatByrequestId, setCurrentRequestId} from '../chat/currentChat/actions'

import _ from 'lodash' 


// типы чатов
// tblTipy_chatov2768027315000

// 	чат
// 	2768777886000

// 	замечание
// 	2768777887000

// Тип сообщения чатов
// tblTip_soobshhenija_chatov2768777837000

// 	картинка
// 	2768777880000
	
// 	текст
// 	2768777882000
	
// 	цитата
// 	2768777884000


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
    setCurrentRequestId : (requestId)=> dispatch( setCurrentRequestId(requestId)),
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
    this.props.setCurrentRequestId (requestId);
    
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
  
  _handleOnRefreshList=()=>{   
    const currentChatId=this.props.chat.currentChat.id
    this.props.getChatUsersByChatId(currentChatId);
    this.props.getChatMessagesByChatId(currentChatId);
  }
  
  _

  render() {
    const { navigation } = this.props;

    const requestId = navigation.getParam("requestId", "");
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
          (currentChat.isFetching)
          ?
          ( 
            <View style={styles.noDataLable}>
                <Text>Загрузка данных </Text>
                <ActivityIndicator size='large' />
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

        <View style={styles.horizontalDivider} />       
        
        <SendMessageContainer  />
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

