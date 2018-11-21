import { 
  SET_FILTER_DATE,
  SET_RECEPTION
 } from './actions'

import { Map } from 'immutable';

Date.prototype.formatYYYYMMDD = function(){
  return this.getDate() + 
  "." +  (this.getMonth() + 1) +
  "." +  this.getFullYear();
}

const initialState = new Map({
  filterDate: new Date().formatYYYYMMDD(),
  filterReceptionId: "123906749000",
  
});

export function filterReducer(state = initialState, action){
  //console.log('filterReducer');
  switch(action.type)
  {
    case SET_FILTER_DATE:    
      return state.set('filterDate', action.payload)
      
    case SET_RECEPTION:    
      return state.set('filterReceptionId', action.payload)
      
    
      default:
      return state
  }
  
}

