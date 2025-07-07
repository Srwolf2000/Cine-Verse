import { useFetchData } from "../hooks/fetchData";
import { useGetItems } from "../hooks/getItems"
import Slider from "../components/Slider/Slider";
import Section from "../components/Section/Section";
import { useMemo } from "react";

function Home() {
const keys = useMemo(() => ['popular', 'upcoming', 'toptedmovies'], []);
  useFetchData(keys);
  const inputs = useGetItems(keys);
  console.log(inputs)

  return (

    <div className="">



      <Slider />

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