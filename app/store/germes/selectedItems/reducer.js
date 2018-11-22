import {
  SELECT_ITEM,
  SELECT_ITEM_BY_BARCODE,
  UNSELECT_ITEM,
  CLEAR_SELECTED_ITEMS,
  
  CHANGE_ITEM_STATUS,
  CHANGE_ITEM_STATUS_SUCCESS,
  CHANGE_ITEM_STATUS_ERROR
 } from './actions.js'

import { Map } from 'immutable';


const initialState =new Map({
  items:new Map({})         
});


export function selectedItemsReducer(state = initialState, action){
  console.log('selectedItemsReducer');
  switch(action.type)
  {
    case SELECT_ITEM:
      return state.mergeIn(['items',action.payload],{"requestId": action.payload,"isUpdating": false, error: null } )  
      //return state.merge({[action.payload]:{"requestId": action.payload}})

    case SELECT_ITEM_BY_BARCODE: 
      return state.merge   
    //  return  (this._getRequestIdByBarcode(acrion.payload)=(-1) ? state : state.merge({[action.payload]:{"requestId": action.payload}}))
      
    case UNSELECT_ITEM:    
      return state.deleteIn(['items',action.payload],{"requestId": action.payload});

    case CLEAR_SELECTED_ITEMS:
      return state.clear();

    
    case CHANGE_ITEM_STATUS:
      return state.mergeIn(['items',action.payload],{"isUpdating": true })

    case CHANGE_ITEM_STATUS_SUCCESS:
      return state.mergeIn(['items',action.payload],{"isUpdating": true, error: null })    

    case CHANGE_ITEM_STATUS_ERROR:
      return state.mergeIn(['items', action.requestId],{"isUpdating": false, error: action.payload.message })    

      
    
      default:
      return state
  }
  
}

