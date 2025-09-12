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



    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-8 px-4 sm:px-6 lg:px-8">
            {/* Search Input */}
            <div className="max-w-4xl mx-auto mt-20 sm:mt-24">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <MagnifyingGlassIcon className="w-6 h-6 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-12 pr-4 py-4 text-lg sm:text-xl
                            bg-gray-800/50 backdrop-blur-sm text-white placeholder-gray-400
                            border border-gray-700 rounded-xl
                            focus:ring-2 focus:ring-blue-500 focus:border-transparent
                            transition-all duration-300
                            hover:bg-gray-800/70"
                        placeholder={t('search.placeholder')}
                        onChange={event => setSearch(event.target.value)}
                    />
                </div>
            </div>

            {/* Results */}
            <div className="max-w-[90%] mx-auto mt-8 sm:mt-12">
                {searchIsError ? (
                    <div className="flex flex-col items-center justify-center min-h-[300px]">
                        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 text-center max-w-lg">
                            <MagnifyingGlassIcon className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                            <p className="text-xl sm:text-2xl font-semibold text-white">
                                {t('search.noResults', {query: search})}
                            </p>
                            <p className="mt-2 text-gray-400">
                                Try adjusting your search or browse our categories
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6 md:gap-8">
                        {inputs[0]?.items?.map((item) => (
                            <div key={item.id} className="flex justify-center">
                                <Card item={item} />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Loading State (Optional) */}
            {value && !searchIsError && !inputs[0]?.items?.length && (
                <div className="flex justify-center items-center mt-12">
                    <div className="animate-pulse flex space-x-4">
                        <div className="rounded-full bg-gray-700 h-12 w-12"></div>
                        <div className="flex-1 space-y-4 py-1">
                            <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                            <div className="space-y-2">
                                <div className="h-4 bg-gray-700 rounded"></div>
                                <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}


export default Search