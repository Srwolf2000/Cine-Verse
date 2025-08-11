import { useNavigate, useParams } from "react-router"
import { useDispatch } from "react-redux"
import { useEffect,useState} from "react"
import {closeModal} from"../../features/cardDetailModal/cardDetailSlice"
import { useGetItems } from "../../hooks/getItems"
import { getImageUrl } from "../../utils/getImageUrl"
import { fetchAllMovieData,fetchAllShowData } from "../../features/cardDetailModal/movieData"
import { time } from "../../utils/time"
import { HeartIcon, PlusCircleIcon, ChevronLeftIcon } from "@heroicons/react/16/solid"
import Card from "../Card/Card"
import IsLoading from "../../page/IsLoading"




function DetailItems() {

      const [isUiReady, setIsUiReady] = useState(false);

    const navigate = useNavigate()
    const {media,id} =  useParams();
    const dispatch = useDispatch()



    const item = useGetItems(['Detail']);





    useEffect(()=>{
        return () => {
            dispatch(closeModal())
        }
    },[])


    useEffect(()=>{
        if(media === 'movie'){
            dispatch(fetchAllMovieData(id))
        }else if(media === 'show'){
            dispatch(fetchAllShowData(id))
        }
    },[media,id,dispatch])

    const logo = item[0]?.images?.logos?.find((logo) => {
        return logo.iso_639_1 === 'en'
    });

    const showLogo = () => {
        return logo ? (
            <img
                className="w-100  object-contain"
                src={getImageUrl(logo?.file_path, "original")} alt={item[0].movie?.title} />
        ) : (
            <h2 className="text-white text-xl font-bold">{item[0]?.movie?.title}</h2>
        )
    }

    const timeMovie = () => {
        const runTime = time(item[0]?.movie?.runtime)
        console.log('runtime es', runTime)

        return runTime
    }

      useEffect(() => {
    const allSucceeded = item[0].loadingStateCast === 'succeeded' ||
      item[0].loadingStateImage === 'succeeded' ||
      item[0].loadingStateItem === 'succeeded' ||
      item[0].loadingStateSimilar === 'succeeded';


    if (allSucceeded) {

      requestAnimationFrame(() => setIsUiReady(true))
    }
  }, [item]);


  



    const showTimeAndDate = () => {
        if (timeMovie() && item[0]?.movie?.release_date) {
            return `${timeMovie()} | ${item[0]?.movie?.release_date}`
        } else if (!timeMovie() && item[0]?.movie?.release_date) {
            return item[0]?.movie?.release_date
        } else if (timeMovie() && !item[0].movie.release_date) {
            return timeMovie()
        }
        return ""
    }

    const handleBackClick = () => {
        window.scrollTo(0, 0);
        navigate(-1);

    }





    return (
        <>

            <div className=" relative mx-auto w-full h-auto rounded-xl bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,07)_60%,_rgba(03,7,18,1)_90%)] shadow-[0_8px_20px_rgba(255,255,255,0.2)]">
                {isUiReady && <IsLoading />}
               
                <div className="relative w-full h-[600px] rounded-t-xl overflow-hidden">
                    <img
                        className="w-full  object-contain"
                        src={getImageUrl(item[0]?.movie?.backdrop_path, "original")} alt={item[0].movie?.title} />
                </div>
                <div className="absolute top-0 w-full h-[600px] bg-radial-black pointer-events-none rounded-t-xl"></div>
                <div className="absolute top-0 w-full h-[600px] bg-bottom-fade pointer-events-none  rounded-t-xl"></div>


                <div className="absolute top-96 left-16 min-w-36 max-w-64 h-auto  overflow-hidden ">
                    {showLogo()}
                </div>

                <div
                    onClick={handleBackClick}
                    className="absolute top-5 left-10  ">
                    < ChevronLeftIcon className="size-16 text-white mr-3 cursor-pointer hover:size-20" />
                </div>


                <div className="w-20 h-10 flex flex-row justify-center mx-10 ">
                    <HeartIcon className="size-6 text-white mr-3 cursor-pointer hover:size-8" />
                    <PlusCircleIcon className=" size-6 text-white cursor-pointer hover:size-8" />
                </div>


                <div className=" w-full flex flex-row items-center justify-around">
                    <div className="w-[40%] h-auto mb-4">
                        <p className="font-poppins font-semibold text-2xl text-white">{showTimeAndDate()}</p>
                        <p className=" mt-4 font-poppins font-light text-xl text-white">{item[0]?.movie?.overview}</p>
                    </div>
                    <div className="w-[40%] h-auto ">
                        <p className=" mt-4 font-poppins font-light text-lg text-white">
                            <span className=" font-poppins  text-xl text-white font-semibold">genres: </span>{
                                item[0]?.movie?.genres?.map((genre) => genre.name).join(', ')
                            }

                        </p>
                        <p className=" mt-4 font-poppins font-light text-xl text-white">
                            <span className=" font-poppins  text-lg text-white font-semibold">Cast: </span>
                            {item[0]?.cast?.cast?.slice(0, 5).map((people) => people.name).join(', ')}
                        </p>
                    </div>
                </div>
                <div className="w-full  flex flex-col justify-center items-center">
                    <p className="font-poppins font-semibold text-2xl text-white mt-8">Similar Movies</p>
                    <div className=" grid grid-cols-4 gap-24 py-16 ">
                        {item[0]?.similar?.map((item) => {

                            return (
                                <div key={item.id}>
                                    <Card movie={item} />
                                </div>
                            );
                        })}
                    </div>
                </div>


            </div>

        </>
    )

}

export default DetailItems