import { clearPopular, clearUpcoming, clearTopTedMovies } from "../features/movies/moviesSlice";

export function clearData(keys, dispatch) {
    keys.forEach((key) => {
        const word = key.toLowerCase();
        if (word === 'popular') {
            dispatch(clearPopular());
        } else if (word === 'upcoming') {
            dispatch(clearUpcoming());
        } else if (word === 'toptedmovies') {
            dispatch(clearTopTedMovies());
        }
    });
}