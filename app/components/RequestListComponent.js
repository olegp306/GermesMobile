import React, { Component } from 'react';
import { View, Text, FlatList ,StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Images, Metrics } from '../theme';
import _ from 'lodash'


import RequestComponent from './RequestComponent';

const statusItems={
    
  95485390000 : {
      id:95485390000,
      text:"Cдана"
    },
    97670516000:
    {
        id:97670516000,
      text:"Приостановлена"
    },   

}

export default class RequestListComponent extends Component {

   _handleShortPress=(requestId)=>{    
    this.props.onShortPressRequest(requestId);
  }

  _handleLongPress=(requestId)=>{
    this.props.onLongPressRequest(requestId);
  }

  _handleOnChangeRequestCheckBox=(requestId)=>{
    this.props.onChangeRequestCheckBox(requestId)
  }

  _handleOnRefreshList=()=>{
    this.props.onRefreshList();
  }

  _isSelected=(request)=>{
    this.props.selectedItems[request.requestId] ? this.props.selectedItems[request.requestId].isSelected: false
  }
  _keyExtractor=(item,index) => item.requestId;
  
  //

  render() {
    const { isFetching, items, refreshing } = this.props.requests;
    return(
      <View>
        <FlatList 
            data={this.props.requests}
            keyExtractor={this._keyExtractor}

            refreshing={this.props.refreshing}
            onRefresh={this._handleOnRefreshList}
            
            renderItem={({item}) =>
            {
              const isSelected=this.props.selectedItems.items.hasOwnProperty(item.requestId);
              const isBarcodeExist=(this.props.barcodes.items.hasOwnProperty(item.receiptNumber) || this.props.barcodes.items.hasOwnProperty(item.incomingPacketId));
              const isUpdating=(this.props.selectedItems.items.hasOwnProperty(item.requestId) && this.props.selectedItems.items[item.requestId].isUpdating);
              const isChangeStatusSuccess=(this.props.selectedItems.items.hasOwnProperty(item.requestId) && this.props.selectedItems.items[item.requestId].updated==true )

              const isStatusPriostanovka=(item.statusId==statusItems["97670516000"].id )
              const errorText=(this.props.selectedItems.items.hasOwnProperty(item.requestId) && this.props.selectedItems.items[item.requestId].error ) ?   this.props.selectedItems.items[item.requestId].error : null;
              //const errorText=null;

              return (<RequestComponent
                        key={item.requestId}
                        requestId = {item.requestId}
                        requestNumber= {item.requestNumber} 
                        customerName={item.customerName}
                        transactionParticipant={item.transactionParticipant}
                        address={item.address}
                        docTypeNameName={item.docTypeNameName} 
                        receiptNumber={item.receiptNumber}
                        fromRegistrationPlanDate={item.fromRegistrationPlanDate}
                        notice={item.notice}

                        isSelected={isSelected}
                        isBarcodeExist={isBarcodeExist} 
                        isUpdating={isUpdating}    
                        isChangeStatusSuccess={isChangeStatusSuccess}
                        isStatusPriostanovka={isStatusPriostanovka}
                        errorText={errorText} 
                        
                        onShortPressRequest={ this._handleShortPress }
                        onLongPressRequest={ this._handleLongPress }
                        onChangeRequestCheckBox ={ this._handleOnChangeRequestCheckBox }   
                    />)
            }   
          }
          />
      </View>
     )
  }
}
