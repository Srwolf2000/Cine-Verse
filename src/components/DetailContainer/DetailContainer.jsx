import { getImageUrl } from "../../utils/getImageUrl"

function DetailContainer({ movie }) {
    console.log(movie)
    return (
        <div className="absolute flex flex-col left-1/2 -translate-x-1/2 -top-10 w-80 h-80 rounded-xl overflow-hidden bg-red-700">
            <div className="w-full h-3/6 mb-5 overflow-hidden">
                <img
                    className="w-full h-full object-cover rounded-t-xl"
                    src={getImageUrl(movie?.backdrop_path)}
                    alt={movie.title} />
            </div>
            <div className="w-full h-1/4 px-4">
                <p className="font-poppins font-semibold text-base text-white">{movie?.title}</p>
                <p className="font-poppins font-light text-xs text-white">{movie?.overview}</p>
            </div>
        </div>
    )
}

export default DetailContainer 