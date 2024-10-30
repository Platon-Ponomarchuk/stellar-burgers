import { Navigate } from 'react-router-dom';
import { selectUser } from '../../services/Slices/UserSlice';
import { useSelector } from '../../services/store';

type ProtectedProps = {
  inAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({ inAuth = true, children }: ProtectedProps) => {
  const user = useSelector(selectUser);
  const isAuth = user.email !== '';

  if (!isAuth && !inAuth) {
    return <Navigate to='/login' />;
  }

  if (isAuth && inAuth) {
    return <Navigate to='/' />;
  }

  return children;
};
