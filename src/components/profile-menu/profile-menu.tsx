import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from '../../services/store';
import { logoutUser } from '../../services/Slices/UserSlice/UserSlice';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    if (window.confirm('Вы действительно хотите выйти?')) {
      dispatch(logoutUser());
    }
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
