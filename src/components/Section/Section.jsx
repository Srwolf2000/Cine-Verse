import { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import { useError } from "../../hooks/fetchState";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import { HandleError } from "../HandleError/HandleError";
import Card from "../Card/Card";



function Section({ name, items, error }) {
    const navigate = useNavigate()
    const { media } = useParams()

    const [activeLeft, setActiveLeft] = useState(false);
    const [activeRight, setActiveRight] = useState(false);

    const carouselRef = useRef(null);

    const isError = useError(['popular', 'upcoming', 'topTedMovies']);




    const scrollLeft = () => {
        const carousel = carouselRef.current;

        if (!carousel) return;

        if (carousel.scrollLeft === 0) {
            carousel.scrollTo({
                left: carousel.scrollWidth,
                behavior: "smooth",
            });
        } else {
            carouselRef.current.scrollBy({
                left: -1020,
                behavior: 'smooth'
            });
        }



    };

    const scrollRight = () => {
        const carousel = carouselRef.current;
        if (!carousel) return;

        const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
        if (Math.ceil(carousel.scrollLeft) >= maxScrollLeft) {
            carousel.scrollTo({
                left: 0,
                behavior: "smooth",
            });
        } else {
            carouselRef.current.scrollBy({
                left: 1020,
                behavior: 'smooth'
            });
        }

    };


    const handleClick = (name) => {
        const category = name.replace(/\s+/g, '-');
        navigate(`/${media}/category/${category}`)
    }



    const showCard = () => {
        if (error !== null) {
            console.error(error)
            return (<HandleError />)

        }
        return (items.map((movie) => (
            <div key={movie?.id} className="pointer-events-auto ">
                <Card
                    key={movie?.id}
                    movie={movie} />
            </div>

        )))
    }


    return (
        <section className="relative flex flex-col justify-center overflow-x-hidden w-full h-[30rem]">

            <div className="flex w-full mx-20 mb-10 h-20 items-center">

                <p className="font-poppins font-bold text-white text-2xl mr-10 ">{name}</p>
                <p
                    onClick={() => handleClick(name)}
                    className="font-poppins font-bold text-red-700 text-2xl cursor-pointer hover:text-3xl">See more</p>
                <ChevronRightIcon className="size-10 text-red-700 cursor-pointer " />

            </div>


            <button
                onMouseEnter={() => setActiveLeft(true)}
                onMouseLeave={() => setActiveLeft(false)}
                className="absolute top-44 left-8 z-40 flex items-center justify-center w-14 h-52 bg-black/50 rounded-2xl"
                onClick={scrollLeft}>
                <ChevronLeftIcon className={`${activeLeft ? 'hover:size-20' : 'size-10'} text-white `} />
            </button>
            <div className="relative w-full h-96 flex justify-center items-center overflow-visible">
                <div className="relative w-[80%]  h-96 overflow-hidden pointer-events-auto">
                    <div
                        ref={carouselRef}
                        className="flex flex-row items-center px-16  gap-20  h-96 overflow-x-scroll scroll-smooth no-scrollbar pointer-events-none">


                        {showCard(isError)}

                    </div>
                </div>

            </div>
            <button
                onMouseEnter={() => setActiveRight(true)}
                onMouseLeave={() => setActiveRight(false)}
                className="absolute top-44 right-8 z-40 flex items-center justify-center w-14 h-52 bg-black/50 rounded-2xl"
                onClick={scrollRight}>
                <ChevronRightIcon className={`${activeRight ? 'hover:size-20' : 'size-10'} text-white `} />
            </button>
        </section>
    )
}

export default Section