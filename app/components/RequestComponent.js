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

        {/* <Text style={styles.address}>  {this.props.address} </Text> */}
        <Text style={styles.notice}>  {this.props.notice} </Text>
        
      </View>
    );
  }
}
const styles = StyleSheet.create({
    // screenContainer: {
    //     flexDirection: 'column',
    //     justifyContent: 'flex-start',
    //     alignItems: 'center',
    //     width: '100%',
    //     height: '100%',
    //     backgroundColor: Colors.backgroundColor
    // },
    // logoContainer: {
    //     width: '100%',
    //     height: '50%',
    //     justifyContent: 'center',
    //     alignItems: 'center'
    // },
    // logo: {
    //     width: 250
    // },

    contentContainer: {
        //height: 80,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        //backgroundColor:'#f6f6f6',
        borderWidth: 1,
        backgroundColor: 'white',
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

