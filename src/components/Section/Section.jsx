import { useSelector } from "react-redux";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import Card from "../Card/Card";



function Section({ name, items }) {

    const [start, setStart] = useState(0);
    const [activeLeft, setActiveLeft] = useState(false)
    const [activeRight, setActiveRight] = useState(false)



    const movies = items;
    const status = useSelector(state => state.movies.status)
    const itemsPerPage = 5;

    const handleNext = () => {
        const nextStart = (start + itemsPerPage) % movies.length;
        setStart(nextStart);
    };


    const handleBack = () => {
        let newStart = start - itemsPerPage;
        if (newStart < 0) {
            newStart = movies.length + newStart;
        }
        setStart(newStart);
    };

    const visibleMovies = (() => {
        const end = start + itemsPerPage;
        if (end <= movies.length) {
            return movies.slice(start, end);
        } else {
            return [...movies.slice(start), ...movies.slice(0, end % movies.length)];
        }
    })();


    return (
        <section className="flex flex-col justify-center overflow-hidden w-full h-96  bg-red-800">
            <div className="">
            <p className="">{name}</p>
            </div>
            {status === 'loading' && <p>Loading...</p>}
            <button
                onMouseEnter={() => setActiveLeft(true)}
                onMouseLeave={() => setActiveLeft(false)}
                className="absolute left-8 z-20 flex items-center justify-center w-14 h-52 bg-black/25 backdrop-blur-md rounded-2xl"
                onClick={handleBack}>
                <ChevronLeftIcon className={`${activeLeft ? 'hover:size-20' : 'size-10'} text-white `} />
            </button>
            <div className="flex flex-row justify-center gap-5 w-full   bg-white  ">

                {visibleMovies.map((movie) => (
                    <Card 
                    key={movie?.id} 
                    movie={movie} />

                ))}
            </div>
            <button
                onMouseEnter={() => setActiveRight(true)}
                onMouseLeave={() => setActiveRight(false)}
                className="absolute right-24 z-20 flex items-center justify-center w-14 h-52 bg-black/25 backdrop-blur-md rounded-2xl"
                onClick={handleNext}>
                <ChevronRightIcon className={`${activeRight ? 'hover:size-20' : 'size-10'} text-white `} />
            </button>
        </section>
    )
}

export default Section