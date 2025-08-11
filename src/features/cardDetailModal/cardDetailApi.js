import axios from "axios";

export const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNTNmNzNhOWQzMTc0ZDhhNmM3NDNkMGNmMTRhZTZiOCIsIm5iZiI6MTczNzEzMjg5Ni40NTEsInN1YiI6IjY3OGE4YjYwYTY0ZmViMTZjOTFkOGQzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tuL4EGfo-Ya_sTnYsxVesNViShru167DP87J7MCqkZQ',
        "Content-Type": 'application/json;charset=utf-8'
    },
});

export const getDetailMovie = (id) => api.get(`/movie/${id}`);

export const getDetailShow = (id) => api.get(`/tv/${id}`);

export const getImagesMovie = (id) => api.get(`/movie/${id}/images`);

export const getImagesShow = (id) => api.get(`/tv/${id}/images`);

export const getCastMovie = (id) => api.get(`/movie/${id}/credits`);

export const getCastShow = (id) => api.get(`/tv/${id}/credits`);

export const getSimilarMovie = (id) => api.get(`/movie/${id}/similar`);

export const getSimilarShow = (id) => api.get(`/tv/${id}/similar`);