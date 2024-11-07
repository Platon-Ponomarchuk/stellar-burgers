import { Navigate, useLocation } from 'react-router-dom';
import { selectUser } from '../../services/Slices/UserSlice/UserSlice';
import { useSelector } from '../../services/store';

type ProtectedProps = {
  inAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({ inAuth = true, children }: ProtectedProps) => {
  const user = useSelector(selectUser);
  const isAuth = user.email !== '';
  const location = useLocation();

  if (!isAuth && !inAuth) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  if (isAuth && inAuth) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate to={from} />;
  }

  return children;
};
