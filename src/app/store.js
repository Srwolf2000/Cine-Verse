import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "../features/movies/moviesSlice";
import searchReducer from "../features/search/searchSlice";
import showReducer from "../features/show/showSlice"
import  cardDetailReducer from "../features/cardDetailModal/cardDetailSlice"
import languagesReducer from "../features/languages/languagesSlice";
import authLoginReducer from  "../features/auth/authLoginSlice"

export const store = configureStore({
    reducer: {
        movies          : moviesReducer,
        search          : searchReducer,
        show            : showReducer,
        cardDetailModal : cardDetailReducer,
        languages       : languagesReducer,
        authLogin       : authLoginReducer

    },
});