import { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { Heading } from '../../components/Heading/Heading';
import { Input } from '../../components/Input/Input';
import cl from './Login.module.css';
import axios from 'axios';
import { PREFIX } from '../../helpers/API';

export interface ILoginForm {
	email: {
		value: string;
	};
	password: {
		value: string;
	};
}

export const Login = ({}) => {
	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const target = e.target as typeof e.target & ILoginForm;
		const { email, password } = target;
		sendLogin(email.value, password.value);
	};

	const sendLogin = async(email: string, password: string) => {
		try {
const { data } = await axios.post(`${PREFIX}/auth/login`, {
	email,
	password,
});
console.log(data);
		} catch(e) {

		}
		
	};

	return (
		<section className={cl.login}>
			<Heading>Вход</Heading>
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
