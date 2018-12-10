import React, { Component } from 'react';
import { View, Text, Modal, StyleSheet,FlatList,TouchableOpacity } from 'react-native';
import _ from 'lodash'
import { Colors } from '../theme';

export default class CustomPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
        pickerDisaplayed:false,

        pickerText:"Выберите приемную",

        selectedValue:123906749000,

        items:{
          123906749000 : {
            value:754498388000,
            text:"Обручева"
          },
          123906749000:
          {
            value:123906749000,
            text:"Автозаводская"
          },
          2157440701000:{
            value:2157440701000,
            text:"Нагатинская"
          },
          2768516261000:{
            value:2768516261000,
            text:"Орликов"
          },
          1239067490001 : {
            value:7544983880001,
            text:"Обручева"
          },
          1239067490001:
          {
            value:1239067490001,
            text:"Автозаводская"
          },
          21574407010001:{
            value:21574407010001,
            text:"Нагатинская"
          },
          27685162610001:{
            value:27685162610001,
            text:"Орликов"
          },
          1239067490002 : {
            value:7544983880002,
            text:"Обручева2"
          },
          1239067490002:
          {
            value:1239067490002,
            text:"Автозаводская2"
          },
          21574407010002:{
            value:21574407010002,
            text:"Нагатинская2"
          },
          27685162610002:{
            value:27685162610002,
            text:"Орликов"
          }                         
      }
        
    };
  }

  togglePicker=()=>{
    this.setState(
      {
        pickerDisaplayed: !this.state.pickerDisaplayed
      }
    )
  }

  _keyExtractor=(item,index) => item.value;
  

  render() {
    const itemsArr = _.values(this.state.items);
    return (
      <View style={styles.pickerContainer}>
        <TouchableOpacity
          onPress={() => {
          //Keyboard.dismiss();
          this.togglePicker();
          }}
        >
          <View style={styles.enterButton}>
            <Text style={styles.enterText}>{this.state.items[this.state.selectedValue].text}</Text>
          </View>
        </TouchableOpacity>

      
          <Modal 
            visible={this.state.pickerDisaplayed} 
            animationType={"fade"} 
            transparent={true} 
            onRequestClose={()=> console.log("Modal click")}>

        
            <View style={styles.modalScreenContainer}>
            <View style={styles.modalContainer}>

            
              <View style={styles.headContainer}>
                <Text style={styles.headText}> {this.state.pickerText +":"}</Text>
                <Text style={styles.headNotice}> { " выбрано :" + this.state.items[this.state.selectedValue].text }</Text>
                
              </View>

              <View style={styles.middleContainer}>
                <FlatList 
                    data={itemsArr}
                    keyExtractor={this._keyExtractor}
                    refreshing={this.props.refreshing}
                    onRefresh={this._handleOnRefreshList}
                    contentContainerStyle={styles.contentContainer}
                    
                    renderItem={({item}) =>
                    {                
                      return (
                        <TouchableOpacity 
                          onPress={this.togglePicker}
                          //onLongPress={this._handleLongPress}
                        >
                        <View style={styles.pickerItemContainer}>
                          <Text style={ item.value==this.state.selectedValue ? styles.pickerSelectedItemText : styles.pickerItemText}>{item.text}</Text>
                        </View>
                        <View style={styles.horizontalDivider}></View>
                      </TouchableOpacity>
                      )
                    }   
                    }
                    />
                

              </View>

              <View style={styles.bottomContainer}>
              {/* <View style={styles.bottomHorizontalDivider}></View> */}
                <TouchableOpacity
                              onPress={() => {
                                  //Keyboard.dismiss();
                                  this.togglePicker();
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
        

        {/* <Text> CustomPicker </Text> */}
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
    height: '34%',
    width:'100%',
    alignItems: 'stretch',    
  },

  contentContainer:{        
    justifyContent: 'center',
    alignItems: 'stretch',

  },
  bottomContainer:{
    height: '25%',
    width:'100%',
    flexDirection:'row',
    justifyContent:'center',
    alignItems: 'center',
    
  },

  headText:{
    fontWeight: 'bold',
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
    //width:"100%",
    //height:"100%",
    //flexDirection:'column',
    //justifyContent:"",
    //borderWidth:1,
    //borderColor : 'black'

  },

  pickerItemText:{
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
    justifyContent: 'center',
    backgroundColor: Colors.actionBackgroundColor,
    minWidth: 245,
    minHeight: 45,
    borderRadius: 30
},
cancelButtonText: {
    fontSize: 24,
    textAlign: 'center',
    color: 'white',
    margin: 5
},
horizontalDivider: {
  width: '94%',
  height: 1,
  left:"3%",
  right:"3%",
  backgroundColor: Colors.lightBackgroundColor,
  justifyContent: 'center',
},

bottomhorizontalDivider: {
  width: '100%',
  height: 1, 
  backgroundColor: Colors.navigatorBackgroudColor,
  justifyContent: 'center',
},


  
})