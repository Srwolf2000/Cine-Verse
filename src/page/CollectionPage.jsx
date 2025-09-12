import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Card from '../components/Card/Card';

function CollectionPage() {
    const navigate = useNavigate();
    const { type, collection } = useParams();
    const { t } = useTranslation();
    const { isAuthenticated, likedMovies, likedShows, savedMovies, savedShows } = useSelector(state => state.authLogin);

    // Redirigir si no está autenticado
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/signin');
        }
    }, [isAuthenticated, navigate]);

    // Determinar qué colección mostrar
    const getCollection = () => {
        if (type === 'movies') {
            return collection.includes('liked') ? likedMovies : savedMovies;
        } else {
            return collection.includes('liked') ? likedShows : savedShows;
        }
    };

    // Obtener el título de la colección
    const getTitle = () => {
        if (type === 'movies') {
            return collection.includes('liked') ? t('profile.likedMovies') : t('profile.savedMovies');
        } else {
            return collection.includes('liked') ? t('profile.likedShows') : t('profile.savedShows');
        }
    };

    const items = getCollection();

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold">{getTitle()}</h1>
                    <button
                        onClick={() => navigate('/profile')}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        {t('profile.backToProfile')}
                    </button>
                </div>

                {items.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {items.map(item => (
                            <Card key={item.id} item={item} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-400 text-xl">
                            No hay contenido en esta colección
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CollectionPage;
