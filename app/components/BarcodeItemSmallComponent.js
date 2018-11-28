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
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: 4,
    backgroundColor: '#EEEEEE',  
  },

  header:{
    flexDirection: 'row',
  }

})