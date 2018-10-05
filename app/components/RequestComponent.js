import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet ,
    CheckBox   
 } from 'react-native';
//  import { CheckBox } from 'react-native-elements';


 import { Colors, Images, Metrics } from '../theme';

export default class RequestComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.contentContainer}>
        <Text style={styles.receiptNumber}> {this.props.receiptNumber} </Text>
        <Text>  {this.props.requestNumber + " " + this.props.address}  </Text>
        <View style={styles.middleContainer}>
          <View style={weight= '70%' }>
            <Text>  {this.props.customerName} </Text>
            <Text>  {this.props.transactionParticipant} </Text>        
          </View>
          <View style={weight= '30%' }>
            <CheckBox
              title='сканирована'
              onPress={this.props.changeRemember}
              containerStyle={styles.checkboxContainer}
              textStyle={styles.checkboxText}
              checkedColor='black'
              checked={this.props.remember}
            />
          </View>
        </View>

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
    },

    middleContainer:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'stretch'
    }
});

