import axios from "axios";

export const api = axios.create({
    baseURL:'https://api.themoviedb.org/3',
    headers:{
        Authorization:'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNTNmNzNhOWQzMTc0ZDhhNmM3NDNkMGNmMTRhZTZiOCIsIm5iZiI6MTczNzEzMjg5Ni40NTEsInN1YiI6IjY3OGE4YjYwYTY0ZmViMTZjOTFkOGQzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tuL4EGfo-Ya_sTnYsxVesNViShru167DP87J7MCqkZQ',
        "Content-Type" :'application/json;charset=utf-8'    
    },
});

export const getPopularMovies = ( )=> api.get('/movie/popular') ;

export const getUpcomingMovies = () => api.get('/movie/upcoming');

export const getTopRatedMovies = () => api.get('/movie/top_rated');





