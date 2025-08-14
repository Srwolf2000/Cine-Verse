import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSearch } from "./searchApi";

export const fetchSearch = createAsyncThunk('search/fetchSearch',
    async ({keyword,languages}) => {
        const response = await getSearch(keyword,languages);
        return response.data.results;
        
    }
);


const searchSlice = createSlice({
    name: 'search',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        clearSearch(state) {
            state.items = [];
            state.status = 'idle';
            state.error = null;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchSearch.pending, state => {
                state.status = 'loading';
            })
            .addCase(fetchSearch.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchSearch.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message
            })
    }
})

export const { clearSearch } = searchSlice.actions;
export default searchSlice.reducer;