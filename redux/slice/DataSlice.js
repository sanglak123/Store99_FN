import { createSlice } from "@reduxjs/toolkit";

const DataSlice = createSlice({
    name: "data",
    initialState: {
        Data: []
    },
    reducers: {
        LoadDataSuccess: (state, actions) => {
            state.Data = actions.payload
        }
    }
});
export const {
    LoadDataSuccess
} = DataSlice.actions;

export default DataSlice;