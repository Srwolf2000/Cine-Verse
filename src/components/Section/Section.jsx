import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import Card from "../Card/Card";



function Section({ name, items }) {

    const [start, setStart] = useState(0);
    const [activeLeft, setActiveLeft] = useState(false)
    const [activeRight, setActiveRight] = useState(false)

    const movies = items;
    
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
        <section className="relative flex flex-col justify-center overflow-hidden w-full h-[30rem]">

            <div className="flex w-full mx-20 mb-10 h-20 items-center">
               
                <p className="font-poppins font-bold text-white text-2xl mr-10 ">{name}</p>
                <p className="font-poppins font-bold text-red-700 text-2xl cursor-pointer hover:text-3xl">See more</p>
                <ChevronRightIcon className="size-10 text-red-700 cursor-pointer "/>
                
            </div>

           
            <button
                onMouseEnter={() => setActiveLeft(true)}
                onMouseLeave={() => setActiveLeft(false)}
                className="absolute top-44 left-8 z-20 flex items-center justify-center w-14 h-52 bg-black/25 rounded-2xl"
                onClick={handleBack}>
                <ChevronLeftIcon className={`${activeLeft ? 'hover:size-20' : 'size-10'} text-white `} />
            </button>
            <div className="flex flex-row gap-20 justify-center items-center w-full    ">

              
                    {visibleMovies.map((movie) => (
                        <Card
                            key={movie?.id}
                            movie={movie} />

                    ))}
                
            </div>
            <button
                onMouseEnter={() => setActiveRight(true)}
                onMouseLeave={() => setActiveRight(false)}
                className="absolute top-44 right-8 z-20 flex items-center justify-center w-14 h-52 bg-black/25 rounded-2xl"
                onClick={handleNext}>
                <ChevronRightIcon className={`${activeRight ? 'hover:size-20' : 'size-10'} text-white `} />
            </button>
        </section>
    )
}

export default Section