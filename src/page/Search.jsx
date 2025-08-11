import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchSearch } from "../features/search/searchSlice";
import { useGetItems } from "../hooks/getItems";
import { useDebounce } from "../hooks/Debounce";
import { clearData } from "../utils/clearData";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import Card from '../components/Card/Card';


function Search() {

    const dispatch = useDispatch();
    const [search, setSearch] = useState('');

    const value = useDebounce(search, 600);

    useEffect(() => {
        clearData(['Search'], dispatch);
        return () => {
            clearData(['Search'], dispatch);
        }
    }, [dispatch])


    useEffect(() => {
        dispatch((fetchSearch(value)))
    }, [dispatch, value])

    const inputs = useGetItems(['Search']);

   

    const searchIsError = value.length > 0 && inputs[0].items.length === 0

    const handleShow = () => {
        if (searchIsError) {
            return <p className="text-center text-2xl font-semibold text-white mt-20">We sorry, no results found for "{search}"</p>
        }
        return inputs[0]?.items?.map((item) => {
            return (
                <Card movie={item}
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
                    placeholder="You find movies, show and more"
                    onChange={event => setSearch(event.target.value)} />
            </div>
            <div className="w-full flex justify-center items-center">
                <div className={searchIsError? "flex justify-center":"grid grid-cols-5 m-auto gap-20 py-16"}>
                    {handleShow()}
                </div>
            </div>
        </>

    )
}


export default Search