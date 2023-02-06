import { createSlice } from "@reduxjs/toolkit";

const AdminSlice = createSlice({
    name: "admin",
    initialState: {
        Orders: []
    },
    reducers: {
        LoadOrdersSuccess: (state, actions) => {
            state.Orders = actions.payload
        }
    }
});
export const {
    LoadOrdersSuccess
} = AdminSlice.actions;

export default AdminSlice;