import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Picker ,Alert } from 'react-native';
import { Colors, Images, Metrics } from '../theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-datepicker'

import RequestList from '../components/RequestListComponent';
import Loader from '../components/Loader'

import { connect } from 'react-redux'

import { setFilterDate, setReception } from '../store/germes/filter/actions'
import { fetchRequests, startRequestsStatusChange } from '../store/germes/requests/actions'
import { selectItem, unSelectItem, clearSelectedItems } from '../store/germes/selectedItems/actions'
import _ from 'lodash'


const avtozavodskayaId=123906749000;
const obruchevaId=754498388000;
const nagatinskayaId=2157440701000;
const orlikov17Id=2768516261000;

Date.prototype.formatDDMMYYYY = function(){   
    return (this.getFullYear() +
    "." +  (this.getMonth() + 1)+
    "." + this.getDate() )
}

// если @connect наверху то mapStateToProps уже должен быть объявлен перед @connect
// приклеиваем данные из store
const mapStateToProps = store => {    
    //console.log("mapStateToProps");
    console.log("store.requests.toJS()");
    console.log(store.requests.toJS());
    return {
        filterDate: store.filter.get("filterDate"),
        filterReceptionId: store.filter.get("filterReceptionId"),        
        requests: store.requests.toJS(),
        selectedItems: store.selectedItems.toJS(),
        barcodes: store.barcodes.toJS()
    }
  }

 const mapDispatchToProps = dispatch =>{
     return {
         setFilterDateAction : date => dispatch (setFilterDate(date)),
         setReceptionIdAction : receptionId => dispatch (setReception(receptionId)),
         fetchRequestsAction: ( filterDate, filterReceptionId ) => dispatch(fetchRequests( { filterDate, filterReceptionId } )),

         selectItemAction : requestId=>dispatch(selectItem(requestId)),
         unSelectItemAction : requestId=>dispatch(unSelectItem(requestId)),
         clearSelectedItemAction : ()=>dispatch(clearSelectedItems()),

         addBarcodeAction : barcode=> dispatch (addBarcode(barcode)),
         clearBarcodesAction : ()=> dispatch (clearBarcodes()),
         startRequestsStatusChangeAction: ()=> dispatch(startRequestsStatusChange())

     }
 } 

@connect( mapStateToProps, mapDispatchToProps )
export default class RequestListScreen extends Component {
  // Ovveride базовый navigationOptions и дополнил кнопками в хедере
  static navigationOptions=({ navigation, navigationOptions })=>{
    const { params } = navigation.state;

    return {
        title: 'Заявки',
        headerRight: 
           <View style={styles.headButtonsContainer}>
                <View style={styles.iconContainer}>
                <Icon
                    name='barcode'
                    size={40}
                    color={Colors.actionItemColor}
                    onPress={() => navigation.navigate('BarCodeScanner')}
                />          
                </View>
                <View style={styles.iconContainer}>
                <Icon
                    name='send'
                    size={37}
                    color={Colors.actionItemColor}
                    onPress={() => navigation.navigate('NotifyOffice')}
                    
                />          
                </View>     
            </View>                  
            }
  }
  
  //_handleFilterDateChange = (filterDate) => { this.setState({filterDate: filterDate },this._handleUpdateRequest )}
  _handleFilterDateChange = (filterDate) => {      
      this.props.setFilterDateAction(filterDate);
      this.props.fetchRequestsAction(); //параметры забиру из store
     };


  _handleReceptoionChange = (receptionId) => {
    this.props.setReceptionIdAction(receptionId);
    this.props.fetchRequestsAction(); //параметры забиру из store
    }

  _handleLongPressRequest = (requestId) =>{        
    (this.props.selectedItems.hasOwnProperty(requestId)) ? this.props.unSelectItemAction(requestId) : this.props.selectItemAction(requestId)
  }

  _handleShortPressRequest = (request) =>{    
    this.props.navigation.navigate('AddComment',request )
  }
  
  _handleOnChangeRequestCheckBox = (requestId) =>{        
    (this.props.selectedItems.items.hasOwnProperty(requestId)) ? this.props.unSelectItemAction(requestId) : this.props.selectItemAction(requestId)
  }

  _handleOnRefreshList=()=>{
    this.props.fetchRequestsAction(); 
  }

  _handleFilterDateChange = (filterDate) => {      
    this.props.setFilterDateAction(filterDate);
    this.props.fetchRequestsAction(); //параметры забиру из store
   };

  _getNumberOfMatches=(array1, arrya2)=>{
    let amount=0;
    for(key in array1)
    {
        if(arrya2.hasOwnProperty(key))
        {
            amount++;
        }

    }
    return amount;
  }

  _getNumberOfBarcodesMatches=(array1, array2)=>{
    let amount=0;
    for(key in array1)
    {
        for(key2 in array2)
        {
            let requestId=array2[key2].receiptNumber;
            if(key==requestId)
            {
                amount++;
                break;
            }
        }  
    }
    return amount;
  }
  

 
  componentDidMount() {
      this.props.fetchRequestsAction(); //параметры забиру из store
      this.props.navigation.setParams({dispatch: this.dispatch });
      this.props.navigation.setParams({startRequestsStatusChangeAction: this.props.startRequestsStatusChangeAction });
  }
  

