import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ImageState {
  name_img: string;
}

const initialState: ImageState = {
  name_img: "",
};

export const imageSlice = createSlice({
  name: "image_data",
  initialState,
  reducers: {
    saveImageName: (state, props) => {
      state.name_img = props.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveImageName } = imageSlice.actions;

export default imageSlice.reducer;
