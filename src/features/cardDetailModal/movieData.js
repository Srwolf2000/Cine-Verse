import { fetchDetailMovie, fetchDetailShow, fetchImagesShow, fetchImagesMovies, fetchCastMovie, fetchCastShow, fetchSimilarMovie, fetchSimilarShow } from "../../features/cardDetailModal/cardDetailSlice"
export const fetchAllMovieData = (id,language) => async (dispatch) => {
   
    await dispatch(fetchDetailMovie({id:id,language:language}));
    await dispatch(fetchImagesMovies({id:id,language:language}));
    await dispatch(fetchCastMovie({id:id,language:language}));
    await dispatch(fetchSimilarMovie({id:id,language:language}));
};

export const fetchAllShowData = (id,language) => async (dispatch) => {
    dispatch(fetchDetailShow({id:id,language:language}))
    dispatch(fetchImagesShow({id:id,language:language}))
    dispatch(fetchCastShow({id:id,language:language}))
    dispatch(fetchSimilarShow({id:id,language:language}))

}