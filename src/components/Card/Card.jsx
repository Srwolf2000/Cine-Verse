import { useState } from "react"
import { getImageUrl } from "../../utils/getImageUrl"
import DetailContainer from "../DetailContainer/DetailContainer"


function Card({ movie }) {




    const [loadingImage, setLoadingImage] = useState(true)
    const [onMouse, setOnMouse] = useState(false)



    const handleImageError = () => {
        if (loadingImage) {
            setOnMouse((prev) => !prev)
        }
    }


    return (
        <article
            onMouseEnter={handleImageError}
            onMouseLeave={handleImageError}
            className="relative w-[176px] h-[256px] shadow-[0_8px_20px_rgba(255,255,255,0.2)] rounded-2xl  z-10">
            <div className="w-44 h-64 rounded-2xl overflow-hidden aspect-video">
                <img
                    className="w-100 object-contain"
                    src={getImageUrl(movie?.poster_path, 'original')} alt={movie.title}
                    onError={(e) => {
                        e.target.src = " https://placehold.co/176x256?text=Sorry,%0Awe+work+to+improve&font=roboto&size=18";
                        setLoadingImage(false)
                    }} />
            </div>
            {onMouse === true && <DetailContainer item={movie} />}
        </article>
    )

}

export default Card