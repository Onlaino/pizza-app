import { Outlet } from 'react-router-dom';
import cl from './AuthLayout.module.css';

export const AuthLayout = () => {
	return (
		<div className={cl.layout}>
			<div className={cl.logo}>
				<img src="/logo.svg" alt="logotype Company" />
			</div>
			<div className={cl.content}>
				<Outlet />
			</div>
		</div>
	);
};
