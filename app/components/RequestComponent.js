import React, { Component } from 'react';
import { CheckBox } from 'react-native-elements';
import { 
    View,
    Text,
    StyleSheet ,    
    TouchableOpacity,
    ActivityIndicator
 } from 'react-native';
//import { CheckBox } from 'react-native-elements';
import Loader from '../components/Loader'
//import SmallLoader from "../components/SmallLoader"


 import { Colors, Images, Metrics } from '../theme';

export default class RequestComponent extends Component {
  
  _handleShortPress=()=>{
    //console.log(this.props.onShortPressRequest);
    this.props.onShortPressRequest(this.props);
  }

  _handleLongPress=()=>{
    this.props.onLongPressRequest(this.props.requestId);
  }
  
  _handleOnChangeRequestCheckBox=(requestId)=>{
    this.props.onChangeRequestCheckBox(this.props.requestId)
  }


  render() {    
    return (
      <TouchableOpacity 
        onPress={this._handleShortPress}
        onLongPress={this._handleLongPress}
                  >
        {/* <ActivityIndicator size='large' /> */}
        <View style={ this.props.isSelected==true ? styles.selectedContentContainer: styles.unselectedContentContainer}>
          <View style={ styles.receiptNumberContainer}>        
            <Text style={styles.receiptNumber}> {this.props.receiptNumber} </Text>
          </View>
          
          
          <View style={styles.middleContainer}>
            <View style={styles.leftMiddleContainer} >
              <Text>{this.props.requestNumber + " " + this.props.address}</Text>              
              <Text>{this.props.transactionParticipant}</Text>    
              { this.props.notice ? (<Text style={styles.notice}>  {this.props.notice} </Text>) : null }              
            </View>

            <View style={styles.rightMiddleContainer} >
              <CheckBox 
                  onPress={this._handleOnChangeRequestCheckBox}
                  containerStyle={styles.checkboxContainer}              
                  checkedColor='green'
                  checked={this.props.isSelected}                  
               />
            
            {this.props.isUpdating ? (<ActivityIndicator size='large' /> ) : null }
            </View>
          </View>

          
          

          <View style={styles.bottomStikersContainer}>
            <View style={styles.bottomContainer}>
              {
                this.props.isBarcodeExist ?
                (
                <View style={styles.leftCheckbox}>
                  <Text >Прочитан баркод </Text>                
                </View>
                ):null
              }            
              </View>
              
            </View>                  
        </View>
        <View style={styles.horizontalDivider}></View>
      
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
    
  unselectedContentContainer: {        
        width: '100 %', 
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        marginBottom:2,
        backgroundColor: 'white',
        //borderColor: '#252828',
        //borderWidth: 2,
        
        //borderRadius: 7,
        //paddingLeft:5,        
        
        
    },
    checkboxContainer: {
      //backgroundColor: 'blue',
      borderWidth: 0
  },
    selectedContentContainer: {
      width: '100 %', 
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'stretch',
     marginBottom:2,
     backgroundColor: '#EEEEEE',
     opacity:0.5
  },
    receiptNumberContainer:{
      //backgroundColor: Colors.baseBackgroundColor
    },
    receiptNumber:{      
      fontWeight:'500',
      fontSize: 17,
      marginLeft: 10,
    },

    leftCheckbox:{     
      flexDirection: 'row',
      alignItems: 'flex-end',
      borderRadius: 7,
      //borderColor: '#252828',
      // borderColor: '#6DC9E7',
      // borderColor: '#07ef00',
      //borderWidth: 1,
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
      alignItems: 'stretch',
      marginLeft: 10,
    },
    leftMiddleContainer:{
      width: '85%'
    },

    rightMiddleContainer:{
      width: '15%',
      alignItems: 'center'
    },
    
    bottomContainer:{
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'stretch'
    },

    bottomStikersContainer:    {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'stretch'
    },

    horizontalDivider: {
        width: '95%',
        height: 1,
        backgroundColor: "#6E6E6E",
        justifyContent: 'space-between',
    },
    checkbox:{
     
      // borderColor:Colors.actionItemColor,
      // color:Colors.actionItemColor
    }
});

