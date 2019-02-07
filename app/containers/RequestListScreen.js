import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Picker ,Alert } from 'react-native';
import { Colors, Images, Metrics } from '../theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-datepicker'

import RequestList from '../components/RequestListComponent';
import TotalRequestsContainer from './TotalRequestsContainer';
import CustomPicker from '../components/CustomPicker'

import Loader from '../components/Loader'

import { connect } from 'react-redux'

import { setFilterDate, setReception } from '../store/germes/filter/actions'
import { fetchRequests, startRequestsStatusChange } from '../store/germes/requests/actions'


import { selectItem, unSelectItem, clearSelectedItems } from '../store/germes/selectedItems/actions'
import _ from 'lodash'


// const avtozavodskayaId=123906749000;
// const obruchevaId=754498388000;
// const nagatinskayaId=2157440701000;
// const orlikov17Id=2768516261000;

const receptionItems={
    754498388000 : {
      id:754498388000,
      text:"Обручева"
    },
    123906749000:
    {
        id:123906749000,
      text:"Автозаводская"
    },
    2157440701000:{
        id:2157440701000,
      text:"Нагатинская"
    },
    2768516261000:{
        id:2768516261000,
      text:"Орликов"
    },
    2635401955000:{
        id:2635401955000,
      text:"МФЦ"
    },
    2767770302000:{
        id:2767770302000,
      text:"МФЦ Обл."
    },

    
};


Date.prototype.formatDDMMYYYY = function(){   
    return (this.getFullYear() +
    "." +  (this.getMonth() + 1)+
    "." + this.getDate() )
}

// если @connect наверху то mapStateToProps уже должен быть объявлен перед @connect
// приклеиваем данные из store
const mapStateToProps = store => {
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
         startRequestsStatusChangeAction: ()=> dispatch(startRequestsStatusChange()),

        
     }
 } 

@connect( mapStateToProps, mapDispatchToProps )
export default class RequestListScreen extends Component {
  // Ovveride базовый navigationOptions и дополнил кнопками в хедере
  static navigationOptions=({ navigation, navigationOptions })=>{
    const { params } = navigation.state;

    return {
        title: 'Заявки',
        headerLeft:
        <View style={styles.headButtonsContainer}>
        
             <View style={styles.iconContainer}>
             <Icon
                 name='navicon'
                 size={40}
                 color={Colors.lightTextColor}
                 onPress={() => navigation.navigate('BarcodeScanner')}
             />          
             </View>
        </View>
        ,        
        // headerRight: 
        //    <View style={styles.headButtonsContainer}>
        //         <View style={styles.iconContainer}>
        //         <Icon
        //             name='barcode'
        //             size={40}
        //             color={Colors.lightTextColor}
        //             onPress={() => navigation.navigate('BarcodeScanner')}
        //         />          
        //         </View>
        //         <View style={styles.iconContainer}>
        //         <Icon
        //             name='send'
        //             size={37}
        //             color={Colors.lightTextColor}
        //             onPress={() => navigation.navigate('NotifyOffice')}
                    
        //         />          
        //         </View>     
        //     </View>                  
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
    //this.props.navigation.navigate('ChatRequest',requestId )     
     (this.props.selectedItems.hasOwnProperty(requestId)) ? this.props.unSelectItemAction(requestId) : this.props.selectItemAction(requestId)
  }

  _handleShortPressRequest = (request) =>{  
    const requestId=request.id;
    //(this.props.selectedItems.hasOwnProperty(requestId)) ? this.props.unSelectItemAction(requestId) : this.props.selectItemAction(requestId)
  
    this.props.navigation.navigate('ChatStack',request )
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
 
  componentDidMount() {
      this.props.fetchRequestsAction(); //параметры забиру из store
      this.props.navigation.setParams({dispatch: this.dispatch });
      this.props.navigation.setParams({startRequestsStatusChangeAction: this.props.startRequestsStatusChangeAction });
  }
  

  render() {
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
                                style={{width: '100%'}}
                                date={filterDate}
                                mode="date"
                                placeholder="select date"
                                format="DD-MM-YYYY"
                                minDate="2010-10-01"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                
                                customStyles={{                                    
                                    dateIcon: {
                                        width: 0
                                    },
                                    dateInput: {
                                        borderWidth: 0,
                                    },
                                    dateText:{                                    
                                        fontSize:20,
                                        color: Colors.lightTextColor                                       
                                    }
                                }}
                                
                                onDateChange={(date) => this._handleFilterDateChange(date)}
                            />
                        </View>
                    </View>
                    
                    <View style={styles.filterItem}>
                        <Text  style={styles.filterLable} >Приемная: </Text>
                        <View  style={styles.pickerContainer}>
                            
                            
                            
                            <CustomPicker 
                                pickerText={"Выберите приемную:"} 
                                items={receptionItems} 
                                selectedItemId={this.props.filterReceptionId}
                                onSetValue={(receptionId, itemIndex) => this._handleReceptoionChange(receptionId)}                                
                                />                        
                           
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
                                requests={_.sortBy(items,['statusId','requestId']) } 
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
            <TotalRequestsContainer />            
        </View>     
       
    );
  }
}

const styles = StyleSheet.create({
    screenContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
       
    },

    headContainer:{
        marginTop: 5,
        height: '6%',
    },

    filtersContainer:{
        flexDirection:'row',        
        width: '100%',                
    },

    filterItem:{
        flexDirection: 'column',
        width: '47%',
        marginLeft: 2 ,
        marginRight: 2,        
    },

    listContainer:{        
        height: '80%',
        width:'100%',
        
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
        borderRadius: 3,
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
    },
     
});


