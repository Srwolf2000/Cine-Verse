import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDownIcon, MagnifyingGlassIcon, ChevronUpIcon } from "@heroicons/react/16/solid";
import { PrimaryButton } from "../Button/Button";
import { NavLink } from "react-router";
import Language from "../Language/Language";



function Nav() {
  const [active, setActive] = useState(false)
  const { t } = useTranslation();


  const lists = [
    {
      name: t('navbar.movie'),
      to: "/movie",
    },


    {
      name: t('navbar.show'),
      to: '/show'
    },

  ]


  return (

    <nav className=" fixed left-1/2 transform -translate-x-1/2 h-20 w-[70%]  rounded-b-lg  top-0 bg-black/50 backdrop-blur-md z-50">
      <div className=" flex flex-row h-full justify-between px-6 w-full ">
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
              className={({ isActive }) => `${isActive ? 'bg-red-700 rounded-lg text-white p-1' : ''} font-poppins hover:bg-white hover:rounded-lg hover:text-black hover:p-1`}>
              <li >
                {list.name}
              </li>
            </NavLink>
          ))}


        </ul>


        <ul className=" flex flex-row h-full items-center gap-7 text-white  ">

          <NavLink
            to={'search'}
            className={({ isActive }) => `${isActive ? 'bg-red-500 rounded-full  p-1' : ''} hover:bg-red-700 hover:rounded-full hover:p-1`}>
            <li >
              <MagnifyingGlassIcon className="size-6" />
            </li>
          </NavLink>

          <div
            className=" relative flex items-center h-full"
            onMouseEnter={() => setActive(true)}
            onMouseLeave={() => setActive(false)}>
            <li className=" flex flex-row font-poppins">
              {t('navbar.language')} {active ?<ChevronUpIcon className="size-6" /> : <ChevronDownIcon className="size-6" />}
            </li>
            {active && <Language />}
          </div>




          <li>
            <PrimaryButton text={t('navbar.login')} />
          </li>


        </ul>
      </div>
    </nav>

  )

}

export default Nav