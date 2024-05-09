import cl from './Success.module.css';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button/Button';

export const Success = () => {
	const navigate = useNavigate();
	return (
		<div className={cl.success}>
			<img src='/success_image.png' alt='pizza' />
			<div className={cl.text}>Ваш заказ успешно оформлен</div>
			<Button appearence='big' onClick={() => navigate('/')}>
				Сделать новый
			</Button>
		</div>
	);
};
