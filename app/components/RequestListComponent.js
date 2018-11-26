import React, { Component } from 'react';
import { View, Text, FlatList ,StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Images, Metrics } from '../theme';
import _ from 'lodash'


import RequestComponent from './RequestComponent';

export default class RequestListComponent extends Component {

  // getRequestArray=()=>{
  //   let requestsArray= new Array;
    
  //   for (let prop in this.props.requests)
  //   {
  //       let request=this.props.requests[prop];        
  //       requestsArray.push(this.props.requests[prop]);
  //   }
    
  //   return requestsArray;
  //  }

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
    console.log('RequestListComponent');
     return(
      <View>
        <FlatList 
            data={this.props.requests}
            keyExtractor={this._keyExtractor}

            refreshing={this.props.refreshing}
            onRefresh={this._handleOnRefreshList}
            
            renderItem={({item}) =>                                         
                    <RequestComponent
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

                        isSelected={this.props.selectedItems.items.hasOwnProperty(item.requestId)}
                        isBarcodeExist={this.props.barcodes.items.hasOwnProperty(item.receiptNumber)} 
                        isUpdating={this.props.selectedItems.items.hasOwnProperty(item.requestId) && this.props.selectedItems.items[item.requestId].isUpdating}     
                        
                        onShortPressRequest={ this._handleShortPress }
                        onLongPressRequest={ this._handleLongPress }
                        onChangeRequestCheckBox ={ this._handleOnChangeRequestCheckBox }   
                    />   
            }
          />
      </View>
     )
  }
}
