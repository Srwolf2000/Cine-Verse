import { clearPopular, clearUpcoming, clearTopTedMovies } from "../features/movies/moviesSlice";
import { clearSearch } from "../features/search/searchSlice";
import { clearPopularTv,clearOnTheAirTv, clearTopTedTv} from '../features/show/showSlice'

export function clearData(keys, dispatch) {
    keys.forEach((key) => {
       ;
        if (key === 'Popular') {
            dispatch(clearPopular());
        } else if (key== 'Upcoming') {
            dispatch(clearUpcoming());
        } else if (key === 'Top Ted Movies') {
            dispatch(clearTopTedMovies());
        } else if (key === 'Search') {
            dispatch(clearSearch());
        } else if (key === 'PopularTv'){
            dispatch(clearPopularTv());
        }else if (key === 'On The Air Tv'){
            dispatch(clearOnTheAirTv());
        }else if (key === 'Top Ted Tv'){
            dispatch(clearTopTedTv());
        }
    });
}