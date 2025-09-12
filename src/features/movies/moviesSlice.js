import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPopularMovies, getUpcomingMovies, getTopRatedMovies } from './moviesApi'


export const fetchPopular = createAsyncThunk('movies/fetchPopular',
    async ({page,language}) => {
        const response = await getPopularMovies(page,language);
        return response.data.results;

    }
);

export const fetchUpcoming = createAsyncThunk('movies/fetchUpcoming',
    async ({page,language}) => {
        const response = await getUpcomingMovies(page,language);
        return response.data.results;
    }
);

export const fetchTopRatedMovies = createAsyncThunk('movies/fetchTopRatedMovies',
    async ({page,language}) => {
        const response = await getTopRatedMovies(page,language);
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
        topRatedMovies: {
            items: [],
            page: 1,
        },
        status: {
            popular: 'idle',
            upcoming: 'idle',
            topRatedMovies: 'idle',
        },
        error: {
            popular: null,
            upcoming: null,
            topRatedMovies: null,
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
        clearTopRatedMovies(state) {
            state.topRatedMovies = { items: [], page: 1 };
            state.status.topRatedMovies = 'idle';
            state.error.topRatedMovies = null;
        
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
            })

            //  TOP RATED
            .addCase(fetchTopRatedMovies.pending, state => {
                state.status.topRatedMovies = 'loading';
            })
            .addCase(fetchTopRatedMovies.fulfilled, (state, action) => {
                state.status.topRatedMovies = 'succeeded';
                state.topRatedMovies.items = [...state.topRatedMovies.items, ...action.payload];
                state.topRatedMovies.page = action.meta.arg;
            })
            .addCase(fetchTopRatedMovies.rejected, (state, action) => {
                state.status.topRatedMovies = 'failed';
                state.error.topRatedMovies = action.error.message;
            });
    }
});

export const { clearPopular, clearUpcoming, clearTopRatedMovies } = moviesSlice.actions;
export default moviesSlice.reducer;