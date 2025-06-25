import { getImageUrl } from "../../utils/getImageUrl"
import { FilmIcon,BookmarkIcon } from "@heroicons/react/16/solid"

function DetailContainer({ movie }) {
    console.log(movie)
    return (
        <div className="absolute flex flex-col left-1/2 -translate-x-1/2 -top-10 z-40 w-80 h-90 rounded-xl overflow-hidden bg-red-700">
            <div className="w-full h-3/6 mb-3 overflow-hidden">
                <img
                    className="w-full h-full object-cover rounded-t-xl"
                    src={getImageUrl(movie?.backdrop_path)}
                    alt={movie.title} />
            </div>
            <div className="w-20 h-10 flex flex-row justify-center ">
                <FilmIcon className="size-6 text-white mr-3 cursor-pointer hover:size-8"/>
                <BookmarkIcon className=" size-6 text-white cursor-pointer hover:size-8"/>
            </div>
            <div className="w-full h-1/4 px-4 mb-4">
                <p className="font-poppins font-semibold text-base text-white">{movie?.title}</p>
                <p className="line-clamp-4 break-words font-poppins font-light text-xs text-white">{movie?.overview}</p>
            </div>
        </div>
    )
}

export default DetailContainer 