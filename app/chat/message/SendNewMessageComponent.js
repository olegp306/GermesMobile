import React, { Component } from 'react';
import { MaterialIcons  } from '@expo/vector-icons';
import { View, Text, StyleSheet,TextInput , TouchableOpacity } from 'react-native';
import { Colors, Metrics } from '../../theme';

export default class SendNewMessageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
        messageText:null
    };
  }
 
  _handlerChangeText=(text)=>
  {
    //const value = e.target && e.target.value;
    this.setState({messageText:text});
  }

  _handlerSendMessage=()=>
  {
    //this.props.getChatUsersByChatId(testChatId)
    const messageText=this.state.messageText;
    
    console.log(this.state.messageText)

    this.props.sendNewMessage(messageText);
  }

  render() {
    //const messageText =this.props.message.text;
    return (
      <View>
        <View style={styles.inputFieldContainer}>
          <View style={styles.iconContainer}>
            <MaterialIcons  name='camera' size={30} color='#53565A' />
          </View>

          <View style={styles.verticalDivider} />
            <TextInput
                multiline={true}
                numberOfLines={3}
                style={styles.input}
                autoCapitalize='none'
                placeholder='Введите сообщение'
                autoCorrect={true}
                value={this.state.messageText}
                disabled={this.props.disabled}
                underlineColorAndroid='transparent'

                onChange={this._handlerChangeText}
                //onChange={(text) => this.setState({messageText: text}) }
            />
           
            <TouchableOpacity  onPress={this._handlerSendMessage}>
                <View style={styles.iconContainer}>
                    <MaterialIcons  name='send' size={30} color={Colors.actionBackgroundColor}  />
                </View>
            </TouchableOpacity>
            
        </View> 
      </View>
    );
  }
}
const styles = StyleSheet.create({
    inputFieldContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        width: '100%',
        height: 50,
        backgroundColor: 'white',
        borderRadius: 7,
        
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
        width: Metrics.screenWidth - 100,
        height: 50,
        marginLeft: 7,
        marginTop: 1,
        textAlignVertical: 'center',
        fontSize: 17,
        color: 'gray'
    },
    horizontalDivider: {
        width: '98%',
        height: 1,
        backgroundColor: "#f6f6f6",
        // justifyContent: 'space-between',
      },


})
