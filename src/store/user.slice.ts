import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loadState } from './storage';
import axios, { AxiosError } from 'axios';
import { PREFIX } from '../helpers/API';
import { LoginResponse } from '../interfaces/auth.interface';
import { IProfile } from '../interfaces/user.interface';
import { RootState } from './store';

export const JWT_PERSISTANT = 'userData';
export interface UserPersistantState {
	jwt: string | null;
}

export interface IUserState {
	jwt: string | null;
	loginErrorMessage?: string;
	registerErrorMessage?: string;
	profile?: IProfile;
}

const initialState: IUserState = {
	jwt: loadState<UserPersistantState>(JWT_PERSISTANT)?.jwt ?? null,
	loginErrorMessage: '',
};

export const register = createAsyncThunk(
	'user/register',
	async (params: { email: string; password: string, name: string }) => {
		try {
			const { data } = await axios.post<LoginResponse>(`${PREFIX}/auth/register`, {
				email: params.email,
				password: params.password,
				name: params.name,
			});
			return data;
		} catch (e) {
			if (e instanceof AxiosError) {
				throw new Error(e.response?.data.message);
			}
		}
	}
);

export const getProfile = createAsyncThunk<IProfile, void, {state: RootState}>(
	'user/profile',
	async (_, thunkApi) => {
		const jwt = thunkApi.getState().user.jwt;
		const { data } = await axios.get<IProfile>(`${PREFIX}/user/profile`, {
			headers: {
				Authorization : `Bearer ${jwt}`
			},
		});
		return data;
	}
);

export const login = createAsyncThunk(
	'user/getProfile',
	async (params: { email: string; password: string }) => {
		try {
			const { data } = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {
				email: params.email,
				password: params.password,
			});
			return data;
		} catch (e) {
			if (e instanceof AxiosError) {
				throw new Error(e.response?.data.message);
			}
		}
	}
);

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		logout: (state) => {
			state.jwt = null;
		},
		clearLoginError: (state) => {
			state.loginErrorMessage = undefined;
		},
		clearRegisterError: (state) => {
			state.registerErrorMessage = undefined;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(login.fulfilled, (state, action) => {
			if (!action.payload) return;
			state.jwt = action.payload.access_token;
		});
		builder.addCase(login.rejected, (state, action) => {
			state.loginErrorMessage = action.error.message;
		});
		builder.addCase(getProfile.fulfilled, (state, action) => {
			state.profile = action.payload;
		});
		builder.addCase(register.fulfilled, (state, action) => {
			if (!action.payload) return;
			state.jwt = action.payload.access_token;
		});
		builder.addCase(register.rejected, (state, action) => {
			state.registerErrorMessage = action.error.message;
		});
	},
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
