import cl from './Menu.module.css'

import { FC } from 'react';
import { Heading } from '../../components/Heading/Heading';
import { Search } from '../../components/Search/Search';
import { ProductCard } from '../../components/ProductCard/ProductCard';

export const Menu: FC = () => {
	return (
		<>
			<div className={cl.head}>
				<Heading>Меню</Heading>
				<Search placeholder='Введите блюдо или состав' />
			</div>
			<div>
				<ProductCard
					id={1}
					title={'Наслаждение'}
					description='Салями, руккола, помидоры, оливки'
					price={300}
					rating={4.5}
					image='/product-demo.png'
				/>
			</div>
		</>
	);
};
