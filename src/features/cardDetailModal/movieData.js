import { fetchDetailMovie, fetchDetailShow, fetchImagesShow, fetchImagesMovies, fetchCastMovie, fetchCastShow, fetchSimilarMovie, fetchSimilarShow } from "../../features/cardDetailModal/cardDetailSlice"
export const fetchAllMovieData = (id) => async (dispatch) => {
    await dispatch(fetchDetailMovie(id));
    await dispatch(fetchImagesMovies(id));
    await dispatch(fetchCastMovie(id));
    await dispatch(fetchSimilarMovie(id));
};

export const fetchAllShowData = (id) => async (dispatch) => {
    dispatch(fetchDetailShow(id))
    dispatch(fetchImagesShow(id))
    dispatch(fetchCastShow(id))
    dispatch(fetchSimilarShow(id))

}