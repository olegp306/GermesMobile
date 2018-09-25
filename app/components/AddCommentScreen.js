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
import { MaterialIcons } from '@expo/vector-icons';
import RequestComponentBig from './RequestComponentBig';

export default class AddCommentScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      request:
      {
        "requestId": "2768498269000" ,
        "requestNumber" : "48868" ,
        "customerName" : "Каскад",
        "transactionParticipant" : "ООО 'Бережки'",
        "address" : "Подольский район, с/п Лаговское," ,
        "docTypeNameName" : "акт приема-передачи" ,
        "receiptNumber" : "50-50/001-50/001/010/2018-28901" ,
        "fromRegistrationPlanDate" : "20.09.2018" ,
        "notice" : "Акт выкупа зем. участка  50:27:0000000:132596"
      },
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
    return (
      <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
      <View style={styles.screenContainer}>

        <View style={styles.requestContainer}>
          <RequestComponentBig
          receiptNumber={this.state.request.receiptNumber}
          requestNumber={this.state.request.requestNumber}
          address={this.state.request.address}
          customerName={this.state.request.customerName}
          transactionParticipant={this.state.request.transactionParticipant}
          notice={this.state.request.notice}
          />
        </View>

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
                                <MaterialIcons name='camera' size={30} color='#53565A' />
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
        height: '35%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:10
    },
    
    commentsContainer:{
      // backgroundColor:'white',
      width: '90%',
      marginTop: 10,     
    },

    leftCommentContainer:{
      borderWidth: 1,
      //backgroundColor: 'white',
      borderRadius: 7,
      alignItems:"flex-start",
      marginTop:10,
      marginRight:20
    },

    
    rightCommentContainer:{
      borderWidth: 1,
      backgroundColor: '#399dcc',
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

