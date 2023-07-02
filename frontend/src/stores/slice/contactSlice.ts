import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { InputFormType } from "Type";

const contact: InputFormType = {
    name: "",
    email: "",
    content: "",
}

const contactSlice = createSlice({
    name: "contactSlice",
    initialState: contact,
    reducers: {
        setContact: (state, action:PayloadAction<InputFormType>) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.content = action.payload.content;
        },
        deleteContact: (state) => {
            state.name = "";
            state.email = "";
            state.content = "";
        }
    }
});

export const { setContact, deleteContact} = contactSlice.actions;
export default contactSlice.reducer;