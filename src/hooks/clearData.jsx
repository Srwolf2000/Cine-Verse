
import { clearPopular, clearUpcoming, clearTopRatedMovies } from "../features/movies/moviesSlice";
import { clearSearch } from "../features/search/searchSlice";
import { clearPopularTv,clearOnTheAirTv, clearTopRatedTv} from '../features/show/showSlice'

export function clearData(keys, dispatch) {

   

    keys.forEach((key) => {

         


        if (key === 1) {
            dispatch(clearPopular());
        } else if (key==  2) {
            dispatch(clearUpcoming());
        } else if (key === 3) {
            dispatch(clearTopRatedMovies());
        } else if (key === 'Search') {
            dispatch(clearSearch());
        } else if (key ===  4){
            dispatch(clearPopularTv());
        }else if (key ===  5){
            dispatch(clearOnTheAirTv());
        }else if (key ===  6){
            dispatch(clearTopRatedTv());
        }
    });
}