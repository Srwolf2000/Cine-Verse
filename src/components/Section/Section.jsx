import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import { HandleError } from "../HandleError/HandleError";
import Card from "../Card/Card";



function Section({ name, items, error = null, code = null, profile = false }) {
    const navigate = useNavigate()
    const location = useLocation();


    const [activeLeft, setActiveLeft] = useState(false);
    const [activeRight, setActiveRight] = useState(false);

    const carouselRef = useRef(null);
    const { t } = useTranslation();






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
        if (location.pathname.includes('profile')) {
            const type = code === "1" ? "movie" : "tv";
            navigate(`/profile/${type}/`)
        } else {
            const category = name.replace(/\s+/g, '-');
            navigate(`/category/${category}/${code}`)
        }

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
                    item={movie} />
            </div>

        )))
    }


    return (
        <section className="relative py-8 md:py-12 w-full min-h-[30rem] overflow-hidden">
            <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8 mb-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white font-poppins">{name}</h2>
                    
                    {!profile && (
                        <button 
                            onClick={() => handleClick(name)}
                            className="group flex items-center space-x-2 font-poppins"
                        >
                            <span className="text-red-600 font-bold text-lg md:text-xl transition-all duration-300 group-hover:text-red-500">
                                {t('sections.seeMore')}
                            </span>
                            <ChevronRightIcon className="w-6 h-6 text-red-600 group-hover:text-red-500 transition-transform duration-300 group-hover:translate-x-1" />
                        </button>
                    )}
                </div>
            </div>

            <div className="relative max-w-[95%] mx-auto">
                <button
                    onClick={scrollLeft}
                    onMouseEnter={() => setActiveLeft(true)}
                    onMouseLeave={() => setActiveLeft(false)}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-40 transition-all duration-300 group"
                >
                    <div className={`
                        flex items-center justify-center w-12 h-48 md:w-14 md:h-52
                        bg-black/30 backdrop-blur-sm rounded-r-xl
                        transition-all duration-300
                        ${activeLeft ? 'bg-black/50' : 'opacity-0 group-hover:opacity-100'}
                    `}>
                        <ChevronLeftIcon className={`
                            w-8 h-8 md:w-10 md:h-10 text-white/90
                            transition-all duration-300
                            ${activeLeft ? 'scale-125' : 'scale-100'}
                        `} />
                    </div>
                </button>

                {/* Carousel */}
                <div className="relative overflow-hidden">
                    <div
                        ref={carouselRef}
                        className="flex gap-6 md:gap-8 items-center px-4 py-4
                            overflow-x-auto snap-x snap-mandatory
                            scroll-smooth
                            [&::-webkit-scrollbar]:h-2 
                            [&::-webkit-scrollbar-track]:rounded-full
                            [&::-webkit-scrollbar-track]:bg-gray-800/40
                            [&::-webkit-scrollbar-thumb]:rounded-full
                            [&::-webkit-scrollbar-thumb]:bg-gray-500/50
                            hover:[&::-webkit-scrollbar-thumb]:bg-gray-400/60
                            [&::-webkit-scrollbar-thumb]:transition-colors
                            firefox:scrollbar-thin
                            firefox:scrollbar-track-rounded-full
                            firefox:scrollbar-track-[#1f2937]/40
                            firefox:scrollbar-thumb-rounded-full
                            firefox:scrollbar-thumb-gray-500/50
                            firefox:hover:scrollbar-thumb-gray-400/60"
                    >
                        {showCard()}
                    </div>

                    <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent pointer-events-none"></div>
                    <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black to-transparent pointer-events-none"></div>
                </div>
                <button
                    onClick={scrollRight}
                    onMouseEnter={() => setActiveRight(true)}
                    onMouseLeave={() => setActiveRight(false)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-40 transition-all duration-300 group"
                >
                    <div className={`
                        flex items-center justify-center w-12 h-48 md:w-14 md:h-52
                        bg-black/30 backdrop-blur-sm rounded-l-xl
                        transition-all duration-300
                        ${activeRight ? 'bg-black/50' : 'opacity-0 group-hover:opacity-100'}
                    `}>
                        <ChevronRightIcon className={`
                            w-8 h-8 md:w-10 md:h-10 text-white/90
                            transition-all duration-300
                            ${activeRight ? 'scale-125' : 'scale-100'}
                        `} />
                    </div>
                </button>
            </div>
        </section>
    )
}

export default Section