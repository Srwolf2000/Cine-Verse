import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPopularTv, getOnTheAirTv, getTopTedRatedTv } from './showApi'


export const fetchPopularTv = createAsyncThunk('show/fetchPopularTv',
    async (page) => {
        const response = await getPopularTv(page);
        console.log('Popular Tv', response)
        return response.data.results;


    }
);

export const fetchOnTheAirTv = createAsyncThunk('show/fetchOnTheAirTv',
    async (page) => {
        const response = await getOnTheAirTv(page);
        console.log('On The Air tv', response)
        return response.data.results;
    }
);

export const fetchTopTedTv = createAsyncThunk('show/fetchTopTedTv',
    async (page) => {
        const response = await getTopTedRatedTv(page);
        console.log('Top Ted Tv', response)
        return response.data.results;
    }
);


const showSlice = createSlice({
    name: 'show',
    initialState: {
        popularTv: {
            items: [],
            page: 1,
        },
        onTheAirTv: {
            items: [],
            page: 1,
        },
        topTedTv: {
            items: [],
            page: 1,
        },
        status: {
            popularTv: 'idle',
            onTheAirTv: 'idle',
            topTedTv: 'idle',
        },
        error: {
            popularTv: null,
            onTheAirTv: null,
            topTedTv: null,
        }
    },
    reducers: {
        clearPopularTv(state) {
            state.popularTv = { items: [], page: 1 };
            state.status.popularTv = 'idle';
            state.error.popularTv = null;

        },
        clearOnTheAirTv(state) {
            state.onTheAirTv = { items: [], page: 1 };
            state.status.onTheAirTv = 'idle';
            state.error.onTheAirTv = null;

        },
        clearTopTedTv(state) {
            state.topTedTv = { items: [], page: 1 };
            state.status.topTedTv = 'idle';
            state.error.topTedTv = null;

        }
    },
    extraReducers: builder => {
        builder
            //  POPULAR TV
            .addCase(fetchPopularTv.pending, state => {
                state.status.popularTv = 'loading';
            })
            .addCase(fetchPopularTv.fulfilled, (state, action) => {
                state.status.popularTv = 'succeeded';
                state.popularTv.items = [...state.popularTv.items, ...action.payload];
                state.popularTv.page = action.meta.arg
              
            })
            .addCase(fetchPopularTv.rejected, (state, action) => {
                state.status.popularTv = 'failed';
                state.error.popularTv = action.error.message;

            })

            //  onTheAirTv
            .addCase(fetchOnTheAirTv.pending, state => {
                state.status.onTheAirTv = 'loading';
            })
            .addCase(fetchOnTheAirTv.fulfilled, (state, action) => {
                state.status.onTheAirTv = 'succeeded';
                state.onTheAirTv.items = [...state.onTheAirTv.items, ...action.payload];
                state.onTheAirTv.page = action.meta.arg;
                console.log('action', action)
            })
            .addCase(fetchOnTheAirTv.rejected, (state, action) => {
                state.status.onTheAirTv = 'failed';
                state.error.onTheAirTv = action.error.message;

            })

            //  TOP RATED
            .addCase(fetchTopTedTv.pending, state => {
                state.status.topTedTv = 'loading';
            })
            .addCase(fetchTopTedTv.fulfilled, (state, action) => {
                state.status.topTedTv = 'succeeded';
                state.topTedTv.items = [...state.topTedTv.items, ...action.payload];
                state.topTedTv.page = action.meta.arg;
                console.log('action', action)
            })
            .addCase(fetchTopTedTv.rejected, (state, action) => {
                state.status.topTedTv = 'failed';
                state.error.topTedTv = action.error.message;

            });
    }
});

export const { clearPopularTv, clearOnTheAirTv, clearTopTedTv } = showSlice.actions;
export default showSlice.reducer;