import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { useSelector } from 'react-redux'
import { getImageUrl } from "../../utils/getImageUrl"
import { HeartIcon, BookmarkIcon } from "@heroicons/react/24/solid";




function Card({ item }) {

    const navigate = useNavigate()
    const [isErrorImage, setIsErrorImage] = useState(false)
    const [likeItem, setLikeItem] = useState(false)
    const [saveItem, setSaveItem] = useState(false)

    const moviesLiked = useSelector(state => state.authLogin.likedMovies);
    const showLiked = useSelector(state => state.authLogin.likedShows);

    const moviesSaved = useSelector(state => state.authLogin.savedMovies);
    const showSaved = useSelector(state => state.authLogin.savedShows);



    const urlMovie = item.title ? true : false;
    const urlShow = item.name ? true : false;

    console.log(urlMovie, urlShow)

    const handleClickItem = () => {
        if (!isErrorImage) {
            urlMovie || urlShow
                ? navigate(`/${urlMovie ? 'movie' : 'show'}/view/${item.id}`)
                : navigate(`/${item.media_type}/view/${item.id}`);
        }

    }





    useEffect(() => {
        const isLikedItem = moviesLiked.find(movie => movie.id === item.id) || showLiked.find(show => show.id === item.id)
        const isSavedItem = moviesSaved.find(movie => movie.id === item.id) || showSaved.find(show => show.id === item.id)
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
                    <HeartIcon className="size-6 text-red-500 mr-3 cursor-pointer hover:size-8" />
                    <BookmarkIcon className=" size-6 text-white cursor-pointer hover:size-8" />
                </div>
            )
        } else if (saveItem) {
            return (
                <div className="absolute top-2 right-2 h-10 flex flex-row justify-center ">
                    <BookmarkIcon className=" size-6 text-red-500 cursor-pointer hover:size-8" />
                </div>
            )
        } else if (likeItem) {
            return (
                <div className="absolute top-2 right-2 h-10 flex flex-row justify-center ">
                    <HeartIcon className="size-6 text-red-500 mr-3 cursor-pointer hover:size-8" />
                </div>
            )

        }

        return null
    }


    return (
        <article
            onClick={handleClickItem}
            className="relative w-[176px] h-[256px] transform cursor-pointer"
        >
            <div className="w-full h-full rounded-2xl overflow-hidden shadow-lg relative">
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent 
                    transition-opacity duration-300 "></div>

                {/* Image */}
                <img
                    className="w-full h-full object-cover rounded-2xl"
                    src={getImageUrl(item?.poster_path, 'original')}
                    alt={item?.title || item?.name}
                    onError={(e) => {
                        e.target.src = "https://placehold.co/176x256?text=Sorry,%0Awe+work+to+improve&font=roboto&size=18"
                        setIsErrorImage(true)
                    }}
                />
            </div>
            {showIcons()}
        </article>
    )

}

export default Card