//Redux Toolkit
import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import AdminSlice from "./slice/AdminSlice";
import DataSlice from "./slice/DataSlice";
import StoreSlice from "./slice/StoreSlice";

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
};

const rootReducer = combineReducers({
    DataSlice: DataSlice.reducer,
    StoreSlice: StoreSlice.reducer,
    AdminSlice: AdminSlice.reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const Store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export let persistor = persistStore(Store);