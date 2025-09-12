import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
    const { isAuthenticated } = useSelector(state => state.authLogin);

    if (isAuthenticated) {
   
        return <Navigate to="/movie" replace />;
    }


    return children;
};

export default PublicRoute;
