import React, { Component } from 'react';
import { CheckBox } from 'react-native-elements';
import { 
    View,
    Text,
    StyleSheet ,    
    TouchableOpacity
 } from 'react-native';
//import { CheckBox } from 'react-native-elements';


 import { Colors, Images, Metrics } from '../theme';

export default class RequestComponent extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //   };
  // }

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
        <View style={ this.props.isSelected==true ? styles.selectedContentContainer: styles.unselectedContentContainer}>
          <View style={ styles.receiptNumberContainer}>        
            <Text style={styles.receiptNumber}> {this.props.receiptNumber} </Text>
          </View>
          
          
          <View style={styles.middleContainer}>
            <View style={styles.leftMiddleContainer} >
              <Text>{this.props.requestNumber + " " + this.props.address}</Text>              
              <Text>{this.props.transactionParticipant}</Text>    
              <Text style={styles.notice}>  {this.props.notice} </Text>     
            </View>

            <View style={styles.rightMiddleContainer} >
            <CheckBox
              //title='Запомнить меня'
              onPress={this._handleOnChangeRequestCheckBox}
              containerStyle={styles.checkboxContainer}
              //textStyle={styles.checkboxText}
              checkedColor='green'
              checked={this.props.isSelected}
              />
              {/* <CheckBox              
                value={this.props.isSelected}
                //onValueChange =
                onPress={this._handleOnChangeRequestCheckBox}
                checkedColor='black'
               /> */}
            </View>
          </View>

          
          

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
        borderColor: '#252828',
        borderWidth: 2,
        backgroundColor: 'white',
        borderRadius: 7,
        //paddingLeft:5,        
        marginBottom:2,
        
    },
    checkboxContainer: {
      backgroundColor: 'transparent',
      borderWidth: 0
  },
    selectedContentContainer: {
      //height: 80,
      
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      borderColor: '#252828',
      // borderColor: '#6DC9E7',
      // borderColor: '#07ef00',
      borderWidth: 2,
      backgroundColor: '#C9C8C7',
      borderRadius: 7,
      //paddingLeft:5,
      //marginTop:1,
      marginBottom:2,
      

  },
    receiptNumberContainer:{
      backgroundColor: Colors.baseBackgroundColor
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
    }
});

