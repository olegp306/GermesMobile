import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../theme/Colors'

export default class MessageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  

  render() {
    const  isMyMessage =this.props.isMyMessage;
    const  author = this.props.author;
    const  text = this.props.text;
    const  creationDate = this.props.creationDate;
  
    let isNewMessage=(!this.state.isNewMessage ? false: true);
    
    return (
      <View style={isMyMessage ? styles.rightMessageContainer : styles.leftMessageContainer }>
      {/* <View style={ styles.leftMessageContainer }> */}
        <View style={styles.authorContainer}>
          <Text style={styles.authorText}>{ author }</Text>
        </View>

        <Text style={styles.messageText}>{ text }</Text>

        <View style={styles.creationDateContainer}>
           <Text style={styles.creationDate}>{ creationDate }</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  leftMessageContainer:{
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.actionBackgroundColor,

    backgroundColor: 'white',
    alignItems:"flex-start",
    marginTop:4,
    marginRight:10
  },

  rightMessageContainer:{
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.actionBackgroundColor,
   
    backgroundColor: Colors.lightBackgroundColor,
    alignItems:"flex-end",
    marginTop:10,
    marginLeft:20
  },

  authorContainer:{
    width: '100%',
    alignItems: 'flex-start',
    //backgroundColor:"red"
  },

  authorText:{
    fontSize:10,
    //color: Colors.lightGray     
  },

  itemContainer:{

  },

  messageText:{
    fontSize: 18
  },

  creationDateContainer:{
    width:'100%',
    alignItems: 'flex-end',
  },

  creationDate:{
    fontSize: 8,
    //color: Colors.lightGray  
  }


})