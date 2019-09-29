import { combineReducers } from "redux";
import session from "./Session";
import chats from "../entities/chats/reducer";
import currentChat from "./currentChat";
import messages from "../entities/messages/reducer";
import unReadMessages from "../entities/unReadMessages/reducer";

import message from "../entities/message/reducer";
import chat from "../entities/chat/reducer";
import users from "../entities/users/reducer";
import chatUsers from "./chatUsers";
import usersListWithSelect from "./usersListWithSelect";
import chatApp from "./chatApp";
import newMessages from "./newMessages";
import chatsFilter from "./chatsFilter";



const root = combineReducers({
  session,
  chats,
  chat,
  users,
  chatUsers,
  usersListWithSelect,
  currentChat,
  messages,
  unReadMessages,
  message,
  chatApp,
  newMessages,
  chatsFilter
});

export default root;

