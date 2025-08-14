import axios from "axios";

export const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNTNmNzNhOWQzMTc0ZDhhNmM3NDNkMGNmMTRhZTZiOCIsIm5iZiI6MTczNzEzMjg5Ni40NTEsInN1YiI6IjY3OGE4YjYwYTY0ZmViMTZjOTFkOGQzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tuL4EGfo-Ya_sTnYsxVesNViShru167DP87J7MCqkZQ',
        "Content-Type": 'application/json;charset=utf-8'
    },
});

export const getDetailMovie = (id, language) =>  api.get(`/movie/${id}`, {
        params: {
            language: language
        }

    });



export const getDetailShow = (id, language) => api.get(`/tv/${id}`, {
    params: {
        language: language
    }
});

export const getImagesMovie = (id, language) => api.get(`/movie/${id}/images`, {
    params: {
        language: language
    }
});

export const getImagesShow = (id, language) => api.get(`/tv/${id}/images`, {
    params: {
        language: language
    }
});

export const getCastMovie = (id, language) => api.get(`/movie/${id}/credits`, {
    params: {
        language: language
    }
});

export const getCastShow = (id, language) => api.get(`/tv/${id}/credits`, {
    params: {
        language: language
    }
});

export const getSimilarMovie = (id, language) => api.get(`/movie/${id}/similar`, {
    params: {
        language: language
    }
});

export const getSimilarShow = (id, language) => api.get(`/tv/${id}/similar`, {
    params: {
        language: language
    }
});