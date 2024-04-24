import { Await, useLoaderData } from 'react-router-dom';
import { IProduct } from '../../interfaces/product.interface';
import { Suspense } from 'react';

export const Product = () => {
	const data = useLoaderData() as { data: IProduct };

	return (
		<>
			<Suspense fallback={'Loading...'}>
				{' '}
				<Await resolve={data.data}>
					{({ data }: IProduct) => <div>Product - {data.name} </div>}
				</Await>
			</Suspense>
		</>
	);
};
