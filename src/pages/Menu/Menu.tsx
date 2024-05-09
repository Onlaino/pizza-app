import cl from './Menu.module.css';
import { ChangeEvent, FC, memo, useCallback, useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';

import { IProduct } from '../../interfaces/product.interface';
import { PREFIX } from '../../helpers/API';
import { Heading } from '../../components/Heading/Heading';
import { Search } from '../../components/Search/Search';
import { MenuList } from './MenuList/MenuList';

const Menu: FC = memo(() => {
	const [products, setProducts] = useState<IProduct[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | undefined>();
	const [filter, setFilter] = useState<string>('');

	console.log('render');

	useEffect(() => {
		getMenu(filter);
	}, [filter]);


	const runFilter = async (e: ChangeEvent<HTMLInputElement>) => {
		
		try {
			setIsLoading(true);
			const { data } = await axios.get<IProduct[]>(
				`${PREFIX}/products?name=${filter}`
			);
			setProducts(data);
			setIsLoading(false);
		} catch (e) {
			console.error(e);
			if (e instanceof AxiosError) {
				setIsLoading(false);
			}
		}
	};

	const getMenu = async (name?: string) => {
		try {
			setIsLoading(true);
			const { data } = await axios.get<IProduct[]>(`${PREFIX}/products`, {
				params: {
					name,
				},
			});
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

	return (
		<>
			<div className={cl.head}>
				<Heading>Меню</Heading>
				<Search
					value={filter}
					onChange={(e: ChangeEvent<HTMLInputElement>) =>
						setFilter(e.target.value)
					}
					placeholder='Введите блюдо или состав'
				/>
			</div>
			<div>
				{error && <h3>{error}</h3>}
				{!isLoading && products.length > 0 && <MenuList products={products} />}
				{isLoading && <h3>Загружаем продукты...</h3>}
				{!isLoading && products.length === 0 && <>Не найдено блюд по запросу</>}
			</div>
		</>
	);
});
export default Menu;
