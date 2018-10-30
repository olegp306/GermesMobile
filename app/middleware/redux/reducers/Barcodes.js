import {
  ADD_BARCODE,
  CLEAR_BARCODES 
 } from '../actions/Barcodes'

import { Map } from 'immutable';


const initialState = new Map({
  items:new Map({})
});

export function barcodesReducer(state = initialState, action){

  switch(action.type)
  {
    case ADD_BARCODE:    
      return state.mergeIn(['items',action.payload],{"codeText": action.payload,"scanDateTime": new Date() } )
      //return state.set([action.payload],  {"codeText": action.payload,"scanDateTime": new Date() });
      
    case CLEAR_BARCODES:    
      return state.clear();
      
    
      default:
      return state
  }
  
}

