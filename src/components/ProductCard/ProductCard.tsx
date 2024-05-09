import cl from './ProductCard.module.css';
import { Link } from 'react-router-dom';
import { ProductCardProps } from './productCard.props';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { cartActions } from '../../store/cart.slice';

export const ProductCard = (props : ProductCardProps) => {
	const dispatch = useDispatch<AppDispatch>();

	const add = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		dispatch(cartActions.addToCart(props.id));
	}

	return (
		<Link to={`/product/${props.id}`} className={cl.link}>
			<div className={cl.card}>
				<div
					className={cl.head}
					style={{ backgroundImage: `url(${props.image})` }}
				>
					<div className={cl.price}>
						{props.price} &nbsp;
						<span className={cl.currency}>₽</span>
					</div>
					<button onClick={add} className={cl.addToCart}>
						<img src='/cart-button-icon.svg' alt='' />
					</button>
					<div className={cl.rating}>
						{props.rating}&nbsp;
						<img src='/star-icon.svg' alt='star-icon' />
					</div>
				</div>
				<div className={cl.footer}>
					<div className={cl.title}>{props.title}</div>
					<div className={cl.description}>{props.description}</div>
				</div>
			</div>
		</Link>
	);
};
