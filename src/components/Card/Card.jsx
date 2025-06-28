import { useState } from "react"
import { getImageUrl } from "../../utils/getImageUrl"
import DetailContainer from "../DetailContainer/DetailContainer"


function Card({ movie }) {
    const [onMouse,setOnMouse] = useState(false)

    const handleMousePosition = () => setOnMouse((prev)=> !prev) 
            
    return (
        <article 
        onMouseEnter={handleMousePosition}
        onMouseLeave={handleMousePosition}
        className="relative w-44 shadow-md shadow-black/60 rounded-2xl  z-10">
            <div className="w-44 h-64 rounded-2xl overflow-hidden aspect-video">
                <img
                    className="w-100 object-contain"
                    src={getImageUrl(movie?.poster_path, 'original')} alt={movie.title} />
            </div>
            {onMouse === true && <DetailContainer movie={movie}/>}
        </article>
    )

}

export default Card