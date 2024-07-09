import { Route } from 'react-router-dom';
// import ProtectedRoute from './protectedRoutes';
import { ROUTE_CONSTANT } from './constant';
import LoginPage from '../pages/auth/LoginPage/LoginPage';
import ProtectedRoute from './protectedRoutes';
import ShowProfile from '../pages/auth/Profile/ShowProfile';
import EditProfile from '../pages/auth/Profile/EditProfile';
import ChangePassword from '../pages/auth/ChangePassword/ChangePassword';
import ForgetPassword from '../pages/auth/ForgetPassword/ForgetPassword';
import ResetPassword from '../pages/auth/ResetPassword/ResetPassword';


const authRoutes = [
    <Route key="login" path={ROUTE_CONSTANT.AUTH.LOGIN} element={<LoginPage />} />,
    <Route key="forget-password" path={ROUTE_CONSTANT.AUTH.FORGET_PASSWORD} element={<ForgetPassword />} />,
    <Route key="reset-password" path={ROUTE_CONSTANT.AUTH.RESET_PASSWORD} element={<ResetPassword />} />,
    <Route key="profile" path={ROUTE_CONSTANT.AUTH.SHOW_PROFILE} element={<ProtectedRoute element={ShowProfile} />} />,
    <Route key="edit-profile" path={ROUTE_CONSTANT.AUTH.EDIT_PROFILE} element={<ProtectedRoute element={EditProfile} />} />,
    <Route key="change-password" path={ROUTE_CONSTANT.AUTH.CHANGE_PASSWORD} element={<ProtectedRoute element={ChangePassword} />} />,
]

export default authRoutes;