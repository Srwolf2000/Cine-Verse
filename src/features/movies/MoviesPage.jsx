import { useParams } from "react-router";
import { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useGetItems } from "../../hooks/getItems";
import { fetchPopular, fetchUpcoming, fetchTopTedMovies } from "../movies/moviesSlice";
import { clearData } from "../../utils/clearData";
import { toCamelCase } from "../../utils/toCamelCase";
import Card from "../../components/Card/Card";

export default function MoviesPage() {
  const dispatch = useDispatch();
  const elementRef = useRef(null);
  const { category } = useParams();
  const title = category.replace(/[-]/g, " ")
  const [count, setCount] = useState(1);
  const [isIndex, setIsIndex] = useState(null);
  const word = toCamelCase(title);



  useEffect(() => {
    clearData([title], dispatch);

    return () => {
      clearData([title], dispatch);
    }
  }, [title, dispatch]);



  useEffect(() => {

    console.log('word', word);
    if (word === 'popular') {
      dispatch(fetchPopular(count));
    } else if (word === 'upcoming') {
      dispatch(fetchUpcoming(count));
    } else if (word === 'topTedMovies') {
      dispatch(fetchTopTedMovies(count));
      console.log('word', word, 'count', count);
    }
    console.log('word', word);
  }, [word, count, dispatch]);

  const inputs = useGetItems([word]);

  console.log("inputs", inputs);




  const hasFetched = useRef(false);

  const onIntersection = useCallback(
    (entries) => {
      const firstEntry = entries[0];
      if (firstEntry.isIntersecting && !hasFetched.current) {
        hasFetched.current = true;
        console.log("Intersection detected → fetching next page");
        setCount((prev) => prev + 1);
      }
    },
    []
  );

  useEffect(() => {
    if (!elementRef.current || !inputs[0]?.items?.length) {
      console.log("Esperando a que existan items para inicializar observer...");
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
      console.log("refIndex:", refIndex);
    }
  }, [inputs, isIndex]);

  return (
    <section className="w-full flex flex-col items-center my-36">
      <h2 className="text-white font-poppins font-bold text-3xl">
        {title}
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
                <Card movie={item} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
