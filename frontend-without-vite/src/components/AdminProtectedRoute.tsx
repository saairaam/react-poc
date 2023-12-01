import { Navigate, Outlet } from 'react-router-dom';
import useReduxAuthState from '../use-redux-auth-state';

const AdminProtectedRoute = ({ redirectPath = '/landing', children }: any) => {
  const auth = useReduxAuthState();
  const { user } = auth;
  if (user?.role !== 'ADMIN') {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};
export default AdminProtectedRoute;
