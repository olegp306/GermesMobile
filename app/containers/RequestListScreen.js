import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Picker } from 'react-native';
import { Colors, Images, Metrics } from '../theme';

import RequestList from '../components/RequestListComponent';

import testData from '../middleware/TestData.json';

import DatePicker from 'react-native-datepicker'


export default class RequestListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        filterDate: new Date()
    };
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
                            minDate="2016-05-01"
                            
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
                                    fontSize:25,
                                    justifyContent: 'flex-start'
                                }
                            }}
                            
                            onDateChange={(date) => {this.setState({date: date})}}
                        />
                    </View>
                    
                    <View style={styles.filterItem}>
                        <Text  style={styles.filterLable} >Приемная: </Text>
                        <View  style={styles.pickerContainer}>
                            <Picker
                                selectedValue={this.state.language}                            
                                prompt="Выберите приемную"
                                onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
                                <Picker.Item label="Обручева" value="Обручева" />
                                <Picker.Item label="Автозаводская" value="Автозаводская" />
                                <Picker.Item label="Нагатинская" value="Нагатинская" />
                                <Picker.Item label="Орликов" value="Орликов" />
                            </Picker>
                        </View>
                    </View>
                </View>
            </View>
            
            <View styles={styles.horizontalDivider}>
                {/* <Text>[ЧыК ЧЫК]></Text> */}
            </View>

            <View style={styles.listContainer}>
                <RequestList requests={testData.requests} />
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
        height: '85%',
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
        fontSize: 20,
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

    

    // filterLable:{
    //     fontSize:12
    // }
});