
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoaderState {
  visible: boolean;
}

const initialState: LoaderState = {
  visible: false,
};

const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    SHOW_LOADER: (state) => {
      state.visible = true;
    },
    HIDE_LOADER: (state) => {
      state.visible = false;
    },
    setLoaderVisibility: (state, action: PayloadAction<boolean>) => {
      state.visible = action.payload;
    },
  },
});

export const { SHOW_LOADER, HIDE_LOADER, setLoaderVisibility } = loaderSlice.actions;
export default loaderSlice.reducer;
