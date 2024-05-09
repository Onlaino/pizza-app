import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

interface IRequireAuthProps {
	children: ReactNode;
}

export const RequireAuth = ({ children }: IRequireAuthProps) => {
	const jwt = useSelector((s: RootState) => s.user.jwt);

	if (!jwt) {
		return <Navigate to={'/auth/login'} replace/>
	}
	return <div>{children}</div>;
};
