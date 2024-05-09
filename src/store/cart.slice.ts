import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { loadState } from './storage';

export const CART_PERSISTENT_STATE = 'cartData';

export interface ICartProduct {
	id: number;
	count: number;
}

export interface ICartState {
	products: ICartProduct[];
}

const initialState: ICartState = loadState<ICartState>(CART_PERSISTENT_STATE) ??  {
	products: [],
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		clear: (state) => {
			state.products = [];
		},
		delete: (state, action: PayloadAction<number>) => {
			state.products = state.products.filter((i) => i.id !== action.payload);
		},
		remove: (state, action: PayloadAction<number>) => {
			const existed = state.products.find((i) => i.id === action.payload);
			if (!existed) {
				return;
			}
				if (existed.count === 1) {
					state.products = state.products.filter(
						(i) => i.id !== action.payload
					);
				} else {
					state.products.map((i) => {
						if (i.id === action.payload) {
							i.count -= 1;
						}
						return i;
					});
					return;
				}
			
		},
		addToCart: (state, action: PayloadAction<number>) => {
			const existed = state.products.find((i) => i.id === action.payload);
			if (!existed) {
				state.products.push({ id: action.payload, count: 1 });
				return;
			}
			state.products.map((i) => {
				if (i.id === action.payload) {
					i.count += 1;
				}
				return i;
			});
		},
	},
});

export default cartSlice.reducer;
export const cartActions = cartSlice.actions;
