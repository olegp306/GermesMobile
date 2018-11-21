
export const SELECT_ITEM = 'SELECT_ITEM'
export const SELECT_ITEM_BY_BARCODE = 'SELECT_ITEM_BY_BARCODE'
export const UNSELECT_ITEM = 'UNSELECT_ITEM'
export const CLEAR_SELECTED_ITEMS = 'CLEAN_SELECTED_ITEMS'


export const selectItem=(requestId)=> {
  return {
    type: 'SELECT_ITEM',
    payload: requestId
  }
} 

export const selectItemByBarcode=(barcode)=> {
  return {
    type: 'SELECT_ITEM_BY_BARCODE',
    payload: barcode
  }
} 

export const unSelectItem=(requestId)=> {
  return {
    type: 'UNSELECT_ITEM',
    payload: requestId
  }
} 

export const clearSelectedItems=()=> {
  return {
    type: 'CLEAR_SELECTED_ITEMS'     
  }
} 


  