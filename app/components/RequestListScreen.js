import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Picker } from 'react-native';
import { Colors, Images, Metrics } from '../theme';

import RequestList from './RequestListComponent';

import testData from '../middleware/TestData.json';

import DatePicker from 'react-native-datepicker'


export default class RequestListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        
    };
  }  

   

  render() {
    return (
        <View style={styles.screenContainer}>
            <View style={styles.headContainer}>

                <View  style={styles.filterDateContainer} >
                    {/* <Text style={styles.filterDateLable}> Выдача до: </Text>                 */}
                    <DatePicker
                        style={{width: 175}}
                        date={this.state.date}
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
                                borderRadius: 20,
                                borderWidth: 0.5,
                                backgroundColor: '#C9C8C7'
                            }
                        }}
                        
                        onDateChange={(date) => {this.setState({date: date})}}
                    />

                    {/* <Text  style={styles.filterOrgLable} >Приемная: Обручева</Text> */}
                <Picker
                    selectedValue={this.state.language}
                    style={{ height: 50, width: 175 }}
                    onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
                    <Picker.Item label="Обручева" value="Обручева" />
                    <Picker.Item label="Автозаводская" value="Автозаводская" />
                    <Picker.Item label="Нагатинская" value="Нагатинская" />
                    <Picker.Item label="Орликов" value="Орликов" />
                </Picker>
            </View>
                
            </View>

        <RequestList requests={testData.requests} />
          
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
        marginTop: 30,


    },

    list:{
        backgroundColor: Colors.backgroundColor
    },

    filterDateContainer:{
        flexDirection:'row'
    },

    filterDateLable:{
        // fontSize: 20,
        textAlignVertical: 'center',
        
    },

    filterOrgLable:{
       // fontSize: 20,
       textAlignVertical: 'center',
    },

    contentContainer: {
        //height: 80,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        backgroundColor:'#f6f6f6',

    },
    receiptNumber:{
        textAlign:'center',
        fontWeight:'500',
        fontSize: 20,
    },
    notice:{
        fontStyle:'italic'
    },
});