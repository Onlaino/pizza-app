import cl from './Register.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { Heading } from '../../components/Heading/Heading';
import { Input } from '../../components/Input/Input';
import { FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { register, userActions } from '../../store/user.slice';

interface IRegisterForm {
	email: {
		value: string;
	};
	name: {
		value: string;
	};
	password: {
		value: string;
	};
}

export const Register = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { jwt, registerErrorMessage } = useSelector((s: RootState) => s.user);
	const navigate = useNavigate();

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(userActions.clearRegisterError());
		const target = e.target as typeof e.target & IRegisterForm;
		const { email, password, name } = target;
		dispatch(
			register({
				email: email.value,
				password: password.value,
				name: name.value,
			})
		);
	};

	useEffect(() => {
		if (jwt) navigate('/');
	}, [jwt, navigate]);

	return (
		<section className={cl.login} onSubmit={handleSubmit}>
			<Heading>Регистрация</Heading>
			{registerErrorMessage && (
				<div className={cl.error}>{registerErrorMessage}</div>
			)}
			<form className={cl.form}>
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
				<div className={cl.field}>
					<label className={cl.label} htmlFor='password'>
						Введите имя
					</label>
					<Input
						required
						name='name'
						id='name'
						type='text'
						className={cl.input}
						placeholder='Имя'
					/>
				</div>
				<Button className={cl.button} appearence='big'>
					Зарегистрироваться
				</Button>
			</form>
			<div className={cl.registerLink}>
				<p className={cl.paragraph}>Есть аккаунт?</p>
				<Link to={'/auth/register'} className={cl.link}>
					Войти
				</Link>
			</div>
		</section>
	);
};
