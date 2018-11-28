import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Picker ,Alert ,Button,TouchableOpacity,Keyboard} from 'react-native';
import { Colors, Images, Metrics } from '../theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-datepicker'

import RequestList from '../components/RequestListComponent';
import  TotalRequestsContainer   from '../containers/TotalRequestsContainer'
import Loader from '../components/Loader'

import { connect } from 'react-redux'

import { setFilterDate, setReception } from '../store/germes/filter/actions.js'
import { fetchRequests } from '../store/germes/requests/actions.js'
import { selectItem, unSelectItem, clearSelectedItems , startRequestsStatusChange} from '../store/germes/selectedItems/actions.js'
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
export default class NotifyOfficeScreen extends Component {
  // Ovveride базовый navigationOptions и дополнил кнопками в хедере
  static navigationOptions=({ navigation, navigationOptions })=>{
    const { params } = navigation.state;

    return {
        title: 'Уведомить офис',
        headerRight: 
           <View style={styles.headButtonsContainer}>                
                <View style={styles.iconContainer}>               
                </View>     
            </View>                  
            }
            
  }  

// функция сравнения для фильрации

compareRequests=(request1, request2) =>{
    const barcodes=this.props.barcodes;
    const barcode1=barcodes.items[request1.receiptNumber];
    const barcode2=barcodes.items[request2.receiptNumber];

    if(barcode1 && barcode2)
    {
        var dateA = new Date(barcode1.scanDateTime);
        var dateB = new Date(barcode2.scanDateTime);
        //return barcodes.items[request1.receiptNumber].scanDateTime - barcodes.items[request2.receiptNumber].scanDateTime;
        return  dateB - dateA;
    }

     if(barcode1 && barcode2==undefined)
    {
        return -1;
    }

     if(barcode1==undefined && barcode2)
    {
        return 1;
    }

     if(barcode1==undefined && barcode2==undefined)
    {
        return request1.requestId-request2.requestId;
    }


  }

    _handleOnClickUpdateStatus=()=>{
        Alert.alert(
            'Внимание',
            'Отправить данные о полученных документах ?  (тест)',
            [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'OK', onPress: () => {
                    console.log('OK Pressed');
                this.props.startRequestsStatusChangeAction()
                }},
            ],
            { cancelable: false }
        )       
    }
        
  
    _handleLongPressRequest = (requestId) =>{        
    (this.props.selectedItems.hasOwnProperty(requestId)) ? this.props.unSelectItemAction(requestId) : this.props.selectItemAction(requestId)
  }

  _handleShortPressRequest = (request) =>{    
    //this.props.navigation.navigate('AddComment',request )
  }
  
  _handleOnChangeRequestCheckBox = (requestId) =>{        
    (this.props.selectedItems.items.hasOwnProperty(requestId)) ? this.props.unSelectItemAction(requestId) : this.props.selectItemAction(requestId)
  }

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

  _handleOnRefreshList=()=>{
    this.props.fetchRequestsAction(); 
  }


  

  render() {
    const { isFetching ,items, isStatusChanging, refreshing }=this.props.requests;
    const { filterDate, filterReceptionId, selectedItems, barcodes }=this.props;
   
    return (
        <View style={styles.screenContainer}>
             <TotalRequestsContainer />
            <View style={styles.listContainer}>
                {/* <Loader message='Обновление заявок' isLoading={false}> */}
                <Loader message='Обновление заявок' isLoading={isFetching || isStatusChanging} >
                {
                    ((Object.keys(items).length==0 )  && !isFetching)
                        ?
                        (
                            <View style={styles.noDataLable}>
                                <Text>Нет данных </Text>
                                <Text>Попробуйте изменить фильтр поиска  </Text>                
                                <Text>( вернитесь назад на экран Заявок и измените фильтр поиска) </Text>                
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
            {/* <View style={styles.bottomContainer}>
                <Text style={styles.bottomLable}>Всего: { Object.keys(items).length} шт.</Text>                
                <View styles={styles.bottomRowContainer}>
                    <Text style={styles.bottomSmallLable}>C баркодами: { this._getNumberOfBarcodesMatches(barcodes.items,items)} шт.</Text>
                    <Text style={styles.bottomSmallLable}>Выделено: { this._getNumberOfMatches(selectedItems.items,items)} шт.</Text>
                </View>
            </View> */}
            <TouchableOpacity
                onPress={() => {
                                Keyboard.dismiss();
                                this._handleOnClickUpdateStatus();
                            }}
                >
                <View style={styles.bigButton}>
                    <Text style={styles.bigButtonText}>ПОЛУЧЕНА</Text>
                    <Text style={styles.bottomSmallLable}>Сменить статус у выделенных заявок</Text>
                </View>                        
            </TouchableOpacity>           
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
        borderColor:Colors.actionBackgroudColor
    },

    filterItem:{
        flexDirection: 'column',
        justifyContent: 'space-between'
    },

    listContainer:{        
        height: '85%',
        width:'98%',
        
    },

    bottomContainer:{
        height: '8%',
        width:'98%',
        flexDirection: 'row',
        // flex: -1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bottomRowContainer:{      
        flexDirection: 'column',  
        justifyContent: 'space-between',
        alignItems: 'center',        
    },        
        
    bottomLable:{
        color: Colors.baseColor,
        fontSize: 17
    },
    bottomSmallLable:{
        color: Colors.baseColor,
        fontSize: 13
    },
    horizontalDivider: {
        height: 15,
        borderWidth:1,
        borderColor : 'black'
    },
    pickerContainer:{
        height: 40,
        width: 175,
        borderRadius: 5,
        borderWidth: 1 ,
        backgroundColor: '#91d1ff' ,       
        borderColor: Colors.actionBackgroudColor,        
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
      sendButton:{
        backgroundColor: Colors.actionBackgroundColor,
      },
      bigButton:{

      }
      ,
      bigButton: {
        justifyContent: 'center',
        backgroundColor: '#53565A',
        minWidth: 245,
        minHeight: 45,
        borderRadius: 30
        },
        bigButtonText: {
            fontSize: 24,
            textAlign: 'center',
            color: 'white',
            margin: 5
        },

});


