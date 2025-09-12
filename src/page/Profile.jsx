import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { logout } from "../features/auth/authLoginSlice";
import Section from "../components/Section/Section";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    email,
    birthdate,
    likedMovies = [],
    likedShows = [],
    savedMovies = [],
    savedShows = [],
    isAuthenticated
  } = useSelector((state) => state.authLogin);


  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signin');
    }
  }, [isAuthenticated, navigate]);


  const handleLogout = () => {
    dispatch(logout());
    navigate('/signin');
  };

  return (
    <div className="min-h-screen  text-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-6 sm:p-8 mb-8 border border-gray-700">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          {t('profile.userProfile')}
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
            <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">{t('profile.email')}:</p>
            <p className="text-lg sm:text-xl font-medium">{email.value}</p>
          </div>
          <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
            <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">{t('profile.birthdate')}:</p>
            <p className="text-lg sm:text-xl font-medium">{birthdate}</p>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            {t('profile.logout')}
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {likedMovies.length > 0 && (
          <Section
            name={t('profile.likedMovies')}
            items={likedMovies}
            code="1"
            profile={true}
          />
        )}

        {likedShows.length > 0 && (
          <Section
            name={t('profile.likedShows')}
            items={likedShows}
            code="2"
            profile={true}
          />
        )}

        {savedMovies.length > 0 && (
          <Section
            name={t('profile.savedMovies')}
            items={savedMovies}
            code="1"
            profile={true}
          />
        )}

        {savedShows.length > 0 && (
          <Section
            name={t('profile.savedShows')}
            items={savedShows}
            code="2"
            profile={true}
          />
        )}

        {!likedMovies.length && !likedShows.length && !savedMovies.length && !savedShows.length && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-xl">
              {t('profile.noContent')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;