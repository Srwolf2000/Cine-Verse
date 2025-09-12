import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { ChevronDownIcon, MagnifyingGlassIcon, ChevronUpIcon } from "@heroicons/react/16/solid";
import { PrimaryButton } from "../Button/Button";
import { NavLink } from "react-router";
import Language from "../Language/Language";



function Nav() {
  const [menuActive, setMenuActive] = useState(false)
  const [languageMenuActive, setLanguageMenuActive] = useState(false)
  const { t } = useTranslation();
  const location = useLocation()
  const navigate = useNavigate();
  const openSection = useSelector((state) => state.authLogin.isAuthenticated)

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

  const textButton = () => {

    if (location.pathname.includes('signIn')) {
      return t('navbar.textButton.signUp')
    } else if (location.pathname.includes('signUp')) {
      return t('navbar.textButton.login')
    } else if (openSection) {
      return t('navbar.textButton.profile')
    } else {
      return t('navbar.textButton.login')
    }

  }

  const buttonAction = () => {
 if (location.pathname.includes('signIn')) {
      return navigate('signUp')
    } else if (location.pathname.includes('signUp')) {
      return navigate('signIn')
    } else if (openSection) {
      return navigate('profile')
    } else {
      return navigate('signIn')
    }
  

}


return (

  <nav className="fixed left-1/2 transform -translate-x-1/2 h-auto md:h-20 w-[95%] md:w-[85%] lg:w-[70%] py-3 rounded-b-lg top-0 bg-black/50 backdrop-blur-md z-50">
    <div className="flex flex-col md:flex-row justify-between px-4 md:px-6 py-4 md:py-0 w-full">
      {/* Logo and Mobile Menu Button */}
      <div className="flex justify-between items-center w-full md:w-auto">
        <NavLink to={'/'}>
          <div className="font-poppins font-bold text-lg text-white">
            Cine <span className="text-red-700">Verse</span>
          </div>
        </NavLink>
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMenuActive(!menuActive)}
        >
          {menuActive ? (
            <ChevronUpIcon className="size-6" />
          ) : (
            <ChevronDownIcon className="size-6" />
          )}
        </button>
      </div>

      {/* Navigation Links */}
      <div className={`${menuActive ? 'flex' : 'hidden'} md:flex flex-col md:flex-row w-full md:w-auto`}>
        <ul className="flex flex-col md:flex-row items-center gap-4 md:gap-7 text-white font-poppins font-medium mt-4 md:mt-0">
          {lists.map((list, index) => (
            <NavLink
              key={index}
              to={list.to}
              onClick={() => setMenuActive(false)}
              className={({ isActive }) => 
                `${isActive ? 'bg-red-700' : ''} 
                w-full md:w-auto text-center rounded-lg p-2 md:p-1
                hover:bg-white hover:text-black transition-all duration-300`
              }
            >
              <li>{list.name}</li>
            </NavLink>
          ))}
        </ul>

        <ul className="flex flex-col md:flex-row items-center gap-4 md:gap-7 text-white mt-4 md:mt-0">
          <NavLink
            to={'search'}
            onClick={() => setMenuActive(false)}
            className={({ isActive }) => 
              `${isActive ? 'bg-red-500' : ''} 
              rounded-full p-2 md:p-1 
              hover:bg-red-700 transition-all duration-300`
            }
          >
            <li>
              <MagnifyingGlassIcon className="size-6" />
            </li>
          </NavLink>

          <div className="relative flex flex-col md:flex-row items-center">
            <button
              onClick={() => setLanguageMenuActive(!languageMenuActive)}
              onMouseEnter={() => window.innerWidth >= 768 && setLanguageMenuActive(true)}
              onMouseLeave={() => window.innerWidth >= 768 && setLanguageMenuActive(false)}
              className="flex items-center gap-1 font-poppins cursor-pointer py-2 px-3 rounded-lg hover:bg-gray-800/50 transition-colors duration-200"
            >
              {t('navbar.language')}
              {languageMenuActive ? (
                <ChevronUpIcon className="size-6" />
              ) : (
                <ChevronDownIcon className="size-6" />
              )}
            </button>
            {languageMenuActive && (
              <div 
                className="md:absolute md:top-[calc(100%+4px)] md:left-1/2 md:-translate-x-1/2 
                  bg-gray-900/95 backdrop-blur-sm border border-gray-700/50 rounded-lg 
                  shadow-lg mt-1 md:mt-0 p-1 min-w-[120px]
                  transform origin-top transition-all duration-200 ease-out"
                onMouseEnter={() => window.innerWidth >= 768 && setLanguageMenuActive(true)}
                onMouseLeave={() => window.innerWidth >= 768 && setLanguageMenuActive(false)}
              >
                <div className="relative">
                  {/* Flecha indicadora */}
                  <div className="hidden md:block absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-gray-900/95 border-t border-l border-gray-700/50 transform rotate-45"></div>
                  <Language />
                </div>
              </div>
            )}
          </div>

          <li className="w-full md:w-auto">
            <PrimaryButton
              onClick={() => {
                buttonAction();
                setMenuActive(false);
              }}
              text={textButton()}
              className="w-full md:w-auto"
            />
          </li>
        </ul>
      </div>
    </div>
  </nav>

)

}

export default Nav