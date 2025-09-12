import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { updateUserData, openModal } from "../../features/auth/authLoginSlice"
import { getImageUrl } from "../../utils/getImageUrl"
import { HeartIcon, BookmarkIcon } from "@heroicons/react/16/solid"


function DetailContainer({ item }) {

    const navigate = useNavigate();
    const dispatch = useDispatch()
    const userIsLogIn = useSelector((state) => state.authLogin)
    console.log(userIsLogIn)



    const urlMovie = item.title? true : false;
    const urlShow = item.name? true : false;

    console.log(urlMovie, urlShow)

    const handleClickItem = () => urlMovie || urlShow
        ? navigate(`/${urlMovie?'movie':'show'}/view/${item.id}`)
        : navigate(`/${item.media_type}/view/${item.id}`);


    const handleClickLikedItem = () => {
        if (userIsLogIn.isAuthenticated) {
            if (urlMovie) {
                dispatch(updateUserData({ type: 'toggleLikedMovie', item: item }))

            } else if (urlShow) {
                dispatch(updateUserData({ type: 'toggleLikedShow', item: item }))

            }

        } else {
            dispatch(openModal())
        }



    }

    const handleClickSavedItem = () => {
        if (userIsLogIn.isAuthenticated) {
            if (urlMovie) {
                dispatch(updateUserData({ type: 'toggleSavedMovie', item: item }))

            } else if (urlShow) {
                dispatch(updateUserData({ type: 'toggleSavedShow', item: item }))

            }

        }else {
            dispatch(openModal())
        }


    }

    return (
        <div
            onClick={handleClickItem}
            className="absolute flex flex-col left-1/2 -translate-x-1/2 -top-10 z-50 max-w-80 min-w-72 h-90 rounded-xl overflow-hidden bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,07)_60%,_rgba(03,7,18,1)_90%)] ">
            <div className="w-full h-3/6 mb-3 overflow-hidden">
                <img
                    className="w-full h-full object-cover rounded-t-xl"
                    src={getImageUrl(item?.backdrop_path)}
                    alt={item.title}
                    onError={(e) => {
                        e.target.src = "https://placehold.co/320x180?text=Sorry,%0Awe+work+to+improve&font=roboto&size=18";
                    }}
                />
            </div>
            <div className="w-20 h-10 flex flex-row justify-center ">
                <HeartIcon
                    onClick={(e) => {
                        e.stopPropagation();
                        handleClickLikedItem();
                    }}
                    className="size-6 text-white mr-3 cursor-pointer hover:size-8" />
                <BookmarkIcon
                    onClick={(e) => {
                        e.stopPropagation();
                        handleClickSavedItem()
                    }}
                    className=" size-6 text-white cursor-pointer hover:size-8" />
            </div>
            <div className="w-full h-1/4 px-4 mb-4">
                <p className="font-poppins font-semibold text-base text-white">{item?.title ?? "Title doesn't available"}</p>
                <p className="line-clamp-3 break-words font-poppins font-light text-xs text-white">{item?.overview ?? "Text doesn't available"}</p>
            </div>
        </div>
    )
}

export default DetailContainer 