
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default class PickerItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const pickerItemText=this.props.pickerItemText;
    return (
        <View style={styles.middleItemContainer}>
            <TouchableOpacity style={{width:'100%',alignItems:'center'}} onPress={this.props.onPressItem}>           
              <Text style={styles.pickerItemText}> {pickerItemText} </Text>            
            </TouchableOpacity>
        </View>
      
    );
  }
}


const styles= StyleSheet.create({    
    middleItemContainer:{
        width:'95%',      
        alignItems:"center", 
        //backgroundColor:"blue", 
      },
  
    
    pickerItemText:{
      fontSize:18,
      color:"blue",
      width:'90%',
      //backgroundColor:"gray",
      textAlign:'center'
      
    },
  
    
  
    horizontalBlockDivider:{
      width:"100%",
      height:3 
    }
  
  
  
  })
  