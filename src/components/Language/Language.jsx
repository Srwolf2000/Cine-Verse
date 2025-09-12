import { useDispatch } from "react-redux";
import i18n from "../../i18n";
import { languageIsEn , languageIsEs } from "../../features/languages/languagesSlice";



function Language() {

    const dispatch = useDispatch();



    
const handleEn = ()=>{
    i18n.changeLanguage('en');
    dispatch(languageIsEn())
}

const handleEs = ()=>{
    i18n.changeLanguage('es');
   dispatch(languageIsEs())
}

    return (
        <div className="w-full">
            <ul className="flex flex-col w-full">
                <li
                    onClick={handleEn}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-200 
                        hover:bg-blue-600/10 hover:text-blue-400 cursor-pointer transition-colors duration-200 rounded-md"
                >
                    <span className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0">
                        🇺🇸
                    </span>
                    <span>English</span>
                </li>
                <li
                    onClick={handleEs}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-200 
                        hover:bg-blue-600/10 hover:text-blue-400 cursor-pointer transition-colors duration-200 rounded-md"
                >
                    <span className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0">
                        🇪🇸
                    </span>
                    <span>Español</span>
                </li>
            </ul>
        </div>
    )

}

export default Language;