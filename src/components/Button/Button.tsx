import { ButtonProps } from './button.props.ts';
import cl from './Button.module.css';
import cn from 'classnames';


export const Button = ({ children, className, appearence = 'small',  ...props }: ButtonProps) => {
	return (
		<button className={cn(cl.button, cl.accent, className, {
			[cl['small']]: appearence === 'small',
			[cl['big']] : appearence === 'big',
		})} {...props}>
			{children}
		</button>
	);
}

