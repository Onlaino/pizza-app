import cl from './Login.module.css';
import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { Heading } from '../../components/Heading/Heading';
import { Input } from '../../components/Input/Input';
import { PREFIX } from '../../helpers/API';
import axios, { AxiosError } from 'axios';
import { LoginResponse } from '../../interfaces/auth.interface';

export interface ILoginForm {
	email: {
		value: string;
	};
	password: {
		value: string;
	};
}

export const Login = ({}) => {
	const [error, setError] = useState<string | null>()
	const navigate = useNavigate();
	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError(null);
		const target = e.target as typeof e.target & ILoginForm;
		const { email, password } = target;
		sendLogin(email.value, password.value);
	};

	const sendLogin = async (email: string, password: string) => {
		try {
			const { data } = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {
				email,
				password,
			});
			console.log(data);
			localStorage.setItem('jwt' , data.access_token);
			navigate('/');
		} catch (e) {
			if (e instanceof AxiosError) {
				setError(e.response?.data.message);
			}
		}
	};

	return (
		<section className={cl.login}>
			<Heading>Вход</Heading>
			{error && <div className={cl.error}>{error}</div>}
			<form className={cl.form} onSubmit={handleSubmit}>
				<div className={cl.field}>
					<label htmlFor='email' className={cl.label}>
						Ваш email
					</label>
					<Input
						required
						name='email'
						className={cl.input}
						placeholder='Email'
						id='email'
					/>
				</div>
				<div className={cl.field}>
					<label className={cl.label} htmlFor='password'>
						Ваш пароль
					</label>
					<Input
						required
						name='password'
						type='password'
						className={cl.input}
						placeholder='Пароль'
						id='password'
					/>
				</div>
				<Button className={cl.button} appearence='big'>
					ВXОД
				</Button>
			</form>
			<div className={cl.registerLink}>
				<p className={cl.paragraph}>Нет аккаунта?</p>
				<Link to={'/auth/register'} className={cl.link}>
					Зарегистрироваться
				</Link>
			</div>
		</section>
	);
};
