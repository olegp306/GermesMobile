import React, { Component } from 'react';
import { View, Text, Modal, StyleSheet,FlatList,TouchableOpacity } from 'react-native';
import _ from 'lodash'
import { Colors } from '../theme';

export default class CustomPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
        pickerDisaplayed:false,       
    };
  }

  _onSetValueHandler=(receptionId)=>{
    this._togglePicker();
    this.setState({

    })
    this.props.onSetValue(receptionId);
  }

  _togglePicker=()=>{
    this.setState(
      {
        pickerDisaplayed: !this.state.pickerDisaplayed
      }
    )
  }

  _keyExtractor=(item,index) => item.id;
  

  render() {
    
    // const items=this.props.items;
    // const pickerText=this.props.pickerText;
    // const selectedItemId=this.props.selectedItemId;
    const {items, pickerText, selectedItemId}=this.props;
    

    const itemsArr = _.values(items);
    return (
      <View style={styles.pickerContainer}>
        <TouchableOpacity
          onPress={() => {
          //Keyboard.dismiss();
          this._togglePicker();
          }}
        >
          
            <Text style={styles.selectedItemTextStyle}>{items[selectedItemId].text}</Text>
          
        </TouchableOpacity>

      
          <Modal 
            visible={this.state.pickerDisaplayed} 
            animationType={"fade"} 
            transparent={true} 
            onRequestClose={()=>this._togglePicker()}
            >
        
            <View style={styles.modalScreenContainer}>
            <View style={styles.modalContainer}>

            
              <View style={styles.headContainer}>
                <Text style={styles.headText}> {pickerText +":"}</Text>
                <Text style={styles.headNotice}> { " выбрано: " + items[selectedItemId].text }</Text>
                
              </View>

              <View style={styles.middleContainer}>
                <FlatList 
                    data={itemsArr}
                    keyExtractor={this._keyExtractor}
                    refreshing={this.props.refreshing}
                    onRefresh={this._handleOnRefreshList}
                    contentContainerStyle={styles.pickerItemContainer}
                    
                    renderItem={({item,index}) =>
                    {                
                      return (
                        <TouchableOpacity 
                          onPress={()=>{this._onSetValueHandler(item.id)}}                          
                        >
                        <View >
                          <Text style={ item.id==selectedItemId ? styles.pickerSelectedItemText : styles.pickerItemText}>{item.text}</Text>
                          <View style={styles.horizontalDivider}></View>
                        </View>
                        
                      </TouchableOpacity>
                      )
                    }   
                    }
                    />
                
                
              </View>
              <View style={styles.bottomHorizontalDivider}></View>   
              <View style={styles.bottomContainer}>           
              
                <TouchableOpacity
                              onPress={() => {
                                  //Keyboard.dismiss();
                                  this._togglePicker();
                              }}
                              >
                              <View style={styles.cancelButton}>
                                  <Text style={styles.cancelButtonText}>Отмена</Text>
                              </View>
                </TouchableOpacity>                
              </View>
            </View>
          </View>

        </Modal>
        
      </View>
    );
  }
}

const styles= StyleSheet.create({

  pickerContainer:{   


  },
  selectedItemTextStyle:{
    textAlign:'center',
    color:Colors.whiteTextColor,
    fontSize:16
  },

  modalScreenContainer:{
    position:"absolute",
    flex:1,    
    backgroundColor:'rgba(52, 52, 52, 0.4)',
    
    height: '100%',
    width:'100%',   

    // top:"0%",
    // bottom:"0%",
    // left:"0%",
    // right:"0%",
  },

  modalContainer:{
   
    position:"absolute",
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    
    //margin:'5%',
    //padding:'4%',
    backgroundColor:Colors.baseBackgroundColor,
    
    top:"15%",
    bottom:"15%",
    left:"8%",
    right:"8%",
  },

  headContainer:{
    height: '16%',
    width:'100%',
    //padding:'4%',

    //flexDirection:'row',
    justifyContent:'center',
    //alignItems: 'center',
    backgroundColor:Colors.navigatorBackgroudColor

  },

  middleContainer:{
    flex: 1,
    flexDirection:'column',
    justifyContent: 'center',
    //alignItems: 'stretch',
        
    height: '34%',
    width:'100%',
    
    //alignItems: 'center',  
    
  },

  bottomContainer:{
    flexDirection:'column',
    height: '17%',
    width:'98%',
    //flexDirection:'row',
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor:Colors.whiteSmoke
    
  },

  headText:{
    //fontWeight: 'bold',
    fontSize:23,
    color: Colors.lightTextColor,
    left:'4%',
  },

  headNotice:{
    fontWeight: 'bold',
    fontSize:10,
    color: Colors.lightTextColor,
    alignItems:"flex-start",
    left:'4%'
  },

  pickerText:{
    fontWeight: 'bold',
    fontSize:20,
    color: Colors.lightTextColor,
  },

 

  pickerItemContainer:{
    //flex:1,
    flexDirection:'column',
    justifyContent: 'center',
    alignItems: 'center',
    
    //backgroundColor:Colors.ligth2,    
     width:"100%",
    // height:"100%",
   
    // justifyContent:"",
    // borderWidth:1,
    // borderColor : 'black'

  },

  pickerItemText:{
    //flex:1,
   //width:'90%',
    fontSize: 23,
    textAlign: 'center',
    margin: 5
  },
  
  pickerSelectedItemText:{
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
    margin: 5,
    

  },
  cancelButton: {
     flexDirection:"column",    
},

cancelButtonText: {
    fontSize: 24,
    textAlign: 'center',
    color: Colors.navigatorBackgroudColor,
    margin: 15
},

horizontalDivider: {
  width: '80%',
  height: 1,
  left:"3%",
  right:"3%",
  backgroundColor: Colors.lightGray,
  justifyContent: 'center',
},

bottomHorizontalDivider: {
  marginTop: "4%",
  width: '98%',
  height: 1, 
  backgroundColor: Colors.lightGray,
  justifyContent: 'center',
},


  
})