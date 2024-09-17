import { configureStore } from "@reduxjs/toolkit";
import cardReducer from "./Features/cardSlice";
import detailReducer from "./Features/detailSlice";


export default configureStore({
    reducer: {
        // card: cardReducer,
        // detail: detailReducer,
    },
})