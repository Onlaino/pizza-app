import cl from './Layout.module.css';
import { Button } from '../../components/Button/Button';
import { NavLink, Outlet } from 'react-router-dom';
import cn from 'classnames'

export const Layout = () => {

	return (
		<div className={cl.layout}>
			<div className={cl.sidebar}>
				<div className={cl.user}>
					<img className={cl.avatar} src='/Intersect.svg' alt='avatar' />
					<div className={cl.name}>Oleg Vasilev</div>
					<div className={cl.email}>v.oleg@gmail.com</div>
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
					</NavLink>
				</div>
				<Button className={cl.exit}>
					<img src='/exit.svg' alt='выход' />
					Выход
				</Button>
			</div>
			<div className={cl.content}>
				<Outlet />
			</div>
		</div>
	);
}
