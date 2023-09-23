import { createSlice } from '@reduxjs/toolkit';
import { LayoutState } from '@/store/types/layout';
import type { RootState } from '@/store';

const initialState: LayoutState = {
  sideBarOpen: false,
};

export const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sideBarOpen = !state.sideBarOpen;
    },
  },
});

export const { toggleSidebar } = layoutSlice.actions;

export const getSideBarState = (state: RootState) => state.layout.sideBarOpen;

export default layoutSlice.reducer;
