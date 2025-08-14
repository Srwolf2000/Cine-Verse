import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchPopular, fetchUpcoming, fetchTopRatedMovies } from "../features/movies/moviesSlice";
import { fetchPopularTv, fetchOnTheAirTv, fetchTopRatedTv } from "../features/show/showSlice"
import { useGetItems } from "../hooks/getItems"
import { clearData } from "../hooks/clearData"
import Slider from "../components/Slider/Slider";
import Section from "../components/Section/Section";
import IsLoading from "./IsLoading";


function HomeMedia() {
  const location = useLocation();
  const [isUiReady, setIsUiReady] = useState(false);
  const dispatch = useDispatch();

  
  const isMovie = location.pathname === '/movie'
  const keys = isMovie
    ? [1,2,3]
    : [4,5,6];

  const stateLanguages = useSelector((state) => state.languages.language)
  const languages = stateLanguages.en ? 'en-US' : 'es-ES';
  const inputs = useGetItems(keys);






  useEffect(() => {
    clearData(keys, dispatch)

    return () => clearData(keys, dispatch)
  }, [location.pathname, dispatch, languages,])

  useEffect(() => {
    if (isMovie) {
      dispatch(fetchPopular({ page: 1, language: languages }));
      dispatch(fetchUpcoming({ page: 1, language: languages }));
      dispatch(fetchTopRatedMovies({ page: 1, language: languages }));
    } else if (location.pathname === '/show') {
      dispatch(fetchPopularTv({ page: 1, language: languages }));
      dispatch(fetchOnTheAirTv({ page: 1, language: languages }));
      dispatch(fetchTopRatedTv({ page: 1, language: languages }));

    }
  }, [dispatch, location.pathname, isMovie, languages]);






  useEffect(() => {
    const allSucceeded = inputs[0].loadingState === 'succeeded' &&
      inputs[1].loadingState === 'succeeded' &&
      inputs[2].loadingState === 'succeeded';


    if (allSucceeded) {

      requestAnimationFrame(() => setIsUiReady(true))
    }
  }, [inputs]);


  const showCards = () => {
    return inputs.map((input) => (
      <Section key={input.name} name={input.name} items={input.items} error={input.errorState} code={input.code} />
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