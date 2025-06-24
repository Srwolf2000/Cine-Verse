import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { fetchPopular } from "../features/movies/moviesSlice"
import Slider from "../components/Slider/Slider";
import Section from "../components/Section/Section";

function Home() {
  const moviesPopular = useSelector(state =>state.movies.popular)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchPopular())

  }, [dispatch])


  return (

    <div >
      <Slider />
      <Section 
      name={'Popular'} 
      items={moviesPopular}/>

    </div>
  );
}
export default Home