import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class MessageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  

  render() {
    const { isMyMessage ,author, text }=this.props.item;
    //this.props
    // let messageText=this.state.messageInfo;
    // let userInfo=this.state.userInfo;
    // let isMyMessage=this.state.isMyMessage;
    let isNewMessage=(!this.state.isNewMessage ? false: true);
    
    return (
      //<View style={isMyMessage ? styles.rightMessageContainer : styles.leftMessageContainer }>
      <View style={ styles.leftMessageContainer }>
        <Text style={styles.authorText}>{ author }</Text>
        <Text style={styles.messageText}>{ text }</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  leftMessageContainer:{
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 7,
    alignItems:"flex-start",
    marginTop:10,
    marginRight:20
  },
  rightMessageContainer:{
    borderWidth: 1,
    backgroundColor: '#88c9e8',
    borderRadius: 7,
    alignItems:"flex-end",
    marginTop:10,
    marginLeft:20
  },

  authorContainer:{
  },

  authorText:{
    fontSize:10
  },

  itemContainer:{

  },

  messageText:{
    fontSize: 18
  }


})