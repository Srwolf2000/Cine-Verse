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
    <div className="min-h-screen bg-gray-900 text-white my-16 p-8">
  
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg p-6 mb-8">
        <h1 className="text-3xl font-bold mb-6">{t('profile.userProfile')}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-400">{t('profile.email')}:</p>
            <p className="text-xl">{email.value}</p>
          </div>
          <div>
            <p className="text-gray-400">{t('profile.birthdate')}:</p>
            <p className="text-xl">{birthdate}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="mt-6 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
        >
          {t('profile.logout')}
        </button>
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