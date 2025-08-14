import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPopularTv, getOnTheAirTv, getTopRatedTv } from './showApi'


export const fetchPopularTv = createAsyncThunk('show/fetchPopularTv',
    async ({page,language}) => {
        const response = await getPopularTv(page,language);
        console.log('Popular Tv', response,'language',language) 
        return response.data.results;


    }
);

export const fetchOnTheAirTv = createAsyncThunk('show/fetchOnTheAirTv',
    async ({page,language}) => {
        const response = await getOnTheAirTv(page,language);
        console.log('On The Air tv', response)
        return response.data.results;
    }
);

export const fetchTopRatedTv = createAsyncThunk('show/fetchTopRatedTv',
    async ({page,language}) => {
        const response = await getTopRatedTv(page,language);
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
        topRatedTv: {
            items: [],
            page: 1,
        },
        status: {
            popularTv: 'idle',
            onTheAirTv: 'idle',
            topRatedTv: 'idle',
        },
        error: {
            popularTv: null,
            onTheAirTv: null,
            topRatedTv: null,
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
        clearTopRatedTv(state) {
            state.topRatedTv = { items: [], page: 1 };
            state.status.topRatedTv = 'idle';
            state.error.topRatedTv = null;

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
            .addCase(fetchTopRatedTv.pending, state => {
                state.status.toRatedTv = 'loading';
            })
            .addCase(fetchTopRatedTv.fulfilled, (state, action) => {
                state.status.topRatedTv = 'succeeded';
                state.topRatedTv.items = [...state.topRatedTv.items, ...action.payload];
                state.topRatedTv.page = action.meta.arg;
                console.log('action', action)
            })
            .addCase(fetchTopRatedTv.rejected, (state, action) => {
                state.status.topRatedTv = 'failed';
                state.error.topRatedTv = action.error.message;

            });
    }
});

export const { clearPopularTv, clearOnTheAirTv, clearTopRatedTv } = showSlice.actions;
export default showSlice.reducer;