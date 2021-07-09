import { db } from "../../firebase";
import { addUsernameAction, fetchChatsAcrion } from "../chats/actions";

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

export const fetchChats = () => {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  return async (dispatch) => {
    let chats: any = [];
    db.collection("chats")
      .orderBy("created_at")
      .onSnapshot((snapshots) => {
        snapshots.docChanges().forEach((change) => {
          const data = change.doc.data({ serverTimestamps: "estimate" });
          const changeType = change.type;

          switch (changeType) {
            case "added":
              chats.push({ ...data, id: change.doc.id });
              // setIsMessageCreated(true);
              break;
            case "removed":
              chats = chats.filter((chat) => chat.id !== change.doc.id);
              break;
            default:
              break;
          }
        });
        dispatch(fetchChatsAcrion(chats));
        // setIsMessageCreated(false);
      });
  };
};
