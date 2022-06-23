import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { defaultSettings } from '../services/settings'
import { IProfile, IUserSettings } from '../typings/user'

export interface IUserState {
  auth: boolean
  profile: IProfile
  settings: IUserSettings
}

const initialState: IUserState = {
  auth: false,
  profile: {
    username: '',
    avatar: null,
  },
  settings: defaultSettings,
}

export const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.auth = action.payload
    },

    setProfile: (state, action: PayloadAction<IProfile>) => {
      state.profile = action.payload
    },
    setSettings: (state, action: PayloadAction<IUserSettings>) => {
      state.settings = action.payload
    },
  },
})

export const { setAuth, setProfile, setSettings } = userSlice.actions
export default userSlice.reducer
