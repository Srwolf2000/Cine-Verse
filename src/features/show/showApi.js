import axios from "axios";

export const api = axios.create({
    baseURL:'https://api.themoviedb.org/3',
    headers:{
        Authorization:'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNTNmNzNhOWQzMTc0ZDhhNmM3NDNkMGNmMTRhZTZiOCIsIm5iZiI6MTczNzEzMjg5Ni40NTEsInN1YiI6IjY3OGE4YjYwYTY0ZmViMTZjOTFkOGQzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tuL4EGfo-Ya_sTnYsxVesNViShru167DP87J7MCqkZQ',
        "Content-Type" :'application/json;charset=utf-8'    
    },
});

export const getPopularTv = ( page, language )=> api.get('/tv/popular',{
    params:{
        page:page,
        languages:language 
    }
}) ;

export const getOnTheAirTv = (page, language) => api.get('/tv/on_the_air',{
  params:{
        page:page,
        languages:language 
    }  
});

export const getTopRatedTv = (page, language) => api.get('/tv/top_rated',{
    params:{
        page:page,
        languages:language
    }
});






