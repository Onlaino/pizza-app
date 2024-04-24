import './index.css';
import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter, defer } from 'react-router-dom';

import { App } from './App.tsx';
import { Cart } from './pages/Cart/Cart.tsx';
import { Layout } from './layout/Menu/Layout.tsx';
import { Product } from './pages/Product/Product.tsx';
import { Error as ErrorPage } from './pages/Error/Error.tsx';
import { PREFIX } from './helpers/API.ts';
import axios from 'axios';

const Menu = lazy(() => import('./pages/Menu/Menu.tsx'));

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: '/',
				element: (
					<Suspense fallback={<>Loading...</>}>
						<Menu />
					</Suspense>
				),
			},
			{
				path: '/cart',
				element: <Cart />,
			},
			{
				path: '/product/:id',
				element: <Product />,
				errorElement: <h2>Error</h2>,
				loader: async ({ params }) => {
					// return defer({
					// 	data: axios
					// 		.get(`${PREFIX}/products/${params.id}`)
					// 		.then((data) => data),
					// });
					return defer({
						data: new Promise((res, reject) => {
							setTimeout(() => {
								res(
									axios
										.get(`${PREFIX}/products/${params.id}`)
										.then((data) => data)
										.catch((e) => reject(e))
								);
							}, 1000);
						}),
					});
					// await new Promise<void>((res) => {
					// 	setTimeout(() => {
					// 		res();
					// 	}, 1000);
					// });
					// const { data } = await axios.get(`${PREFIX}/products/${params.id}`);
					// return data;
				},
			},
		],
	},
	{
		path: '*',
		element: <ErrorPage />,
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
		<App />
	</React.StrictMode>
);
