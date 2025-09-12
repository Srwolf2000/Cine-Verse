import { useParams,  } from "react-router";
import { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetItems } from "../hooks/getItems";
import { fetchPopular, fetchUpcoming, fetchTopRatedMovies } from "../features/movies/moviesSlice";
import { fetchPopularTv, fetchOnTheAirTv, fetchTopRatedTv } from "../features/show/showSlice"
import { clearData } from "../hooks/clearData";
import Card from "../components/Card/Card";

export default function CategoryPage() {
  const dispatch = useDispatch();
  const elementRef = useRef(null);
  const { code } = useParams();
  const [count, setCount] = useState(1);
  const [isIndex, setIsIndex] = useState(null);

 const key = parseInt(code)
  const stateLanguages = useSelector((state) => state.languages.language)
  const languages = stateLanguages.en ? 'en-US' : 'es-ES';


  useEffect(() => {
    clearData([key], dispatch);

    return () => {
      clearData([key], dispatch);
    }
  }, [key, dispatch, languages]);



  useEffect(() => {


    if (key === 1) {
      dispatch(fetchPopular({ page: count, language: languages }));
    }
    else if (key === 2) {
      dispatch(fetchUpcoming({ page: count, language: languages }));
    }
    else if (key === 3) {
      dispatch(fetchTopRatedMovies({ page: count, language: languages }));
    }
    else if (key === 4) {
      dispatch(fetchPopularTv({ page: count, language: languages }));
    }
    else if (key === 5) {
      dispatch(fetchOnTheAirTv({ page: count, language: languages }));
    }
    else if (key === 6) {
      dispatch(fetchTopRatedTv({ page: count, language: languages }));
    }else{
      console.warn("Unknown key:", key);
    }

  }, [key, count, dispatch, languages]);

  const inputs = useGetItems([key]);







  const hasFetched = useRef(false);

  const onIntersection = useCallback(
    (entries) => {
      const firstEntry = entries[0];
      if (firstEntry.isIntersecting && !hasFetched.current) {
        hasFetched.current = true;

        setCount((prev) => prev + 1);
      }
    },
    []
  );

  useEffect(() => {
    if (!elementRef.current || !inputs[0]?.items?.length) {
    
      return;
    }
    console.log("Observer initialized for element:", elementRef.current);

    const observer = new IntersectionObserver(onIntersection, {
      threshold: 0.1,
    });

    observer.observe(elementRef.current);

    return () => {
      observer.disconnect();
    };
  }, [isIndex, onIntersection, inputs]);

  useEffect(() => {
    hasFetched.current = false;
    const items = inputs[0]?.items || [];

    const refIndex =
      items.length >= 6
        ? items.length - 6
        : items.length > 0
          ? 0
          : null;

    if (refIndex !== isIndex && refIndex !== null) {
      setIsIndex(refIndex);

    }
  }, [inputs, isIndex]);

  return (
    <section className="w-full flex flex-col items-center my-36">
      <h2 className="text-white font-poppins font-bold text-3xl">
        {inputs[0]?.name}
      </h2>

      <div className="w-full flex justify-center items-center">
        <div className="grid grid-cols-5 m-auto gap-20 py-16">
          {inputs[0]?.items?.map((item, index) => {
            const isRef = index === isIndex;

            return (
              <div
                key={item.id}
                ref={isRef ? elementRef : null}
              >
                <Card item={item} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
