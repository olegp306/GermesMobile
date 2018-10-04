import React, { Component } from 'react';
import { View, Text, FlatList ,StyleSheet } from 'react-native';
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

  render() {
    return (
      <View>
        <FlatList 
            data={this.getRequestArray()}
            renderItem={({item}) =>                           
                <RequestComponent
                    style={styles.listitem} 
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
                />
                
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