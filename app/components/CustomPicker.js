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
          // 21574407010001:{
          //   value:21574407010001,
          //   text:"Нагатинская"
          // },
          // 27685162610001:{
          //   value:27685162610001,
          //   text:"Орликов"
          // },
          // 1239067490002 : {
          //   value:7544983880002,
          //   text:"Обручева2"
          // },
          // 1239067490002:
          // {
          //   value:1239067490002,
          //   text:"Автозаводская2"
          // },
          // 21574407010002:{
          //   value:21574407010002,
          //   text:"Нагатинская2"
          // },
          // 27685162610002:{
          //   value:27685162610002,
          //   text:"Орликов"
          // }                         
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
            animationType={"slide"} 
            transparent={true} 
            onRequestClose={()=> console.log("Modal click")}>

            
            <View style={styles.modalContainer}>
            
              <View style={styles.headContainer}>
                <Text style={styles.pickerText}> {this.state.pickerText +":"}</Text>
              </View>

              <View style={styles.contentContainer}>
                {/* <Text style={styles.cancelButtonText}>Отмена</Text>
                <Text style={styles.cancelButtonText}>Отмена</Text>
                <Text style={styles.cancelButtonText}>Отмена</Text>
                <Text style={styles.cancelButtonText}>Отмена</Text>
                <Text style={styles.cancelButtonText}>Отмена</Text>
                <Text style={styles.cancelButtonText}>Отмена</Text>
                <Text style={styles.cancelButtonText}>Отмена</Text>
                <Text style={styles.cancelButtonText}>Отмена</Text>
                <Text style={styles.cancelButtonText}>Отмена</Text>
                <Text style={styles.cancelButtonText}>Отмена</Text>
                 */}
                  <FlatList 
                    data={itemsArr}
                    keyExtractor={this._keyExtractor}
                    refreshing={this.props.refreshing}
                    onRefresh={this._handleOnRefreshList}
                    contentContainerStyle={styles.contentContainer}
                    
                    renderItem={({item}) =>
                    {                
                      return (
                        // <TouchableOpacity 
                        //   onPress={this.togglePicker}
                        //   //onLongPress={this._handleLongPress}
                        // >
                        // <View style={styles.pickerItemContainer}>
                          <Text style={styles.pickerItemText}>{item.text}</Text>
                        // </View>
                      // </TouchableOpacity>
                      )
                    }   
                    }
                    />
                

              </View>

              <View style={styles.bottomContainer}>
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

          </Modal>

        <Text> CustomPicker </Text>
      </View>
    );
  }
}

const styles= StyleSheet.create({

  pickerContainer:{

  },

  modalContainer:{
    //height: '80%',
    //width:'90%',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    
    //margin:'5%',
    padding:'2%',
    backgroundColor:Colors.lightTextColor,
    
    top:"20%",
    bottom:"20%",
    left:"5%",
    right:"5%",

    position:"absolute",
    
  },

  headContainer:{
    height: '13%',
    width:'100%',

    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems: 'center',
    backgroundColor:Colors.navigatorBackgroudColor

  },
  contentContainer:{
    height: '67%',
    width:'100%',
    // backgroundColor:Colors.darkBackgroundColor,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    //alignItems: 'center',
    alignItems: 'stretch',

  },
  bottomContainer:{
    height: '20%',
    width:'100%',
    flexDirection:'row',
    justifyContent:'center',
    alignItems: 'center',
    //backgroundColor:Colors.navigatorBackgroudColor

    // height: '15%',
    // width:'100%',
    // flexDirection: 'column',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    // backgroundColor:Colors.navigatorBackgroudColor
  },

  pickerText:{
    fontWeight: 'bold',
    fontSize:20,
    color: Colors.lightTextColor
    
    //marginBottom:10
  },

 

  pickerItemContainer:{
    //flex:1,
    //width:"100%",
    //height:"100%",
    flexDirection:'column',
    //justifyContent:"",
    borderWidth:1,
    borderColor : 'black'

  },

  pickerItemText:{
    fontSize: 24,
    textAlign: 'center',
    //color: '',
    margin: 5

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


  
})