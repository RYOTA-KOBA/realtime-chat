import { addMessageAction } from "./actions";
// import { db, timestamp } from "../../firebase";

export const addMessage = () => {
  return async (dispatch, getState) => {
    const state = getState();
    const message = state.chats.message;
    // const username = state.chats.username;
    const created_at = state.chats.created_at;

    const url = "https://api.github.com/users/RYOTA-KOBA";

    const response = await fetch(url)
      .then((res) => res.json())
      .catch(() => null);

    const username = response.login;

    dispatch(
      addMessageAction({
        id: "a1b1c1",
        username: username,
        message: "thunkのテスト",
        created_at: 12345,
      })
    );
  };
};
