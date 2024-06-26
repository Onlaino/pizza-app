import './index.css';
import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter, defer } from 'react-router-dom';
import axios from 'axios';
import { Cart } from './pages/Cart/Cart.tsx';
import { Layout } from './layout/Menu/Layout.tsx';
import { Product } from './pages/Product/Product.tsx';
import { Error as ErrorPage } from './pages/Error/Error.tsx';
import { PREFIX } from './helpers/API.ts';
import { AuthLayout } from './layout/Auth/AuthLayout.tsx';
import { Login } from './pages/Login/Login.tsx';
import { Register } from './pages/Register/Register.tsx';
import { RequireAuth } from './helpers/RequireAuth.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import { Success } from './pages/Success/Success.tsx';

const Menu = lazy(() => import('./pages/Menu/Menu.tsx'));

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<RequireAuth>
				<Layout />
			</RequireAuth>
		),
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
				path: '/success',
				element: <Success/>
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
		path: '/auth',
		element: <AuthLayout />,
		children: [
			{
				path: 'login',
				element: <Login />,
			},
			{
				path: 'register',
				element: <Register />,
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
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
);
