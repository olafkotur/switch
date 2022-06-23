import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IDialog } from '../typings/d'
import { IApplicationData } from '../typings/data'

export interface IInterfaceState {
  error: string
  dialog: IDialog | null
  applications: IApplicationData[]
}

const initialState: IInterfaceState = {
  error: '',
  dialog: null,
  applications: [],
}

export const interfaceSlice = createSlice({
  initialState,
  name: 'interface',
  reducers: {
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
    setDialog: (state, action: PayloadAction<IDialog | null>) => {
      state.dialog = action.payload
    },
    setApplications: (state, action: PayloadAction<IApplicationData[]>) => {
      state.applications = action.payload
    },
  },
})

export const { setError, setDialog, setApplications } = interfaceSlice.actions
export default interfaceSlice.reducer
