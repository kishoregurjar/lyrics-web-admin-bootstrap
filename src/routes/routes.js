import { Routes } from 'react-router-dom';
import commonRoutes from './commonRoutes';
import authRoutes from './authRoutes';

const AppRoutes = () => {
    return (
        <Routes>
            {commonRoutes}
            {authRoutes}
        </Routes>
    )
}

export default AppRoutes;