import cn from 'classnames';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { AppDispatch, RootState } from '../../store/store';
import { getProfile, userActions } from '../../store/user.slice';
import cl from './Layout.module.css';

export const Layout = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const profile = useSelector((s: RootState) => s.user.profile);
	const products = useSelector((s: RootState) => s.cart.products);

	useEffect(() => {
		dispatch(getProfile());
	}, [dispatch]);

	const logOut = () => {
		dispatch(userActions.logout());
		navigate('auth/login');
	};

	return (
		<div className={cl.layout}>
			<div className={cl.sidebar}>
				<div className={cl.user}>
					<img className={cl.avatar} src='/Intersect.svg' alt='avatar' />
					<div className={cl.name}>{profile?.name}</div>
					<div className={cl.email}>{profile?.email}</div>
				</div>
				<div className={cl.menu}>
					<NavLink
						to='/'
						className={({ isActive }) =>
							cn(cl.link, {
								[cl.active]: isActive,
							})
						}
					>
						<img src='/menu-icon.svg' alt='menu-icon' />
						Menu
					</NavLink>
					<NavLink
						to='/cart'
						className={({ isActive }) =>
							cn(cl.link, {
								[cl.active]: isActive,
							})
						}
					>
						<img src='/cart-icon.svg' alt='cart-icon' />
						Cart
						<br />
						<span className={cl.cartCount}>
							{products.reduce((acc, item) => (acc += item.count), 0)}
						</span>
					</NavLink>
				</div>
				<Button className={cl.exit} onClick={logOut}>
					<img src='/exit.svg' alt='выход' />
					Выход
				</Button>
			</div>
			<div className={cl.content}>
				<Outlet />
			</div>
		</div>
	);
};
