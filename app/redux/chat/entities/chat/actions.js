export const UPDATE_CHAT_REQUEST = "UPDATE_CHAT_REQUEST";
export const IS_UPDATING_CHAT = "IS_UPDATING_CHAT";
export const UPDATED_CHAT = "UPDATED_CHAT";
export const UPDATE_CHAT_FAILED = "UPDATE_FAILED";

export const ADD_CHAT_REQUEST = "ADD_CHAT_REQUEST";
export const IS_ADDING_CHAT = "IS_ADDING_CHAT";
export const ADDED_CHAT = "ADDED_CHAT";
export const ADDING_CHAT_FAILED = "ADDING_CHAT_FAILED";

export const REMOVE_CHAT_REQUEST = "REMOVE_CHAT_REQUEST";
export const IS_REMOVING_CHAT = "IS_REMOVING_CHAT";
export const REMOVED_CHAT = "REMOVED_CHAT";
export const REMOVING_CHAT_FAILED = "REMOVING_CHAT_FAILED";

export const update = chat => {
  return {
    type: UPDATE_CHAT_REQUEST,
    payload: chat
  };
};

export const isUpdating = isUpdated => {
  return {
    type: IS_UPDATING_CHAT,
    payload: isUpdating
  };
};

export const updated = () => {
  return {
    type: UPDATED_CHAT
  };
};

export const updateFailed = error => {
  return {
    type: UPDATE_CHAT_FAILED,
    payload: error
  };
};

export const add = chat => {
  return {
    type: ADD_CHAT_REQUEST,
    payload: chat
  };
};

export const isAdding = isAdding => {
  return {
    type: IS_ADDING_CHAT,
    payload: isAdding
  };
};

export const added = () => {
  return {
    type: ADDED_CHAT
  };
};

export const addingFailed = error => {
  return {
    type: ADDING_CHAT_FAILED,
    payload: error
  };
};

export const remove = driver => {
  return {
    type: REMOVE_CHAT_REQUEST,
    payload: driver
  };
};

export const isRemoving = payload => {
  return {
    type: IS_REMOVING_CHAT,
    payload: payload
  };
};

export const removed = () => {
  return {
    type: REMOVED_CHAT
  };
};

export const removingFailed = error => {
  return {
    type: REMOVING_CHAT_FAILED,
    payload: error
  };
};