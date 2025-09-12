import { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { fetchSearch } from "../features/search/searchSlice";
import { useGetItems } from "../hooks/getItems";
import { useDebounce } from "../hooks/Debounce";
import { clearData } from "../hooks/clearData";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import Card from '../components/Card/Card';


function Search() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const stateLanguages = useSelector((state) => state.languages.language)
    const languages = stateLanguages.en ? 'en-US' : 'es-ES';
    const value = useDebounce(search, 600);

    useEffect(() => {
        clearData(['Search'], dispatch);
        return () => {
            clearData(['Search'], dispatch);
        }
    }, [dispatch,languages])


    useEffect(() => {
        dispatch((fetchSearch({keyword:value, languages:languages})))
    }, [dispatch, value,languages])

    const inputs = useGetItems(['Search']);



    const searchIsError = value.length > 0 && inputs[0].items.length === 0

    const handleShow = () => {
        if (searchIsError) {
            return <p className="text-center text-2xl font-semibold text-white mt-20"> {t('search.noResults',{query:search})} </p>
        }
        return inputs[0]?.items?.map((item) => {
            return (
                <Card item={item}
                    key={item.id} />
            )

        })


    }

    return (
        <>
            <div className="relative flex justify-center w-full">
                <MagnifyingGlassIcon className=" absolute top-28 left-40 size-8 text-black/70" />
                <input
                    className=" w-4/5 h-16 mt-24 rounded-lg px-16 text-2xl"
                    type="text"
                    placeholder={t('search.placeholder')}
                    onChange={event => setSearch(event.target.value)} />
            </div>
            <div className="w-full flex justify-center items-center">
                <div className={searchIsError ? "flex justify-center" : "grid grid-cols-5 m-auto gap-20 py-16"}>
                    {handleShow()}
                </div>
            </div>
        </>

    )
}


export default Search