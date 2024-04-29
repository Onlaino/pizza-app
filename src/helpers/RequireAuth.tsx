import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface IRequireAuthProps {
	children: ReactNode;
}

export const RequireAuth = ({ children }: IRequireAuthProps) => {
	const jwt = localStorage.getItem('jwt');
	if (!jwt) {
		return <Navigate to={'/auth/login'} replace/>
	}
	return <div>{children}</div>;
};
