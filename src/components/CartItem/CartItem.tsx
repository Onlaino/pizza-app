import cl from './CartItem.module.css';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { cartActions } from '../../store/cart.slice';
import { ICartItemsProps } from './CartItem.props';

export const CartItem = (props: ICartItemsProps) => {
	const dispatch = useDispatch<AppDispatch>();

	const add = (e: React.MouseEvent<HTMLButtonElement>) => {};

	const increase = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		dispatch(cartActions.addToCart(props.id));
	};

	const remove = () => {
		dispatch(cartActions.delete(props.id));
	};

	const decrease = () => {
		dispatch(cartActions.remove(props.id));
	};

	return (
		<div className={cl.item}>
			<div
				className={cl.image}
				style={{ backgroundImage: `url(${props.image})` }}
			></div>
			<div className={cl.descr}>
				<div className={cl.name}>{props.name}</div>
				<div className={cl.price}>{props.price} &nbsp;₽</div>
			</div>
			<div className={cl.actions}>
				<button onClick={decrease} className={cl.minus}>
					<img src='/minus.svg' alt='remove' />
				</button>
				<div className={cl.count}>{props.count}</div>
				<button onClick={increase} className={cl.plus}>
					<img src='/plus.svg' alt='' />
				</button>

				<button onClick={remove} className={cl.remove}>
					<img src='/remove-icon.svg' alt='add' />
				</button>
			</div>
		</div>
	);
};
