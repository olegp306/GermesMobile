import React, { Component } from 'react';
import { View, Text, Modal, StyleSheet,FlatList,TouchableOpacity } from 'react-native';
import _ from 'lodash'
import { Colors } from '../theme';
import { MaterialIcons  } from '@expo/vector-icons';

export default class ImageSourcePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
        pickerDisaplayed:false,       
    };
  }

  _onSetValueHandler=(receptionId)=>{
    this._togglePicker(); 
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
    const {items, pickerText, selectedItemId}=this.props;
    const itemsArr = _.values(items);

    // let sourceItems= itemsArr.map(function(item,index){
    //   return(
    //     <TouchableOpacity onPress={()=>{ this._onSetValueHandler(item.id) }} >  
    //       <Text style={ item.id==selectedItemId ? styles.selectedItemText : styles.itemText}>
    //         {item.text}
    //       </Text>
    //     </TouchableOpacity>
    //   )
    // })
    
    return (
      
      <View style={styles.pickerContainer}>
        <TouchableOpacity
          onPress={() => {
          //Keyboard.dismiss();
          this._togglePicker();
          }}
        >
          {/* Текущий выбор */}
          <MaterialIcons  name='camera' size={30} color='#53565A' />
            {/* <Text style={styles.selectedItemHeadText}>{items[selectedItemId].text}</Text> */}
          
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
                {
                  (selectedItemId) 
                  ?
                    <Text style={styles.headNotice}> { " выбрано: " + items[selectedItemId].text }</Text>  
                  :
                    null
                }

                {/* <Text style={styles.headNotice}> { " выбрано: " + items[selectedItemId].text }</Text> */}
                
              </View>

                <View style={styles.middleContainer}>
                {/* {sourceItems} */}

                  <FlatList 
                      data={itemsArr}
                      keyExtractor={this._keyExtractor}
                      refreshing={this.props.refreshing}
                      onRefresh={this._handleOnRefreshList}

                      contentContainerStyle={styles.flatListContainer}
                      
                      renderItem={({item,index}) =>
                      {                
                        return (
                          <View style={{width:"100%",  backgroundColor:"red", }} >
                            <TouchableOpacity onPress={()=>{this._onSetValueHandler(item.id)}} >  
                              <Text 
                              style={ item.id==selectedItemId ? styles.selectedItemText : styles.itemText}
                              >
                                {item.text}                           
                              </Text>
                            </TouchableOpacity>
                          </View>
                        )
                      }   
                      }
                      />
                </View>

                <View style={styles.bottomHorizontalDivider}></View> 

              <View style={styles.bottomContainer}>       
                <TouchableOpacity onPress={this._togglePicker}>
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

  
  modalScreenContainer:{
    position:"absolute",
    flex:1,    
    backgroundColor:'rgba(52, 52, 52, 0.4)',
    
    height: '100%',
    width:'100%',   
    
  },

  modalContainer:{   
    position:"absolute",
    flex: 1,
    flexDirection: 'column',
    justifyContent:'space-between',
    alignItems: 'center',
    
    //margin:'5%',
    //padding:'4%',
    backgroundColor:Colors.baseBackgroundColor,
    
    top:"45%",
    bottom:"10%",
    left:"8%",
    right:"8%",
  },

  headContainer:{
    height: '16%',
    width:'100%',
    justifyContent:'center',
    backgroundColor:Colors.navigatorBackgroudColor
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

  middleContainer:{    
    height: '64%',
    width:'100%',
    //flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    //alignItems: 'center',   
    
    backgroundColor:"yellow"
  },

  flatListContainer:{    
    // flexDirection:'column',
    // justifyContent: 'center',
    
    
    // //backgroundColor:Colors.ligth2,    
    //  width:"100%",
  },

  selectedItemText:{
    width:'90%',    
    fontSize: 24,
    textAlign: 'center',
    backgroundColor:"blue"
    //margin: 5,   

  },
 
  selectedItemHeadText:{
    textAlign:'center',
    color:Colors.whiteTextColor,
    fontSize:16
  },


  bottomContainer:{
    height: '20%',
    width:'98%',
    flexDirection:'column',
    //flexDirection:'row',
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor:Colors.whiteSmoke
    
  },

  itemText:{
     //width:'90%',
    //fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
    //margin: 5,
    backgroundColor:"blue"
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
  //marginTop: "4%",
  width: '100%',
  height: 1, 
  backgroundColor: Colors.lightGray,
  justifyContent: 'center',
},


  
})