  render() {
    //console.log('RequestListScreen');
    //console.log(this.props);    
    const { isFetching ,items, refreshing }=this.props.requests;
    const { filterDate, filterReceptionId, selectedItems, barcodes }=this.props;

    return (
        <View style={styles.screenContainer}>

            <View style={styles.headContainer}>

                <View  style={styles.filtersContainer} >

                    <View style={styles.filterItem}>
                        <Text style={styles.filterLable}> Выдача до: </Text> 
                        <View  style={styles.pickerContainer}>
                            <DatePicker
                                style={{width: 175}}
                                date={filterDate}
                                mode="date"
                                placeholder="select date"
                                format="DD-MM-YYYY"
                                minDate="2018-10-01"
                                
                                //maxDate="2016-06-01"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                
                                customStyles={{
                                    dateIcon: {
                                        width: 0
                                    },
                                    dateInput: {                                        
                                        backgroundColor: Colors.actionBackgroundColor,
                                        // fontSize:15
                                    },
                                    dateText:{                                    
                                        fontSize:20,                                        
                                    }
                                }}
                                
                                onDateChange={(date) => this._handleFilterDateChange(date)}
                            />
                        </View>
                    </View>
                    
                    <View style={styles.filterItem}>
                        <Text  style={styles.filterLable} >Приемная: </Text>
                        <View  style={styles.pickerContainer}>
                            <Picker
                                //value={this.state.filterDate}    
                                selectedValue={filterReceptionId}                            
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
                {/* <Loader message='Обновление заявок' isLoading={false}> */}
                <Loader message='Обновление заявок' isLoading={isFetching} >
                    {
                        ((Object.keys(items).length==0 )  && !isFetching)
                        ?
                        (
                            <View style={styles.noDataLable}>
                                <Text>Нет данных </Text>
                                <Text>Попробуйте изменить фильтр поиска </Text>                
                            </View>
                        )
                        :
                        (
                            <RequestList                         
                                requests={_.sortBy(items,'requestId') } 
                                refreshing={refreshing}
                                //requests={ items} 
                                onShortPressRequest={ this._handleShortPressRequest} 
                                onLongPressRequest={ this._handleLongPressRequest}
                                onChangeRequestCheckBox={ this._handleOnChangeRequestCheckBox}
                                onRefreshList={ this._handleOnRefreshList} 

                                // selectedItems={selectedItems} 
                                selectedItems={selectedItems}
                                barcodes = { barcodes }
                            />
                        )
                    }            
                    
                 </Loader>
            </View>            
            <View style={styles.bottomContainer}>
                <View styles={styles.bottomRowContainer}>
                    <Text style={styles.bottomLable}>Всего: { Object.keys(items).length} шт.</Text>
                </View>                

                <View styles={styles.bottomRowContainer}>
                    <Text style={styles.bottomSmallLable}>C баркодами: { this._getNumberOfBarcodesMatches(barcodes.items,items)} шт.</Text>
                    <Text style={styles.bottomSmallLable}>Выделено: { this._getNumberOfMatches(selectedItems.items,items)} шт.</Text>
                </View>
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

    headContainer:{
        marginTop: 5,
        height: '12%',
    },

    filtersContainer:{
        flexDirection:'row',        
        width: '100%',                
    },

    filterItem:{
        flexDirection: 'column',
        width: '47%',
        marginLeft: 2 ,
        marginRight: 2
    },

    listContainer:{        
        height: '80%',
        width:'98%',
        
    },

    bottomContainer:{
        height: '8%',
        width:'98%',
        flexDirection: 'row',                
        alignItems: 'center',
        backgroundColor: Colors.darkBackgroundColor,

        // flex: 1,
        
        justifyContent: 'space-between',
        alignItems: 'center',
        
    },
    bottomRowContainer:{
             
        // flexDirection: 'column',         
        // justifyContent: 'space-between',
        // alignItems: 'center',        
    },        
        
    bottomLable:{
        color: Colors.baseColor,
        fontSize: 17,
        color: 'white',
        marginLeft: 5,
    },
    bottomSmallLable:{
        color: Colors.baseColor,
        fontSize: 13,
        color: 'white',
        marginRight: 5,
    },
    horizontalDivider: {
        height: 15,
        borderWidth:1,
        borderColor : 'black'
    },
    pickerContainer:{
        height: 40,
        flexDirection: 'column',
        justifyContent : 'center',
        // justifyContent: 'flex-start',
        //width: 175,
        // borderRadius: 5,
        // borderWidth: 1 ,
        backgroundColor: Colors.actionBackgroundColor ,       
        //borderColor: Colors.darkBackgroundColor,        
    },
    filterLable:{
        fontSize:10
    },

    headButtonsContainer:{
        flexDirection: 'row',        
       },
       
       iconContainer: {
        width: 45,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 25,

      },

      noDataLable:{
        flexDirection: 'column', 
        justifyContent: 'center',
        alignItems: 'center',
      }

});


