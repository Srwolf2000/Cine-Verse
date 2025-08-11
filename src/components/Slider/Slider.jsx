import { useEffect, useState } from "react"
import { getImageUrl } from "../../utils/getImageUrl"
import { PrimaryButton, SecondButton } from "../Button/Button"
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


            <img
                className="w-full h-[100vh] object-cover aspect-video"
                src={getImageUrl(items[index]?.backdrop_path, 'original')} alt="" />
            <div className="absolute inset-0 bg-radial-black pointer-events-none"></div>
            <div className="absolute inset-0 bg-bottom-fade pointer-events-none"></div>

            <div className="absolute bottom-32  left-14 h-40 w-9/12">

                <div className="w-6/12 h-5/6 my-4 overflow-hidden  text-white">

                    <p className=" my-2 font-poppins font-bold text-3xl">
                        {items[index]?.title}
                    </p>


                    <p
                        className=" line-clamp-3 break-words font-poppins font-normal text-base">
                        {items[index]?.overview}
                    </p>

                </div>

                <div className="flex justify-between w-3/12 h-auto">
                    <SecondButton text={'Watch now'} />
                    <PrimaryButton text={'Add to list'} />
                </div>
            </div>
        </div>

    )

}

export default Slider