import { useDispatch } from "react-redux";
import i18n from "../../i18n";
import { languageIsEn , languageIsEs } from "../../features/languages/languagesSlice";
import { useGetItems } from "../../hooks/getItems";
import { useEffect } from "react";

function Language() {

    const dispatch = useDispatch();
    const languages = useGetItems(['Languages']);
    useEffect(() => {
        console.log(languages)
    },[languages])

    
const handleEn = ()=>{
    i18n.changeLanguage('en');
    dispatch(languageIsEn())
}

const handleEs = ()=>{
    i18n.changeLanguage('es');
   dispatch(languageIsEs())
}

    return (
        <>
            <div className="absolute top-20 -left-6 w-24 pb-4 rounded-b-lg bg-black/50 backdrop-blur-md z-50">
                <ul className="flex flex-col justify-center items-center">
                    <li
                        onClick={() =>handleEn()} 
                        className=" font-poppins cursor-pointer hover:text-red-700 hover:font-bold ">EN - USA</li>
                    <li
                        onClick={() => handleEs()}
                        className=" font-poppins cursor-pointer hover:text-red-700 hover:font-bold ">ES - ESP</li>
                </ul>
            </div>

        </>
    )

}

export default Language;