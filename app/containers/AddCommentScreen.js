import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    FlatList,
    TextInput,
    KeyboardAvoidingView
 } from 'react-native';

import { Colors, Images, Metrics } from '../theme';
import { MaterialIcons  } from '@expo/vector-icons';
import RequestComponentBig from '../components/RequestComponentBig';

export default class AddCommentScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments:[
        {commentId:"1", text : "Сказали что нет подписи", author: "Косокуков А", isMyComment : true},
        {commentId:"2", text : "Неправильный номер паспорта", author: "Чехов А", isMyComment : false},
        {commentId:"3", text : "Нет оригинала доверенности", author: "Быконя А", isMyComment : false},
        {commentId:"4", text : "Сказали что нет подписи", author: "Косокуков А", isMyComment : true},
        {commentId:"5", text : "Неправильный номер паспорта", author: "Чехов А", isMyComment : false},
        {commentId:"6", text : "Нет оригинала доверенности", author: "Быконя А", isMyComment : false},
        {commentId:"7", text : "Сказали что нет подписи", author: "Косокуков А", isMyComment : true},
        {commentId:"8", text : "Неправильный номер паспорта", author: "Чехов А", isMyComment : false},
        {commentId:"9",text : "Нет оригинала доверенности", author: "Быконя А", isMyComment : false}
      ]
    };
  }

  render() {
    const { navigation } = this.props;

    const receiptNumber = navigation.getParam('receiptNumber', '');
    const requestNumber = navigation.getParam('requestNumber', '');
    const address = navigation.getParam('address', '');    
    const customerName = navigation.getParam('customerName', '');
    const transactionParticipant = navigation.getParam('transactionParticipant', '');
    const notice = navigation.getParam('notice', '');
    return (
      <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      keyboardVerticalOffset={+80}      
    >
      <View style={styles.screenContainer}>

        <View style={styles.requestContainer}>
          <RequestComponentBig
           receiptNumber={receiptNumber}
           requestNumber={requestNumber}
           address={address}
           customerName={customerName}
           transactionParticipant={transactionParticipant}
           notice={notice}
          // receiptNumber={this.props.receiptNumber}
          // requestNumber={this.props.requestNumber}
          // address={this.props.address}
          // customerName={this.props.customerName}
          // transactionParticipant={this.props.transactionParticipant}
          // notice={this.props.notice}
          />
        </View>
        <View style={styles.horizontalDivider} />

        {/* <View style={styles.commentsContainer}> */}
          {/* <Text> Здесь будут появляються новые комментарии</Text> */}
          
          <FlatList style={styles.commentsContainer}            
            data={this.state.comments}
            keyExtractor={(item, index) => item.commentId}
            renderItem={({item}) =>
            <View style={item.isMyComment ? styles.rightCommentContainer : styles.leftCommentContainer }>
              <Text style={fontSize=10}>{item.author}</Text>
              <Text style={styles.commentsText}>{item.text}</Text>
            </View>
            }
          />

          <View style={styles.inputFieldContainer}>
                            <View style={styles.iconContainer}>
                                <MaterialIcons  name='camera' size={30} color='#53565A' />
                            </View>

                            <View style={styles.verticalDivider} />

                            <TextInput
                                style={styles.input}
                                // onChange={e => this.props.changePassword(e.nativeEvent.text)}
                                autoCapitalize='none'
                                placeholder='Введите сообщение'
                                autoCorrect={false}
                                value={this.props.password}
                                disabled={this.props.disabled}
                                
                                underlineColorAndroid='transparent'
                            />
                        </View>
                   
                
         {/* </View> */}

       </View>
       </KeyboardAvoidingView>
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
    
    
    requestContainer: {
        width: '100%',
        height: '25%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:10
    },
    horizontalDivider: {
        height: 5
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

    // inputsContainer: {
    //     flexDirection: 'column',
    //     alignItems: 'center',
    //     width: Metrics.screenWidth
    // },
    // inputFieldContainer: {
    //     flexDirection: 'row',
    //     alignItems: 'flex-start',
    //     width: '94%',
    //     height: 50,
    //     backgroundColor: 'white',
    //     borderRadius: 7
    // },
    // iconContainer: {
    //     width: 45,
    //     height: '100%',
    //     justifyContent: 'center',
    //     alignItems: 'center'
    // },
    // verticalDivider: {
    //     width: 1,
    //     height: '100%',
    //     backgroundColor: '#f6f6f6'
    // },
    // input: {
    //     width: Metrics.screenWidth - 80,
    //     height: 50,
    //     marginLeft: 7,
    //     marginTop: 1,
    //     textAlignVertical: 'center',
    //     fontSize: 17,
    //     color: 'gray'
    // },
    // horizontalDivider: {
    //     height: 5
    // },
    // forgotContainer: {
    //     alignSelf: 'flex-end'
    // },
    // forgotText: {
    //     fontSize: 12,
    //     fontStyle: 'italic',
    //     textAlign: 'right',
    //     paddingRight: 15,
    //     color: 'gray'
    // },
    // enterContainer: {
    //     alignItems: 'center'        

    // },
    // enterButton: {
    //     justifyContent: 'center',
    //     backgroundColor: '#53565A',
    //     minWidth: 245,
    //     minHeight: 45,
    //     borderRadius: 30,
        
    
    // },
    // enterText: {
    //     fontSize: 24,
    //     textAlign: 'center',
    //     color: 'white',
    //     margin: 5
    // },
    // checkboxContainer: {
    //     backgroundColor: 'transparent',
    //     borderWidth: 0
    // },
    // checkboxText: {
    //     fontSize: 14,
    //     fontWeight: 'normal'
    // }
});

