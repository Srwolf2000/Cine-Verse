import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useSelector(state => state.authLogin);

    if (!isAuthenticated) {

        return <Navigate to="/signin" replace />;
    }

   
    return children;
};

export default ProtectedRoute;
