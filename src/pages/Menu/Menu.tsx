import cl from './Menu.module.css';
import { FC, useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';

import { IProduct } from '../../interfaces/product.interface';
import { PREFIX } from '../../helpers/API';

import { Heading } from '../../components/Heading/Heading';
import { Search } from '../../components/Search/Search';
import { MenuList } from './MenuList/MenuList';

 const Menu: FC = () => {
	const [products, setProducts] = useState<IProduct[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | undefined>();

	const getMenu = async () => {
		try {
			setIsLoading(true);
			
			const { data } = await axios.get<IProduct[]>(`${PREFIX}/products`);
			setProducts(data);
			setIsLoading(false);
		} catch (e) {
			console.error(e);
			if (e instanceof AxiosError) {
				setError(e.message);
			}
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getMenu();
	}, []);

	return (
		<>
			<div className={cl.head}>
				<Heading>Меню</Heading>
				<Search placeholder='Введите блюдо или состав' />
			</div>
			<div>
				{error && <h3>{error}</h3>}
				{!isLoading && <MenuList products={products}/>}
				{isLoading && <h3>Загружаем продукты...</h3>}
			</div>
		</>
	);
};
export default Menu;