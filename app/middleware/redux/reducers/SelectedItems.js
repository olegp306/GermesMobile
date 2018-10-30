import {
  SELECT_ITEM,
  SELECT_ITEM_BY_BARCODE,
  UNSELECT_ITEM,
  CLEAR_SELECTED_ITEMS,
  ADD_SELECTED_ITEM,
  TOGGLE_SELECTED_ITEM  
 } from '../actions/SelectedItems'

import { Map } from 'immutable';


const initialState = new Map({
  selectedItems:{}  
});

// _getRequestIdByBarcode=(barcode)=>{
//   state.requests.forEach((item, i, arr) => {
//     let barcodeRequestId=(-1);
//     if(item.receiptNumber==barcode)
//     {
//       barcodeRequestId=item.requestId;
//       break;
//     }       
//   });
//   return barcodeRequestId;
// }

export function selectedItemsReducer(state = initialState, action){
  console.log('selectedItemsReducer');
  switch(action.type)
  {
    case SELECT_ITEM:
      return state.merge({[action.payload]:{"requestId": action.payload}})

    case SELECT_ITEM_BY_BARCODE: 
      return state.merge   
    //  return  (this._getRequestIdByBarcode(acrion.payload)=(-1) ? state : state.merge({[action.payload]:{"requestId": action.payload}}))
      
    case UNSELECT_ITEM:    
      return state.delete(action.payload);

    case CLEAR_SELECTED_ITEMS:
      return state.clear();
      
    
      default:
      return state
  }
  
}

