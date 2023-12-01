import { Navigate, Outlet } from 'react-router-dom';
import useReduxAuthState from '../use-redux-auth-state';

const UserProtectedRoute = ({ redirectPath = '/notlogin', children }: any) => {
  const auth = useReduxAuthState();
  const { user } = auth;
  if (user?.role !== 'USER') {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};
export default UserProtectedRoute;
