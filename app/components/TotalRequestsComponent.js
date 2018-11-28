 import React, { Component } from 'react';
 import { View, Text , StyleSheet } from 'react-native';
 import { Colors, Images, Metrics } from '../theme';

 export default class TotalRequestsComponent extends Component {
   constructor(props) {
     super(props);
     this.state = {
     };
   }

   render() {        
     return (
      <View style={styles.bottomContainer}>      
        <View styles={styles.bottomRowContainer}>
          <Text style={styles.bottomLable}>Всего: { this.props.totalRequestAmount} шт.</Text>
        </View>
        <View styles={styles.bottomRowContainer}>
          <Text style={styles.bottomSmallLable}>C баркодами: { this.props.withBarcodesAmount} шт.</Text>
          <Text style={styles.bottomSmallLable}>Выделено: { this.props.selectedAmount} шт.</Text>
        </View>
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
      backgroundColor: 'white'
  },

  bottomContainer:{    
    width:'100%',
    flexDirection: 'row',                    
    backgroundColor: Colors.navigatorBackgroudColor,

    // flex: 1,
    
    justifyContent: 'space-between',
    alignItems: 'center',
    
  },
  bottomRowContainer:{      
      flexDirection: 'column',
      //flexDirection: 'column',
      justifyContent : 'center',

  },        
      
  bottomLable:{
      color: 'white',
      fontSize: 17,
      marginLeft: 4,
      marginRight: 4
  },

  
  bottomSmallLable:{
      color: 'white',
      fontSize: 13,
      marginLeft: 4,
      marginRight: 4,

     
  },
  horizontalDivider: {
      height: 15,
      borderWidth:1,
      borderColor : 'black'
  }
  
})