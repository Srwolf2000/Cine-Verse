import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { getImageUrl } from "../../utils/getImageUrl"
import { HeartIcon, BookmarkIcon } from "@heroicons/react/16/solid"
import DetailContainer from "../DetailContainer/DetailContainer"


function Card({ item }) {

    const [loadingImage, setLoadingImage] = useState(true)
    const [onMouse, setOnMouse] = useState(false)
    const [likeItem, setLikeItem] = useState(false)
    const [saveItem, setSaveItem] = useState(false)

    const moviesLiked = useSelector(state => state.authLogin.likedMovies);
    const showLiked = useSelector(state => state.authLogin.likedShows);

    const moviesSaved = useSelector(state => state.authLogin.savedMovies);
    const showSaved = useSelector(state => state.authLogin.savedShows);


    useEffect(() => {
        const isLikedItem = moviesLiked.find(movie => movie.id === item.id) || showLiked.find(movie => movie.id === item.id)
        const isSavedItem = moviesSaved.find(movie => movie.id === item.id) || showSaved.find(movie => movie.id === item.id)
        if (isLikedItem) {
            setLikeItem(true)
        } else {
            setLikeItem(false)
        }

        if (isSavedItem) {
            setSaveItem(true)
        } else {
            setSaveItem(false)

        }
    }, [moviesLiked, showLiked, moviesSaved, showSaved, item])


    const showIcons = () => {
        if (likeItem && saveItem) {
            return (
                <div className="absolute top-2 right-2 h-10 flex flex-row justify-center ">
                    <HeartIcon className="size-6 text-white mr-3 cursor-pointer hover:size-8" />
                    <BookmarkIcon className=" size-6 text-white cursor-pointer hover:size-8" />
                </div>
            )
        } else if (saveItem) {
            return (
                <div className="absolute top-2 right-2 h-10 flex flex-row justify-center ">
                    <BookmarkIcon className=" size-6 text-white cursor-pointer hover:size-8" />
                </div>
            )
        } else if (likeItem) {
            return (
                <div className="absolute top-2 right-2 h-10 flex flex-row justify-center ">
                    <HeartIcon className="size-6 text-white mr-3 cursor-pointer hover:size-8" />
                </div>
            )

        }

        return null
    }

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
                    src={getImageUrl(item?.poster_path, 'original')} alt={item?.title}
                    onError={(e) => {
                        e.target.src = " https://placehold.co/176x256?text=Sorry,%0Awe+work+to+improve&font=roboto&size=18";
                        setLoadingImage(false)
                    }} />
            </div>
            {onMouse === true && <DetailContainer item={item} />}
            {showIcons()}
        </article>
    )

}

export default Card