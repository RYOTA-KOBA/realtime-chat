import { db } from "../../firebase";
import { addUsernameAction, fetchChatsAction } from "./actions";
import { Dispatch } from "redux";
import { timestamp } from "../../firebase";

export const addMessage = (message: string, username: string) => {
  return async (): Promise<void> => {
    if (username) {
      await db.collection("chats").add({
        message: message,
        username: username,
        created_at: timestamp,
      });
    }
  };
};

export const addUsername = (username: string) => {
  return (dispatch: Dispatch): void => {
    if (username) {
      dispatch(
        addUsernameAction({
          id: "",
          username: username,
          message: "",
          created_at: Number(null),
        })
      );
    }
  };
};

export const fetchChats = () => {
  return async (dispatch: Dispatch): Promise<void> => {
    const chats: any = [];
    db.collection("chats")
      .orderBy("created_at")
      .onSnapshot((snapshots) => {
        snapshots.docChanges().forEach((change) => {
          const data = change.doc.data({ serverTimestamps: "estimate" });
          const changeType = change.type;

          switch (changeType) {
            case "added":
              chats.push({ ...data, id: change.doc.id });
              break;
            default:
              break;
          }
        });
        dispatch(fetchChatsAction(chats));
      });
  };
};
