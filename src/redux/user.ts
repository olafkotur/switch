import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserSettings } from '../typings/d';

export interface IUserState {
  auth: boolean;
  email: string;
  avatar: any;
  settings: IUserSettings;
}

const initialState: IUserState = {
  auth: false,
  email: '',
  avatar: require('../../assets/default-avatar.png'),
  settings: {
    overlayMode: true,
    modifiedAgent: true,
    visiblityKeybind: 'CommandOrControl + Esc',
    warningMessages: true,
    windowBehaviour: 'external',
    accentColor: '#227093',
    animatePresets: true,
    windowPadding: false,
    fontFamily: 'Arial',
  },
};

export const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.auth = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setAvatar: (state, action: PayloadAction<any>) => {
      state.avatar = action.payload;
    },
    setSettings: (state, action: PayloadAction<IUserSettings>) => {
      state.settings = action.payload;
    },
  },
});

export const { setAuth, setEmail, setAvatar, setSettings } = userSlice.actions;
export default userSlice.reducer;
