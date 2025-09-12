import { useNavigate, useParams } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { closeModal } from "../../features/cardDetailModal/cardDetailSlice"
import { useGetItems } from "../../hooks/getItems"
import { getImageUrl } from "../../utils/getImageUrl"
import { fetchAllMovieData, fetchAllShowData } from "../../features/cardDetailModal/movieData"
import { time } from "../../utils/time"
import { HeartIcon, PlusCircleIcon, ChevronLeftIcon } from "@heroicons/react/16/solid"
import Card from "../Card/Card"
import IsLoading from "../../page/IsLoading"
import { HandleError } from "../HandleError/HandleError"
import { updateUserData, openModal } from "../../features/auth/authLoginSlice"





function DetailItems() {

    const [isUiReady, setIsUiReady] = useState(false);
    const [isError, setIsError] = useState(false);
    const [likeItem, setLikeItem] = useState(false)
    const [saveItem, setSaveItem] = useState(false)



    const navigate = useNavigate()
    const { media, id } = useParams();
    const dispatch = useDispatch()
    const { t } = useTranslation();


    const userIsLogIn = useSelector((state) => state.authLogin)
    const stateLanguages = useSelector((state) => state.languages)

    const languages = stateLanguages.language.en ? 'en-US' : 'es-ES';
    const item = useGetItems(['Detail']);


    const moviesLiked = useSelector(state => state.authLogin.likedMovies);
    const showLiked = useSelector(state => state.authLogin.likedShows);

    const moviesSaved = useSelector(state => state.authLogin.savedMovies);
    const showSaved = useSelector(state => state.authLogin.savedShows);

    useEffect(() => {
        const isLikedItem = moviesLiked.find(movie => movie.id === item[0].data.id) || showLiked.find(show => show.id === item[0].data.id)
        const isSavedItem = moviesSaved.find(movie => movie.id === item[0].data.id) || showSaved.find(show => show.id === item[0].data.id)
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


    useEffect(() => {
        return () => {
            dispatch(closeModal())
        }
    }, [dispatch])


    useEffect(() => {
        if (media === 'movie') {
            dispatch(fetchAllMovieData(id, languages))
        } else if (media === 'show' || media === 'tv') {
            dispatch(fetchAllShowData(id, languages))
        }
    }, [media, id, dispatch, languages])



    const logo = item[0]?.images?.logos?.find((logo) => {
        return logo.iso_639_1 === 'en'
    });

    const showLogo = () => {
        return logo ? (
            <img
                className="w-100  object-contain"
                src={getImageUrl(logo?.file_path, "original")} alt={item[0].data?.title} />
        ) : (
            <h2 className="font-poppins text-white text-2xl font-bold">{item[0]?.data?.title}</h2>
        )
    }

    const timeMovie = () => {
        const runTime = time(item[0]?.data?.runtime)


        return runTime
    }


    const urlMovie = item[0].data.title ? true : false;
    const urlShow = item[0].data.name ? true : false;

    const handleClickLikedItem = () => {
        if (userIsLogIn.isAuthenticated) {
            if (urlMovie) {
                dispatch(updateUserData({ type: 'toggleLikedMovie', item: item[0].data }))

            } else if (urlShow) {
                dispatch(updateUserData({ type: 'toggleLikedShow', item: item[0].data }))

            }

        } else {
            dispatch(openModal())
        }
    }


    const handleClickSavedItem = () => {
        if (userIsLogIn.isAuthenticated) {
            if (urlMovie) {
                dispatch(updateUserData({ type: 'toggleSavedMovie', item: item[0].data }))

            } else if (urlShow) {
                dispatch(updateUserData({ type: 'toggleSavedShow', item: item[0].data }))

            }

        } else {
            dispatch(openModal())
        }


    }


    const showTimeAndDate = () => {
        if (timeMovie() && item[0]?.data?.release_date) {
            return `${timeMovie()} | ${item[0]?.data?.release_date}`
        } else if (!timeMovie() && item[0]?.data?.release_date) {
            return item[0]?.data?.release_date
        } else if (timeMovie() && !item[0].data.release_date) {
            return timeMovie()
        }
        return ""
    }

    const handleBackClick = () => {
        window.scrollTo(0, 0);
        navigate(-1);

    }



    useEffect(() => {

        const allSucceeded =
            item[0].loadingStateCast === 'succeeded' &&
            item[0].loadingStateImage === 'succeeded' &&
            item[0].loadingStateItem === 'succeeded' &&
            item[0].loadingStateSimilar === 'succeeded';


        const allFailed =
            item[0].errorStateCast != null ||
            item[0].errorStateImage != null ||
            item[0].errorStateItem != null ||
            item[0].errorStateSimilar != null;



        if (allSucceeded && !allFailed) {
            requestAnimationFrame(() => setIsUiReady(true))
            setIsError(false);
        } else if (allFailed) {
            setIsUiReady(true);
            setIsError(true)
        }
    }, [item]);






    return (
        <div className="relative mx-auto w-full min-h-screen bg-gradient-to-b from-black/90 to-gray-900 shadow-2xl pt-20">

            <div className="fixed top-20 left-4 z-50">
                <button
                    onClick={handleBackClick}
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg 
                        bg-black/40 backdrop-blur-sm hover:bg-black/60 
                        transition-all duration-300 group"
                >
                    <ChevronLeftIcon className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />

                </button>
            </div>

            {!isUiReady ? (
                <IsLoading />
            ) : isError ? (
                <HandleError />
            ) : (
                <>
    
                    <div className="relative w-full h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] xl:h-[80vh]">
                        <img
                            className="w-full h-full object-cover"
                            src={getImageUrl(item[0]?.data?.backdrop_path, "original")}
                            alt={item[0].data?.title}
                        />
                      
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/70"></div>

                        <div className="absolute bottom-[-2rem] left-1/2 transform -translate-x-1/2 w-full max-w-md px-4">
                            <div className="flex justify-center">
                                {showLogo()}
                            </div>
                        </div>
                    </div>

                    <div className="container relative mx-auto px-4 mt-16">
                        <div className="absolute top-4 right-4 flex space-x-3">
                            <button className="p-2 rounded-full bg-black/30 hover:bg-black/50 transition-all duration-300 transform hover:scale-110">
                                <HeartIcon
                                    onClick={handleClickLikedItem}
                                    className={`w-6 h-6 ${likeItem ? 'text-red-600' : 'text-white'}  hover:text-red-900`} />
                            </button>
                            <button className="p-2 rounded-full bg-black/30 hover:bg-black/50 transition-all duration-300 transform hover:scale-110">
                                <PlusCircleIcon
                                    onClick={handleClickSavedItem}
                                    className={`w-6 h-6 ${saveItem ? 'text-red-600' : 'text-white'}  hover:text-red-900`} />
                            </button>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8 mt-8">
                            <div className="space-y-4">
                                <p className="text-gray-300 font-medium text-lg">{showTimeAndDate()}</p>
                                <p className="text-gray-200 leading-relaxed">{item[0]?.data?.overview}</p>
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-white font-semibold mb-2">Genres</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {item[0]?.data?.genres?.map((genre) => (
                                            <span key={genre.id} className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm">
                                                {genre.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold mb-2">Cast</h3>
                                    <p className="text-gray-300">
                                        {item[0]?.cast?.cast?.slice(0, 5).map((people) => people.name).join(', ')}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Similar Titles Section */}
                        <section className="mt-16 mb-12">
                            <h2 className="text-2xl font-semibold text-white mb-8 text-center">
                                {t('sections.similar')}
                            </h2>
                            <div className="max-w-[95%] mx-auto">
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6 md:gap-8">
                                    {item[0]?.similar?.map((similarItem) => (
                                        <div key={similarItem.id} className="flex justify-center">
                                            <Card item={similarItem} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    </div>
                </>
            )}
        </div>
    )

}

export default DetailItems