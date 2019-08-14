export const SELECT_ITEM = "SELECT_ITEM";
export const SELECT_ITEM_BY_BARCODE = "SELECT_ITEM_BY_BARCODE";
export const UNSELECT_ITEM = "UNSELECT_ITEM";
export const CLEAR_SELECTED_ITEMS = "CLEAN_SELECTED_ITEMS";

export const CHANGE_ITEM_STATUS = "CHANGE_ITEM_STATUS";
export const CHANGE_ITEM_STATUS_SUCCESS = "CHANGE_ITEM_STATUS_SUCCESS";
export const CHANGE_ITEM_STATUS_ERROR = "CHANGE_ITEM_STATUS_ERROR";

import _keyBy from "lodash";
import api from "../../../middleware/api";

export const selectItem = requestId => {
  return {
    type: "SELECT_ITEM",
    payload: requestId
  };
};

export const selectItemByBarcode = barcode => {
  return {
    type: "SELECT_ITEM_BY_BARCODE",
    payload: barcode
  };
};

export const unSelectItem = requestId => {
  return {
    type: "UNSELECT_ITEM",
    payload: requestId
  };
};

export const clearSelectedItems = () => {
  return {
    type: "CLEAR_SELECTED_ITEMS"
  };
};

////////////////////////// CHANGE STATUS
export const startRequestsStatusChange = () => {
  return (dispatch, getState) => {
    //getState можно получить данные из STORE

    const { selectedItems, requests } = getState();
    //filter.get('filterDate')
    //let test = selectedItems.get("items").toJS();
    const requestsItems = requests.get("items").toJS();

    for (key in selectedItems.get("items").toJS()) {
      let requestId = key;
      if (requestsItems[requestId]) {
        dispatch(changeItemStatus(requestId));

        api
          .changeRequestStatus(requestId)
          .then(data => {
            dispatch(unSelectItem(requestId));
            //dispatch(changeItemStatusSuccess(requestId));
          })
          .catch(error => dispatch(changeItemStatusError(error, requestId)));
      }
    }
  };
};

export const changeItemStatus = requestId => {
  return {
    type: "CHANGE_ITEM_STATUS",
    payload: requestId
  };
};

export const changeItemStatusSuccess = requestId => {
  return {
    type: "CHANGE_ITEM_STATUS_SUCCESS",
    payload: requestId
  };
};

export const changeItemStatusError = (error, requestId) => {
  return {
    type: "CHANGE_ITEM_STATUS_ERROR",
    payload: error,
    requestId: requestId
  };
};
