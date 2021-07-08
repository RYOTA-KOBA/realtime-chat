export const ADD_MESSAGE = "ADD_MESSAGE";
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const addMessageAction = (chatState) => {
  return {
    type: "ADD_MESSAGE",
    payload: {
      id: chatState.id,
      username: chatState.username,
      created_at: chatState.created_at,
    },
  };
};
