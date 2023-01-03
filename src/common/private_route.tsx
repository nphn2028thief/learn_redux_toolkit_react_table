import { Navigate } from 'react-router-dom';
import AdminHomePage from '../pages/admin_home_page';

function PrivateRoute() {
    const isLogin = Boolean(localStorage.getItem('token'));

    if (!isLogin) {
        return <Navigate to="/login" replace />;
    } else {
        return <AdminHomePage />;
    }
}

export default PrivateRoute;
