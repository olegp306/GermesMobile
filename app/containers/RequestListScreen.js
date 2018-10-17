import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Picker } from 'react-native';
import { Colors, Images, Metrics } from '../theme';

import RequestList from '../components/RequestListComponent';

import testData from '../middleware/TestData.json';

import api from '../middleware/api'

import DatePicker from 'react-native-datepicker'

const avtozavodskayaId=123906749000;
const obruchevaId=754498388000;
const nagatinskayaId=2157440701000;
const orlikov17Id=2768516261000;


Date.prototype.formatMMDDYYYY = function(){
    return this.getDate() + 
    "." +  (this.getMonth() + 1) +
    "." +  this.getFullYear();
}

export default class RequestListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        filterDate: new Date().formatMMDDYYYY (),
        receptionId:123906749000 ,
        requests:{},  
        selectedItems: testData.selectedItems,
        barcodes:{}
    };
    
    this._handleUpdateRequest();
  }  
  

  _handleFilterDateChange = (filterDate) => { this.setState({filterDate: filterDate },this._handleUpdateRequest )}

  _handleReceptoionChange = (receptionId) => { this.setState({receptionId: receptionId},this._handleUpdateRequest) }


  _handleLongPressRequest = (requestId) =>{ 
    let newSelectedItems=this.state.selectedItems; 
    //console.log("REquest SCRENN   _handleLongPressRequest request:" + requestId);
    if(this.state.selectedItems[requestId])
    {
        // console.log("REquest SCRENN  Exist _handleLongPressRequest request:" + requestId);           
        newSelectedItems[requestId].isSelected = !(newSelectedItems[requestId].isSelected);
        this.setState(
            { selectedItems : newSelectedItems }
            );
    }
    else
    {
        // console.log("REquest SCRENN  not Exist _handleLongPressRequest request:" + requestId);        
        newSelectedItems[requestId]= { requestId:requestId, isSelected:  true };

        this.setState(
        { selectedItems: newSelectedItems }
        );
   }
  }
  _handleShortPressRequest = (request) =>{ 
        console.log(" REquest SCRENN  _handleShortPressRequest request:" + request);
        console.log("ОТкрываем форму комменатарий request:" + request);
  }

  _handleOnScanBarcode=(barcode)=>{
    let newBarcodes=this.state.barcodes; 
    console.log("_handleOnScanBarcode" + barcode.codeText);
    if(this.state.barcodes[barcode.codeText])
    {
        console.log("Такой баркод уже отсканирован");           
     }
    else
    {
        // console.log("REquest SCRENN  not Exist _handleLongPressRequest request:" + requestId);        
        newBarcodes[barcode.codeText]= { codeText:barcode.codeText, scanDateTime:  new Date() };

        this.setState(
        { barcodes: newBarcodes }
        );
   }
  }

  _handlePasswordChange = (password) => this.setState({password})

  _handleUpdateRequest =()=>{
    //console.log("_handleUpdateRequest");
    api.fetchRequests(this.state.filterDate,this.state.receptionId)
    .then((response)=>{
        this.setState({requests: api.toAssociativeArray(response.data,"requestId")});
    })
  }



  render() {
    return (
        <View style={styles.screenContainer}>
            <View style={styles.headContainer}>
                <View  style={styles.filterDateContainer} >
                    <View style={styles.filterItem}>
                        <Text style={styles.filterLable}> Выдача до: </Text>                
                        <DatePicker
                            style={{width: 175}}
                            date={this.state.filterDate}
                            mode="date"
                            placeholder="select date"
                            format="YYYY-MM-DD"
                            minDate="2018-10-01"
                            
                            //maxDate="2016-06-01"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            
                            customStyles={{
                                dateIcon: {
                                    width: 0
                                },
                                dateInput: {
                                    borderRadius: 5,
                                    borderWidth: 1,
                                    borderColor: Colors.touchableBorderColor,
                                    backgroundColor: '#91d1ff',
                                    // fontSize:15
                                },
                                dateText:{
                                    //color: '#c7c8ca',
                                    fontSize:20,
                                    justifyContent: 'flex-start'
                                }
                            }}
                            
                            onDateChange={(date) => this._handleFilterDateChange(date)}
                        />
                    </View>
                    
                    <View style={styles.filterItem}>
                        <Text  style={styles.filterLable} >Приемная: </Text>
                        <View  style={styles.pickerContainer}>
                            <Picker
                                value={this.state.filterDate}    
                                selectedValue={this.state.receptionId}                            
                                prompt="Выберите приемную"
                                onValueChange={(itemValue, itemIndex) => this._handleReceptoionChange(itemValue)}>
                
                                <Picker.Item label="Обручева" value="754498388000" />
                                <Picker.Item label="Автозаводская" value="123906749000" />
                                <Picker.Item label="Нагатинская" value="2157440701000" />
                                <Picker.Item label="Орликов" value="2768516261000" />
                            </Picker>
                        </View>
                    </View>
                </View>
            </View>
            
            <View styles={styles.horizontalDivider}>
                {/* <Text>[ЧыК ЧЫК]></Text> */}
            </View>

            <View style={styles.listContainer}>
                <RequestList 
                    requests={this.state.requests} 
                    selectedItems={this.state.selectedItems} 
                    onShortPressRequest={ this._handleShortPressRequest} 
                    onLongPressRequest={ this._handleLongPressRequest}/>
            </View>
            <View styles={styles.bottomContainer}>
                <Text style={styles.bottomLable}>Всего: { Object.keys(this.state.requests).length} шт.</Text>
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
        backgroundColor: Colors.backgroundColor
    },

    headContainer:{
        marginTop: 5,
        height: '12%',
    },

    filterDateContainer:{
        flexDirection:'row',
        height: '85%',
        borderColor:Colors.touchableBorderColor
    },

    filterItem:{
        flexDirection: 'column',
        justifyContent: 'space-between'
    },

    listContainer:{        
        height: '80%',
        width:'98%'
    },

    bottomContainer:{        
        height: '5%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
    },
        
        
    bottomLable:{
        textAlign:'left',
        fontSize: 15
    },

    
    

    horizontalDivider: {
        height: 15,
        borderWidth:1,
        borderColor : 'black'
    },
    
    


    // list:{
    //     backgroundColor: Colors.backgroundColor
    // },

    

    pickerContainer:{
        height: 40,
        width: 175,
        borderRadius: 5,
        borderWidth: 1 ,
        backgroundColor: '#91d1ff' ,
        //fontSize: 20,
        borderColor: Colors.touchableBorderColor,        
    },


    // filterDateLable:{
    //     // fontSize: 20,
    //     textAlignVertical: 'center',
        
    // },

    // filterOrgLable:{
    //    // fontSize: 20,
    //    textAlignVertical: 'center',
    // },

    // contentContainer: {
    //     //height: 80,
    //     flexDirection: 'column',
    //     justifyContent: 'space-between',
    //     alignItems: 'stretch',
    //     backgroundColor:'#f6f6f6',

    // },
    // receiptNumber:{
    //     textAlign:'center',
    //     fontWeight:'500',
    //     fontSize: 20,
    // },
    // notice:{
    //     fontStyle:'italic'
    // },

    

    filterLable:{
        fontSize:10
    }
});