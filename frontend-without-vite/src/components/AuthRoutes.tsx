import { Navigate, Outlet } from 'react-router-dom';
import useReduxAuthState from '../use-redux-auth-state';

const AuthRoute = ({ redirectPath = '/', children }: any) => {
  const auth = useReduxAuthState();
  const { user } = auth;
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};
export default AuthRoute;
