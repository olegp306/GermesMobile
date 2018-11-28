import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class BarcodeItemSmallComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.barcodeContainer}>
        <View style={styles.header}>
          <Text style={styles.barcodeText}> {this.props.barcodeText} </Text>
          <Text style={styles.requestNumber}> {this.props.requestNumber} </Text>
        </View>
        <Text style={styles.transactionParticipant}> {this.props.transactionParticipant} </Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  barcodeContainer:{
    width: '100 %', 
    flexDirection: 'column',
    justifyContent: 'flex-start',
    margin: 4,
    backgroundColor: '#EEEEEE',  
  },

  barcodeText:{
    fontWeight:'500',
    fontSize: 17,      
  },

  
  requestNumber:{
    fontWeight:'500',
    fontSize: 17,      
  },


  header:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  }

})