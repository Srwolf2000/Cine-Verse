import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useDispatch } from "react-redux";
import { fetchPopular, fetchUpcoming, fetchTopTedMovies } from "../features/movies/moviesSlice";
import {  fetchPopularTv, fetchOnTheAirTv, fetchTopTedTv } from "../features/show/showSlice"
import { useGetItems } from "../hooks/getItems"
import {clearData} from "../utils/clearData"
import Slider from "../components/Slider/Slider";
import Section from "../components/Section/Section";
import IsLoading from "./IsLoading";


function HomeMedia() {
  const location = useLocation();
  const [isUiReady, setIsUiReady] = useState(false);
  const dispatch = useDispatch();
  



 const isMovie = location.pathname === '/movie'

  const keys = isMovie
  ? ['Popular', 'Upcoming', 'Top Ted Movies']
  : ['PopularTv', 'On The Air Tv', 'Top Ted Tv'];


 useEffect (()=>{
  clearData(keys,dispatch)

  return ()=> clearData(keys,dispatch)
 },[location.pathname,dispatch])

  useEffect(() => {
    if (isMovie) {
      dispatch(fetchPopular(1));
      dispatch(fetchUpcoming(1));
      dispatch(fetchTopTedMovies(1));
    }else if (location.pathname === '/show'){
      dispatch(fetchPopularTv(1));
      dispatch(fetchOnTheAirTv(1));
      dispatch(fetchTopTedTv(1));
    
    }
  }, [dispatch, location.pathname,isMovie])


const inputs = useGetItems(keys);

 

  useEffect(() => {
    const allSucceeded = inputs[0].loadingState === 'succeeded' ||
      inputs[1].loadingState === 'succeeded' ||
      inputs[2].loadingState === 'succeeded';


    if (allSucceeded) {

      requestAnimationFrame(() => setIsUiReady(true))
    }
  }, [inputs]);


  const showCards = () => {
    return inputs.map((input) => (
      <Section key={input.name} name={input.name} items={input.items} error={input.errorState}/>
    ))
  }



  return (

    <div className="">

      {!isUiReady ? (<IsLoading />) : (
        <>
          <Slider movies={inputs[0].items} />

          {showCards()}
        </>
      )}

    </div>
  );
}
export default HomeMedia