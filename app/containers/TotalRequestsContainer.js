import React, { Component } from 'react';
import TotalRequestsComponent from "../components/TotalRequestsComponent"
 
import { connect } from 'react-redux'
 

 const mapStateToProps = store => {   
  return {
      requests: store.requests.toJS(),
      selectedItems: store.selectedItems.toJS(),
      barcodes: store.barcodes.toJS()
  }
}
const mapDispatchToProps = dispatch =>{
  return {  }
} 

@connect( mapStateToProps, mapDispatchToProps )
 export default class TotalRequestsContainer extends Component {
   constructor(props) {
     super(props);
     this.state = {
     };
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
            const requestId=array2[key2].receiptNumber;
            const requestIncomingPacketId=array2[key2].incomingPacketId;
            if(key==requestId || key==requestIncomingPacketId)
            {
                amount++;
                break;
            }
        }  
    }
    return amount;
  }
 
   render() {    
    const { requests, selectedItems, barcodes }=this.props;
    const withBarcodesAmount=this._getNumberOfBarcodesMatches(barcodes.items,requests.items);
    const selectedAmount=this._getNumberOfMatches(selectedItems.items,requests.items);
    const totalRequestAmount =Object.keys(requests.items).length;
     return (
         <TotalRequestsComponent 
            mode={"basic"}
            withBarcodesAmount={withBarcodesAmount }
            selectedAmount={selectedAmount}
            totalRequestAmount={totalRequestAmount}
        /> 
     );
   }
 }
 
