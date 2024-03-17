import { configureStore } from "@reduxjs/toolkit";
import { api } from "./features/api";


export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
    },
    devTools: process.env.NODE_ENV==="production",
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
})