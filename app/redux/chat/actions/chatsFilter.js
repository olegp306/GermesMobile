export const SET_CHATST_FILTER = "SET_CHATST_FILTER";
export const RESET_CHATS_FILTER = "RESET_CHATS_FILTER";

export function setChatsFilter(payload) {
  return {
    type: SET_CHATST_FILTER,
    payload
  };
}

export function resetChatsFilter() {
  return {
    type: RESET_CHATS_FILTER
  };
}

