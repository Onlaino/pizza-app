import cl from './MenuList.module.css';
import { ProductCard } from '../../../components/ProductCard/ProductCard';
import { MenuListProps } from './Menu.list.props';

export const MenuList = ({ products }: MenuListProps) => {
	return (
		<div className={cl.wrapper}>
			{products.map((p) => (
				<ProductCard
					id={p.id}
					key={p.id}
					title={p.name}
					description={p.ingredients.join(', ')}
					price={p.price}
					rating={p.rating}
					image={p.image}
				/>
			))}
		</div>
	);
};
