import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchPopular, fetchUpcoming, fetchTopTedMovies } from "../features/movies/moviesSlice";

/**
 * 
 * @param {string[]} keys - Ej: ["popular", "upcoming"]
 */
export function useFetchData(keys = []) {
    const dispatch = useDispatch()
    useEffect(() => {
    keys.forEach((key)=>{
    const word = key.toLocaleLowerCase();
    if(word ==='popular'){
        dispatch(fetchPopular())}

        else if( word === 'upcoming'){
            dispatch(fetchUpcoming())}

            else if (word === 'toptedmovies'){
                dispatch(fetchTopTedMovies())
            }})
}, [dispatch,keys]);

}
