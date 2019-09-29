import { call, put, select } from "redux-saga/effects";

import {
  add,
  isAdding,
  addSuccess,
  addFail
} from "../actions/usersListWithSelect";

import { changeNewMessage } from "../actions/newMessages";
import { add as addNewMessage } from "../entities/message/actions";
import { fetch as fetchChatUsers } from "../actions/chatUsers";

import api from "../../../api";
import {
  getCurrentUserId,
  getUsers,
  getCurrentChat,
  getSelectedUsers
} from "../../selectors";

function* addSelectesUsersToChatSaga() {
  const store = yield select();

  yield put(isAdding());

  try {
    const currentChat = getCurrentChat(store);
    const selectedUsers = getSelectedUsers(store);
    const users = getUsers(store);

    const requestAr = [];
    selectedUsers.keySeq().forEach(k => {
      if (selectedUsers.get(k) == true)
        requestAr.push({ chatId: currentChat.id, userId: k });
    });

    const response = yield call(api.addUsersToChat, requestAr);

    yield put(addSuccess(response.data));

    let userNamesToAdd = "";
    users.items.forEach(user => {
      if (selectedUsers.get(user.id) == true)
        userNamesToAdd = userNamesToAdd + user.name + ", \n";
    });

    const messageText = "в чат добавлены \n" + userNamesToAdd;
    
    yield put(
      changeNewMessage({
        type: 2768777882000,
        messageText: messageText,
        chatId: currentChat.id
      })
    );
    yield put(addNewMessage());

    yield put(fetchChatUsers());
  } catch (error) {
    yield put(addFail(error));
  }
}

export default addSelectesUsersToChatSaga;
