import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = {
  user: {
    login: false,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      if (state.user.login) {
        state.user.login = true;
      } else {
        state.user.login = false;
      }
    },
  },
});

export const { setUser } = userSlice.actions;

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});
