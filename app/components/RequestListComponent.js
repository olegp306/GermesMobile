import React, { Component } from 'react';
import { View, Text, FlatList ,StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Images, Metrics } from '../theme';


import RequestComponent from './RequestComponent';

export default class RequestListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  getRequestArray=()=>{
    let requestsArray= new Array;
    
    for (let prop in this.props.requests)
    {
        let request=this.props.requests[prop];        
        requestsArray.push(this.props.requests[prop]);
    }
    
    return requestsArray;
   }

   _handleShortPress=(request)=>{    
    this.props.onShortPressRequest(request);
  }

  _handleLongPress=(request)=>{
    this.props.onLongPressRequest(request);
  }

  _isSelected=(request)=>{
    this.props.selectedItems[request.requestId] ? this.props.selectedItems[request.requestId].isSelected: false
  }

  render() {
      //console.log("list component" + (this.props.selectedItems["27684982560003"] ? this.props.selectedItems["2768498256000"].isSelected: false) );
      //console.log("list component2" + this.props.selectedItems["27684983150001"]==undefined ? this.props.selectedItems["27684983150001"]: false );
      //console.log("list component2" + this.props.selectedItems["27684983150001"]==undefined ? this.props.selectedItems["27684983150001"]: false );
      //27684983150001
    return (
      <View>
        <FlatList 
            data={this.getRequestArray()}
            renderItem={({item}) =>
                // <TouchableOpacity 
                // // onPress={this.onPress}
                // // onLongPress={e => this.props.onLongPressRequest(e.nativeEvent.text)}
                // >                         
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

                        isSelected={this.props.selectedItems[item.requestId] ? (this.props.selectedItems[item.requestId].isSelected): false}      
                        
                        onShortPressRequest={this._handleShortPress}
                        onLongPressRequest={ this._handleLongPress}    
                    />
                    // <Text>this.props.selectedItems[item.requestId] {this.props.selectedItems[item.requestId] }</Text>
                // </TouchableOpacity>  
            }
          />
      </View>
    );
  }
}
const styles = StyleSheet.create({   
    list:{
        backgroundColor: Colors.backgroundColor,        
    }   

    
});