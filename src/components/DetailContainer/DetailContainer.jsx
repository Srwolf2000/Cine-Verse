import { useNavigate, useParams, useLocation} from "react-router";
import { getImageUrl } from "../../utils/getImageUrl"
import { HeartIcon, PlusCircleIcon } from "@heroicons/react/16/solid"


function DetailContainer({ item }) {
    const navigate = useNavigate()
    const { media } = useParams();
    const url = useLocation()
    const urlCurrent =  url.pathname.includes('search') ? true : false ; 
   
    const urlNew = (id) => urlCurrent ?navigate(`/${item.media_type}/view/${id}`)   : navigate(`/${media}/view/${id}`);
    const handleClick = () => urlNew(item.id);

    return (
        <div
            onClick={handleClick}
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
                <HeartIcon className="size-6 text-white mr-3 cursor-pointer hover:size-8" />
                <PlusCircleIcon className=" size-6 text-white cursor-pointer hover:size-8" />
            </div>
            <div className="w-full h-1/4 px-4 mb-4">
                <p className="font-poppins font-semibold text-base text-white">{item?.title ?? "Title doesn't available"}</p>
                <p className="line-clamp-3 break-words font-poppins font-light text-xs text-white">{item?.overview ?? "Text doesn't available"}</p>
            </div>
        </div>
    )
}

export default DetailContainer 