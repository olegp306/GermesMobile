import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    FlatList
 } from 'react-native';

 import { Colors, Images, Metrics } from '../theme';

export default class RequestComponentBig extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.requestContainer}>
        <Text style={styles.receiptNumber}> {this.props.receiptNumber} </Text>
        <Text>  {this.props.requestNumber + " " + this.props.address}  </Text>
        <Text>  {this.props.customerName} </Text>
        <Text>  {this.props.transactionParticipant} </Text>
        <Text style={styles.notice}>  {this.props.notice} </Text>
      </View>       
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
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    // logo: {
    //     width: 250
    // },

    contentContainer: {
        //height: 80,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        
        borderWidth: 1,
        
        borderRadius: 7

    },
    receiptNumber:{
        textAlign:'center',
        fontWeight:'500',
        fontSize: 20,
    },
    notice:{
        fontStyle:'italic'
    },

    
});

