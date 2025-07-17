import { fetchPopular, fetchUpcoming, fetchTopTedMovies } from "../features/movies/moviesSlice";
import { useGetItems } from "../hooks/getItems"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Slider from "../components/Slider/Slider";
import Section from "../components/Section/Section";


function Home() {

  const dispatch = useDispatch();

  
  useEffect(() => {
    dispatch(fetchPopular(1));
    dispatch(fetchUpcoming(1));
    dispatch(fetchTopTedMovies(1));
  }, [dispatch])

  const inputs = useGetItems( ['popular', 'upcoming', 'toptedmovies']);

 

  return (

    <div className="">



      <Slider movies={inputs[0].items} />

      <Section
        name={'Popular'}
        items={inputs[0].items} />

      <Section
        name={'Upcoming'}
        items={inputs[1].items} />

      <Section
        name={'Top Ted Movies'}
        items={inputs[2].items} />


    </div>
  );
}
export default Home