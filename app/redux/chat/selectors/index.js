export const getSession = store => store.session.toJS();

export const getCurrentUserId = store => store.session.get("userId");

export const getContractorId = store => store.session.get("contractorId");

export const getCurrentChat = store => store.chatApp.get("currentChat");

export const getUsers = store => store.users.toJS();

export const getChatUsers = store => store.chatUsers.toJS();

export const getSelectedUsers = store =>
  store.usersListWithSelect.get("selectedUsers");

export const getUsersListFilter = store =>
  store.usersListWithSelect.get("filter");

export const getMessages = store => store.messages.toJS();
export const getChats = store => store.chats.toJS();

export const getUnreadMessages=store=>store.unReadMessages.toJS();

export const getChatApp = store => store.chatApp.toJS();
export const getNewMessages = store => store.newMessages.toJS();

export const getChatsFilter = store => store.chatsFilter.get("filter");
