import { ChevronDownIcon, MagnifyingGlassIcon, ChevronUpIcon } from "@heroicons/react/16/solid";
import { PrimaryButton } from "../Button/Button";
import { NavLink } from "react-router";
import { useState } from "react";



function Nav() {
  const [active, setActive] = useState(false)


  const lists = [
    {
      name: 'Home',
      to: "/",
    },
    {
      name: 'Trend',
      to: 'movies/trend'
    },
    {
      name: 'Movies',
      to: 'movies'
    },
    {
      name: 'Show',
      to: 'show'
    },
    {
      name: 'genre',
      to: 'genre'
    }
  ]


  return (

    <nav className=" fixed left-1/2 transform -translate-x-1/2 h-20 w-[70%] rounded-b-lg px-10 top-0 pt-6 bg-black/50 backdrop-blur-md z-50">
      <div className=" flex flex-row justify-between w-full ">
        <ul className="flex flex-row items-center gap-7  text-white font-poppins font-medium ">

          <NavLink to={'/'}>
            <li className="font-poppins font-bold text-lg ">
              Cine <span className="font-poppins font-bold text-lg text-red-700">Verse</span>
            </li>
          </NavLink>


          {lists.map((list, index) => (
            <NavLink
              key={index}
              to={list.to}
              className={({ isActive }) => `${isActive ? 'bg-red-700 rounded-lg text-white p-1' : ''} hover:bg-white hover:rounded-lg hover:text-black hover:p-1`}>
              <li >
                {list.name}
              </li>
            </NavLink>
          ))}


        </ul>


        <ul className=" flex flex-row items-center gap-7 text-white  ">

          <NavLink
            to={'search'}
            className={({ isActive }) => `${isActive ? 'bg-red-500 rounded-full  p-1' : ''} hover:bg-red-700 hover:rounded-full hover:p-1`}>
            <li >
              <MagnifyingGlassIcon className="size-6" />
            </li>
          </NavLink>

          <NavLink>
            <li
              onMouseEnter={() => setActive(true)}
              onMouseLeave={() => setActive(false)}
              className=" flex flex-row">
              ES  {active ? <ChevronUpIcon className="size-6" /> : <ChevronDownIcon className="size-6" />}
            </li>
          </NavLink>



          <li>
            <PrimaryButton text={'Login'} />
          </li>


        </ul>
      </div>
    </nav>

  )

}

export default Nav