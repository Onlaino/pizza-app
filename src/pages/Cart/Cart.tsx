import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CartItem } from '../../components/CartItem/CartItem';
import { Heading } from '../../components/Heading/Heading';
import { PREFIX } from '../../helpers/API';
import { IProduct } from '../../interfaces/product.interface';
import { AppDispatch, RootState } from '../../store/store';
import cl from './Cart.module.css';
import { Button } from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { cartActions } from '../../store/cart.slice';

const DELIVEERY_FEE = 169;

export const Cart: FC = () => {
	const [cartProducts, setCartProducts] = useState<IProduct[]>([]);
	const products = useSelector((s: RootState) => s.cart.products);
	const jwt = useSelector((s: RootState) => s.user.jwt);
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();


	const calculateTotalPrice = (arr) => {
		if (arr.length > 0) {
			return arr
				.map((prod) => {
					const product = cartProducts.find((p) => p.id === prod.id);
					if (!product) return 0;
					return prod.count * product.price;
				})
				.reduce((acc, i) => (acc += i));
		} else {
			return 0;
		}
	};

	const totalPrice = calculateTotalPrice(products);

	const getItem = async (id: number) => {
		const { data } = await axios.get<IProduct>(`${PREFIX}/products/${id}`);
		return data;
	};
	const loadAllItems = async () => {
		const promises = products.map((i) => getItem(i.id));
		const res = await Promise.all(promises);
		setCartProducts(res);
	};
	const checkout = async () => {
		await axios.post(
			`${PREFIX}/order`,
			{
				products: products,
			},
			{
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			}
		);
		dispatch(cartActions.clear());
		navigate('/success');
	};

	useEffect(() => {
		loadAllItems();
	}, [products]);

	return (
		<>
			<Heading className={cl.head}>Корзина</Heading>
			{products.map((prod) => {
				const product = cartProducts.find((p) => p.id === prod.id);
				if (!product) return;
				return <CartItem key={prod.id} count={prod.count} {...product} />;
			})}
			<div className={cl.line}>
				<div className={cl.text}>Итог</div>
				<div className={cl.price}>
					{totalPrice}&nbsp;
					<span>₽</span>
				</div>
			</div>

			<hr className={cl.hr} />
			<div className={cl.line}>
				<div className={cl.text}>Доставка</div>
				<div className={cl.price}>
					{DELIVEERY_FEE}&nbsp;
					<span>₽</span>
				</div>
			</div>
			<hr className={cl.hr} />
			<div className={cl.line}>
				<div>
					Итог <span>({products.length})</span>
				</div>
				<div className={cl.price}>
					{totalPrice + DELIVEERY_FEE}&nbsp;
					<span>₽</span>
				</div>
			</div>
			<div className={cl.button}>
				<Button onClick={checkout} appearence='big'>
					Оформить
				</Button>
			</div>
		</>
	);
};
