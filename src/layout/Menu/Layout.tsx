import { Link, Outlet } from 'react-router-dom';
import cl from './Layout.module.css';
import { Button } from '../../components/Button/Button';

export const Layout = () => {
	console.log('first')
	return (
		<div className={cl.layout}>
			<div className={cl.sidebar}>
				<div className={cl.user}>
					<img src='/Intersect.png' alt='' />
					<div className={cl.name}>Oleg Vasilev</div>
					<div className={cl.email}>v.oleg@gmail.com</div>
				</div>
				<div className={cl.menu}>
					<Link to='/' className={cl.link}>
						<img src='/menu-icon.svg' alt='menu-icon' />
						Menu
					</Link>
					<Link to='/cart' className={cl.link}>
						<img src='/cart-icon.svg' alt='cart-icon' />
						Cart
					</Link>
				</div>
				<Button>
					<img src="/exit.svg" alt="выход" />
				</Button>
			</div>
			<div>
				<Outlet />
			</div>
		</div>
	);
}
