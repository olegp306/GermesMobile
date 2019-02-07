import React, { Component } from 'react';
import { MaterialIcons  } from '@expo/vector-icons';
import { View, Text, StyleSheet,TextInput , TouchableOpacity } from 'react-native';
import { Colors, Metrics } from '../../theme';

export default class SendNewMessageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
        text:""
    };
  }


  _handlerSendMessage=()=>
  {
    const messageText=this.state.text;
    this.props.sendNewMessage(messageText);
    this.setState({text: ""});
  }

  render() {
    //const messageText =this.props.message.text;
    const isSendButtonAllow=( this.state.text.length>0 ? true : false ) 
    return (
      <View>
        <View style={styles.inputFieldContainer}>
          <View style={styles.iconContainer}>
            <MaterialIcons  name='camera' size={30} color='#53565A' onPress={this.props.onCameraClick} />
          </View>

          <View style={styles.verticalDivider} />
            <TextInput
                multiline={true}
                numberOfLines={3}
                style={styles.input}
                autoCapitalize='none'
                placeholder='Введите сообщение'
                autoCorrect={true}

                value={this.state.text}

                disabled={this.props.disabled}
                underlineColorAndroid='transparent'

                //onChange={(text)=>this._handlerChangeText(text)}
                onChangeText={(text) => this.setState({text: text})}
            />
           
            <TouchableOpacity  onPress={this._handlerSendMessage} disabled={!isSendButtonAllow}>
                <View style={styles.iconContainer}>
                    <MaterialIcons  name='send' size={40} color={isSendButtonAllow ? Colors.actionBackgroundColor : Colors.lightGray}  />
                </View>
            </TouchableOpacity>
           
            
        </View> 
        {/* <Text>{this.state.text}</Text> */}
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
