import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPopularMovies, getUpcomingMovies, getTopRatedMovies } from './moviesApi'


export const fetchPopular = createAsyncThunk('movies/fetchPopular',
    async () => {
        const response = await getPopularMovies();
        return response.data.results;
    }
);

export const fetchUpcoming = createAsyncThunk('movies/fetchUpcoming',
    async () => {
        const response = await getUpcomingMovies();
        return response.data.results;
    }
);

export const fetchTopTedMovies = createAsyncThunk('movies/fetchTopTedMovies',
    async () => {
        const response = await getTopRatedMovies();
        return response.data.results;
    }
);


const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        popular: [],
        upcoming: [],
        topTedMovies: [],
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
    extraReducers: builder => {
        builder
            //  POPULAR
            .addCase(fetchPopular.pending, state => {
                state.status.popular = 'loading';
            })
            .addCase(fetchPopular.fulfilled, (state, action) => {
                state.status.popular = 'succeeded';
                state.popular = action.payload;
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
                state.upcoming = action.payload;
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
                state.topTedMovies = action.payload;
            })
            .addCase(fetchTopTedMovies.rejected, (state, action) => {
                state.status.topTedMovies = 'failed';
                state.error.topTedMovies = action.error.message;
                console.log(action.error.message)
            });
    }
});
export default moviesSlice.reducer;