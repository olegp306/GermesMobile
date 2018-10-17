import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet ,
    CheckBox,
    TouchableOpacity
 } from 'react-native';
//import { CheckBox } from 'react-native-elements';


 import { Colors, Images, Metrics } from '../theme';

export default class RequestComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  _handleShortPress=()=>{
    //console.log(this.props.onShortPressRequest);
    this.props.onShortPressRequest(this.props.requestId);
  }

  _handleLongPress=()=>{
    this.props.onLongPressRequest(this.props.requestId);
  }

  render() {
    //console.log("Request component is Selected requestId:"+ this.props.requestId + " isSelected:" +  this.props.isSelected)
    return (
      <TouchableOpacity 
        onPress={this._handleShortPress}
        onLongPress={this._handleLongPress}
                  >    
        <View style={ this.props.isSelected==true ? styles.selectedContentContainer: styles.unselectedContentContainer}>
        {/* <View style={  styles.selectedContentContainer}> */}
          <Text style={styles.receiptNumber}> {this.props.receiptNumber} </Text>
          <Text>  {this.props.requestNumber + " " + this.props.address}  </Text>
          <View style={styles.middleContainer}>
            
            <View style={styles.leftMiddle} >
              <Text>  {this.props.customerName} </Text>
              <Text>  {this.props.transactionParticipant} </Text>        
            </View>

            <View style={styles.rightMiddle} >
              <CheckBox              
                value={this.props.isSelected}
                onValueChange ={this._handleLongPress}
               />
            </View>
          </View>

          <Text style={styles.notice}>  {this.props.notice} </Text>  
          <View style={styles.bottomContainer}>
              
              <View style={styles.leftCheckbox}>
                <Text >Получена </Text>
                {/* <CheckBox              
                checked={this.props.isSelected}     
                title='Получена'           
                /> */}
              </View>
            {
              this.props.isSelected ?
              (
              <View style={styles.rightCheckbox}>
                
                <Text>Выбрано для смены статуса</Text>                
              </View>
               ) : null
            }
            </View>      
          {/* <Text style={styles.notice}>  isSelected:{this.props.isSelected==true ? "ЧЕКАНЫЙ": "ЧИТСЫЙ" } </Text>         */}
        </View>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
    
  unselectedContentContainer: {
        
        width: '100 %', 
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'stretch',        
        
        borderColor: '#252828',
        
        borderWidth: 1,
        backgroundColor: 'white',
        borderRadius: 7,
        padding:0,
        //marginTop:1,
        marginBottom:2,

    },
    selectedContentContainer: {
      //height: 80,
      
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'stretch',
      borderColor: '#252828',
      // borderColor: '#6DC9E7',
      // borderColor: '#07ef00',
      borderWidth: 3,
      backgroundColor: '#C9C8C7',
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

    leftCheckbox:{     
      flexDirection: 'row',
      alignItems: 'flex-end',
      borderColor: '#252828',
      // borderColor: '#6DC9E7',
      // borderColor: '#07ef00',
      borderWidth: 1,
      backgroundColor: '#4ef235',
    },

    rightCheckbox:{      
      flexDirection: 'column',      
    },
    
    

    notice:{
      fontStyle:'italic'
    },

    middleContainer:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'stretch'
    },

    leftMiddle:{
      width: '75%'
    },

    rightMiddle:{
      width: '25%',
      alignItems: 'center'
    },
    
    bottomContainer:{
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'stretch'
    }
});

