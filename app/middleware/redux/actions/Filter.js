export const SET_FILTER_DATE = 'SET_FILTER_DATE' // положили строку в константу
export const SET_RECEPTION = 'SET_RECEPTION'

export function setFilterDate(date) {
    return {
      type: 'SET_FILTER_DATE',
      payload: date,
    }
  }

 export function setReception(receptionId) {
    return {
      type: 'SET_RECEPTION',
      payload: receptionId,
    }
  } 
  