import { FC } from 'react';
import { Outlet } from 'react-router-dom';

type ProtectedProps = {
  children: React.ReactElement;
};

export const ProtectedRoute = ({ children }: ProtectedProps) => children;
