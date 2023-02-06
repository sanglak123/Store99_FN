import { createSlice } from "@reduxjs/toolkit";

const StoreSlice = createSlice({
    name: "store",
    initialState: {
        Store: []
    },
    reducers: {
        ChoosePhoneSuccess: (state, actions) => {
            const index = state.Store.findIndex(item => item.phone.id === actions.payload.phone.id);
            if (index >= 0) {
                return;
            } else {
                state.Store = [...state.Store, actions.payload]
            }
        },
        AddPhoneSuccess: (state, actions) => {
            const index = state.Store.findIndex(item => item.phone.id === actions.payload.phone.id);
            if (index >= 0) {
                state.Store[index].count += 1;
            }
        },
        SubtractionPhoneSuccess: (state, actions) => {
            const index = state.Store.findIndex(item => item.phone.id === actions.payload.phone.id);
            if (index >= 0) {
                if (state.Store[index].count > 1) {
                    state.Store[index].count -= 1;
                } else {
                    state.Store.splice(index, 1);
                }
            }
        },
    }
});
export const {
    ChoosePhoneSuccess,
    AddPhoneSuccess,
    SubtractionPhoneSuccess
} = StoreSlice.actions;

export default StoreSlice;


