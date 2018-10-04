import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet
 } from 'react-native';

 import { Colors, Images, Metrics } from '../theme';

export default class RequestComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


//   "2768498102000":{
//     "requestId": "2768498102000" ,
//     "requestNumber" : "48849" ,
//     "customerName" : "Каскад",
//     "transactionParticipant" : "ООО 'Бережки'",
//     "address" : "Подольский район, с/п Лаговское," ,
//     "docTypeNameName" : "акт приема-передачи" ,
//     "receiptNumber" : "50-50/001-50/001/010/2018-28772" ,    
//     "fromRegistrationPlanDate" : "20.09.2018" ,
//     "notice" : "Акт выкупа з/у  50:27:0000000:132554"
// },

  render() {
    return (
      <View style={styles.contentContainer}>
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
    contentContainer: {
        //height: 80,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        //backgroundColor:'#f6f6f6',
        borderColor: '#6DC9E7',
        borderWidth: 1,
        backgroundColor: 'white',
        borderRadius: 7,
        padding:0,
        //marginTop:1,
        marginBottom:2,

    },
    receiptNumber:{
        textAlign:'center',
        fontWeight:'500',
        fontSize: 20,
    },
    notice:{
        fontStyle:'italic'
    }
});

