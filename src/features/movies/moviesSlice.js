import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPopularMovies, getUpcomingMovies, getTopRatedMovies } from './moviesApi'


export const fetchPopular = createAsyncThunk('movies/fetchPopular',
    async (page) => {
        const response = await getPopularMovies(page);
        return response.data.results;

    }
);

export const fetchUpcoming = createAsyncThunk('movies/fetchUpcoming',
    async (page) => {
        const response = await getUpcomingMovies(page);
        return response.data.results;
    }
);

export const fetchTopTedMovies = createAsyncThunk('movies/fetchTopTedMovies',
    async (page) => {
        const response = await getTopRatedMovies(page);
        return response.data.results;
    }
);


const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        popular: {
            items: [],
            page: 1,
        },
        upcoming: {
            items: [],
            page: 1,
        },
        topTedMovies: {
            items: [],
            page: 1,
        },
        status: {
            popular: 'idle',
            upcoming: 'idle',
            topTedMovies: 'idle',
        },
        error: {
            popular: null,
            upcoming: null,
            topTedMovies: null,
        }
    },
    reducers: {
        clearPopular(state) {
            state.popular = { items: [], page: 1 };
            state.status.popular = 'idle';
            state.error.popular = null;
        },
        clearUpcoming(state) {
            state.upcoming ={ items: [], page: 1 };
            state.status.upcoming = 'idle';
            state.error.upcoming = null;
        },
        clearTopTedMovies(state) {
            state.topTedMovies = { items: [], page: 1 };
            state.status.topTedMovies = 'idle';
            state.error.topTedMovies = null;
        }
    },
    extraReducers: builder => {
        builder
            //  POPULAR
            .addCase(fetchPopular.pending, state => {
                state.status.popular = 'loading';
            })
            .addCase(fetchPopular.fulfilled, (state, action) => {
                state.status.popular = 'succeeded';
                state.popular.items = [...state.popular.items, ...action.payload];
                state.popular.page = action.meta.arg
            })
            .addCase(fetchPopular.rejected, (state, action) => {
                state.status.popular = 'failed';
                state.error.popular = action.error.message;

            })

            //  UPCOMING
            .addCase(fetchUpcoming.pending, state => {
                state.status.upcoming = 'loading';
            })
            .addCase(fetchUpcoming.fulfilled, (state, action) => {
                state.status.upcoming = 'succeeded';
                state.upcoming.items = [...state.upcoming.items, ...action.payload];
                state.upcoming.page = action.meta.arg;
            })
            .addCase(fetchUpcoming.rejected, (state, action) => {
                state.status.upcoming = 'failed';
                state.error.upcoming = action.error.message;
                console.log(action.error.message)
            })

            //  TOP RATED
            .addCase(fetchTopTedMovies.pending, state => {
                state.status.topTedMovies = 'loading';
            })
            .addCase(fetchTopTedMovies.fulfilled, (state, action) => {
                state.status.topTedMovies = 'succeeded';
                state.topTedMovies.items = [...state.topTedMovies.items, ...action.payload];
                state.topTedMovies.page = action.meta.arg;
            })
            .addCase(fetchTopTedMovies.rejected, (state, action) => {
                state.status.topTedMovies = 'failed';
                state.error.topTedMovies = action.error.message;
                console.log(action.error.message)
            });
    }
});

export const { clearPopular, clearUpcoming, clearTopTedMovies } = moviesSlice.actions;
export default moviesSlice.reducer;