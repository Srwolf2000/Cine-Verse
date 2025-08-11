import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDetailMovie, getDetailShow, getImagesMovie, getImagesShow, getCastMovie, getCastShow,getSimilarMovie,getSimilarShow } from "./cardDetailApi";



export const fetchDetailMovie = createAsyncThunk('cardDetailModal/fetchDetailMovie',
    async (id) => {
        const response = await getDetailMovie(id);

        return response.data;

    }
);

export const fetchDetailShow = createAsyncThunk('cardDetailModal/fetchShowDetail',
    async (id) => {
        const response = await getDetailShow(id);
        return response.data;
    }
)

export const fetchImagesMovies = createAsyncThunk('cardDetailModal/fetchImagesMovies',
    async (id) => {
        const response = await getImagesMovie(id);

        return response.data;

    }
);

export const fetchImagesShow = createAsyncThunk('cardDetailModal/fetchImagesShow',
    async (id) => {
        const response = await getImagesShow(id);
        return response.data;
    }
);

export const fetchCastMovie = createAsyncThunk('cardDetailModal/fetchCastMovie',
    async (id) => {
        const response = await getCastMovie(id);
        return response.data
    }
);

export const fetchCastShow = createAsyncThunk('cardDetailModal/fetchCastShow',
    async (id) => {
        const response = await getCastShow(id);
        return response.data
    }
);

export const fetchSimilarMovie = createAsyncThunk('cardDetailModal/fetchSimilarMovie',
    async (id) => {
        const response = await getSimilarMovie(id);
        return response.data.results    
    }
)

export const fetchSimilarShow = createAsyncThunk('cardDetailModal/fetchSimilarShow',
    async (id) => {
        const response = await getSimilarShow(id);
        return response.data.results
    }
)




const cardDetailSlice = createSlice({
    name: 'cardDetailModal',
    initialState: {
        isOpen: false,
        items: {
            item: [],
            status: 'idle'
        },
        images: {
            image: [],
            status: 'idle'
        },
        cast: {
            people: [],
            status: 'idle'
        },
        similar:{
            items:[],
            status: 'idle'
        },
        errorItems: null,
        errorImages: null,
        errorCast: null,
        errorSimilar: null

    },
    reducers: {
        closeModal: (state) => {
            state.isOpen = false;
                state.items.item = [];
                state.items.status = 'idle';
            state.images.image = [];
                state.images.status = 'idle';
            state.cast.people = [];
                state.cast.status = 'idle';
            state.errorItems = null;
                state.errorImages = null;
                state.errorCast = null
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchDetailMovie.pending, state => {
                state.items.status = 'loading '
            })
            .addCase(fetchDetailMovie.fulfilled, (state, action) => {
                state.items.status = 'succeeded ',
                    state.isOpen = true,
                    state.items.item = action.payload

            })
            .addCase(fetchDetailMovie.rejected, (state, action) => {
                state.items.status = 'failed ',
                    state.errorItems = action.error.message
            })



            .addCase(fetchDetailShow.pending, state => {
                state.items.status = 'loading '
            })
            .addCase(fetchDetailShow.fulfilled, (state, action) => {
                state.items.status = 'succeeded ',
                    state.isOpen = true,
                    state.items.item = action.payload
            })
            .addCase(fetchDetailShow.rejected, (state, action) => {
                state.items.status = 'failed ',
                    state.errorItems = action.error.message
            })



            .addCase(fetchImagesMovies.pending, state => {
                state.images.status = 'loading '
            })
            .addCase(fetchImagesMovies.fulfilled, (state, action) => {
                state.images.status = 'succeeded ',
                    state.images.image = action.payload

            })
            .addCase(fetchImagesMovies.rejected, (state, action) => {
                state.images.status = 'failed ',
                    state.errorImages = action.error.message
            })



            .addCase(fetchImagesShow.pending, state => {
                state.images.status = 'loading '
            })
            .addCase(fetchImagesShow.fulfilled, (state, action) => {
                state.images.status = 'succeeded ',
                    state.images.image = action.payload

            })
            .addCase(fetchImagesShow.rejected, (state, action) => {
                state.images.status = 'failed ',
                    state.errorImages = action.error.message
            })


            .addCase(fetchCastMovie.pending, state => {
                state.cast.status = 'loading '
            })
            .addCase(fetchCastMovie.fulfilled, (state, action) => {
                state.cast.status = 'succeeded ',
                    state.cast.people = action.payload

            })
            .addCase(fetchCastMovie.rejected, (state, action) => {
                state.cast.status = 'failed ',
                    state.errorCast = action.error.message
            })
            

            .addCase(fetchCastShow.pending, state => {
                state.cast.status = 'loading '
            })
            .addCase(fetchCastShow.fulfilled, (state, action) => {
                state.cast.status = 'succeeded ',
                    state.cast.people = action.payload

            })
            .addCase(fetchCastShow.rejected, (state, action) => {
                state.cast.status = 'failed ',
                    state.errorCast = action.error.message
            })



            .addCase(fetchSimilarMovie.pending, state => {
                state.similar.status = 'loading '
            })
            .addCase(fetchSimilarMovie.fulfilled, (state, action) => {
                state.similar.status = 'succeeded ',
                    state.similar.items = action.payload
                    console.log('similar movie fetched', action.payload)

            })
            .addCase(fetchSimilarMovie.rejected, (state, action) => {
                state.similar.status = 'failed ',
                    state.errorSimilar = action.error.message
            })


            .addCase(fetchSimilarShow.pending, state => {
                state.similar.status = 'loading '
            })
            .addCase(fetchSimilarShow.fulfilled, (state, action) => {
                state.similar.status = 'succeeded ',
                    state.similar.items = action.payload

            })
            .addCase(fetchSimilarShow.rejected, (state, action) => {
                state.similar.status = 'failed ',
                    state.errorSimilar = action.error.message
            })
    }
});
export const {  closeModal } = cardDetailSlice.actions
export default cardDetailSlice.reducer



