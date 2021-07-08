export const ADD_MESSAGE = "ADD_MESSAGE";
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const addMessageAction = (chatState) => {
  return {
    type: "ADD_MESSAGE",
    payload: {
      id: chatState.id,
      username: chatState.username,
      message: chatState.message,
      created_at: chatState.created_at,
    },
  };
};

export const ADD_USERNAME = "ADD_USERNAME";
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const addUsernameAction = (chatState) => {
  return {
    type: "ADD_USERNAME",
    payload: {
      id: "",
      username: chatState.username,
      message: "",
      created_at: "",
    },
  };
};
