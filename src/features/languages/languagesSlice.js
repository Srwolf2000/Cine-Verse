import { createSlice } from "@reduxjs/toolkit";


const languagesSlice = createSlice({
    name: 'languages',
    initialState:{
        language:{
            en:true,
            es:false,
        },
        key:{
            en: 'en-US',
            es: 'es-ES',
        }
    },
    reducers:{
        languageIsEn: (state) => {
            state.language.en = true;
            state.language.es = false;
            console.log('Language set to English');
        },
        languageIsEs: (state) => {
            state.language.en = false;
            state.language.es = true;
            console.log('Language set to Spanish');
        }
    }
})

export const { languageIsEn,languageIsEs } = languagesSlice.actions;
export default languagesSlice.reducer;