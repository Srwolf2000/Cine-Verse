import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchPopular, fetchUpcoming, fetchTopTedMovies } from "../features/movies/moviesSlice";
import { useLoading,useError } from "../hooks/fetchState";
import IsLoading from "./IsLoading"
import Slider from "../components/Slider/Slider";
import Section from "../components/Section/Section";

function Home() {
  const moviesPopular = useSelector(state => state.movies.popular)
  const moviesUpcoming = useSelector(state => state.movies.upcoming)
  const moviesTopTedMovies = useSelector(state => state.movies.topTedMovies)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPopular())

  }, [dispatch]);


  useEffect(() => {
    dispatch(fetchUpcoming())

  }, [dispatch]);


  useEffect(() => {
    dispatch(fetchTopTedMovies())

  }, [dispatch]);

  const Loading = useLoading(['popular','upcoming','topTedMovies']);
  const isError = useError(['popular','upcoming','topTedMovies']);
  console.log('cargando es :'+ Loading,'Error es:'+ isError)
  
  return (

    <div className="">

        
      
      <Slider />

      <Section
        name={'Popular'}
        items={moviesPopular} />

      <Section
        name={'Upcoming'}
        items={moviesUpcoming} />

      <Section
        name={'Top Ted Movies'}
        items={moviesTopTedMovies} />

      
    </div>
  );
}
export default Home