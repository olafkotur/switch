import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDialog } from '../typings/d';

export interface IInterfaceState {
  error: string;
  dialog: IDialog | null;
}

const initialState: IInterfaceState = {
  error: '',
  dialog: null,
};

export const interfaceSlice = createSlice({
  initialState,
  name: 'interface',
  reducers: {
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setDialog: (state, action: PayloadAction<IDialog | null>) => {
      state.dialog = action.payload;
    },
  },
});

export const { setError, setDialog } = interfaceSlice.actions;
export default interfaceSlice.reducer;
