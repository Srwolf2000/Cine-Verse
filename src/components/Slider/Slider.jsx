import { useEffect, useState } from "react"

import { getImageUrl } from "../../utils/getImageUrl"

function Slider({movies}) {
   
    const items = movies.slice(0, 3)

    const [index, setIndex] = useState(0)
  

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % items.length)
        }, 3000);
        return () => clearInterval(interval);
    }, [items.length, movies])




    return (


        <div className="relative w-full overflow-hidden z-20">
            {/* Imagen de fondo */}
            <img
                className="w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh] xl:h-[100vh] object-cover"
                src={getImageUrl(items[index]?.backdrop_path, 'original')} 
                alt={items[index]?.title || 'Movie backdrop'} 
            />
            
            {/* Gradientes para mejorar la legibilidad */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/70"></div>

            {/* Contenido */}
            <div className="absolute bottom-8 sm:bottom-16 md:bottom-24 lg:bottom-32 left-4 sm:left-8 md:left-12 lg:left-14 
                          w-full sm:w-11/12 md:w-10/12 lg:w-9/12 px-4 sm:px-0">
                <div className="w-full sm:w-9/12 md:w-8/12 lg:w-6/12 space-y-2 sm:space-y-3 md:space-y-4">
                    {/* Título */}
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white 
                                font-poppins tracking-tight leading-tight
                                text-shadow-lg shadow-black/50">
                        {items[index]?.title}
                    </h2>

                    {/* Descripción */}
                    <p className="text-sm sm:text-base md:text-lg 
                               text-gray-200 font-poppins
                               line-clamp-2 sm:line-clamp-3 md:line-clamp-4
                               text-shadow shadow-black/50">
                        {items[index]?.overview}
                    </p>

                    {/* Indicadores de slide */}
                    <div className="flex space-x-2 pt-4">
                        {items.map((_, i) => (
                            <div
                                key={i}
                                className={`h-1 rounded-full transition-all duration-500
                                    ${i === index ? 'w-8 bg-red-600' : 'w-4 bg-gray-500'}`}
                            ></div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    )

}

export default Slider