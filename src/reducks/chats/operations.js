import { db } from "../../firebase";
import { addUsernameAction } from "../chats/actions";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const addMessage = (message, username, created_at) => {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  return async () => {
    if (username) {
      await db.collection("chats").add({
        message: message,
        username: username,
        created_at: created_at,
      });
    }
  };
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const addUsername = (username) => {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  return (dispatch) => {
    if (username) {
      dispatch(
        addUsernameAction({
          id: "",
          username: username,
          message: "",
          created_at: null,
        })
      );
    }
  };
};
