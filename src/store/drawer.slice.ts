import { createSlice } from '@reduxjs/toolkit';
import { DrawerState } from '@/types/drawer';
import type { RootState } from '@/store';

const initialState: DrawerState = {
  productListOpen: false,
};

export const drawerSlice = createSlice({
  name: 'TOGGLE_DRAWER',
  initialState,
  reducers: {
    toggleDrawer: (state) => {
      state.productListOpen = !state.productListOpen;
    },
  },
});

export const { toggleDrawer } = drawerSlice.actions;

export const getDrawerState = (state: RootState) => state.drawer.productListOpen;

export default drawerSlice.reducer;
