
export const ADD_BARCODE = 'ADD_BARCODE'
export const CLEAR_BARCODES = 'CLEAN_BARCODES'


export const addBarcode=(barcode)=> {
  return {
    type: 'ADD_BARCODE',
    payload: barcode
  }
} 

export const clearBarcodes=()=> {
  return {
    type: 'CLEAR_BARCODES'     
  }
} 


  