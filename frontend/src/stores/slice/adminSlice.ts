import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type adminSliceType = {
  id: string | null;
};

const admin: adminSliceType = {
  id: null,
};

const adminSlice = createSlice({
  name: "adminSlice",
  initialState: admin,
  reducers: {
    setAdmin: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    deleteAdmin: (state, action: PayloadAction<null>) => {
      state.id = action.payload;
    },
  },
});

export const { setAdmin, deleteAdmin } = adminSlice.actions;
export default adminSlice.reducer;
