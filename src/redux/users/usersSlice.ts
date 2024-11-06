import { ActionReducerMapBuilder, createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserData = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: 'male' | 'female';
  age: number;
};

export type UserState = {
  loading: boolean;
  error: Error | null | unknown;
  usersData: UserData[] | null;
  success: boolean;
};

const initialState: UserState = {
  loading: true,
  error: null,
  usersData: null,
  success: false,
};

const handlePending = (state: UserState) => {
  state.loading = true;
  state.error = null;
};

const handleFulfilled = (state: UserState, action: PayloadAction<UserData[]>) => {
  state.loading = false;
  state.success = true;
  state.usersData = action.payload;
};

const handleRejected = (state: UserState, action: PayloadAction<string | undefined>) => {
  state.loading = false;
  state.error = action.payload || 'Unknown error';
  state.success = false;
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    resetUserState: (state) => {
      state.usersData = null;
      state.success = false;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<UserState>) => {
  },
});

// Action creators are generated for each case reducer function
export const { resetUserState } = userSlice.actions;

export default userSlice.reducer;
