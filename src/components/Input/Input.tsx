import cn from 'classnames';
import cl from './Input.module.css';
import { forwardRef } from 'react';
import { InputProps } from './input.props';

export const Input= forwardRef<HTMLInputElement, InputProps>(function Input(
	{ isValid = true, className, ...props },
	ref
) {
	return (
		<input
			ref={ref}
			className={cn(cl['input'], className, {
				[cl['invalid']]: isValid,
			})}
			{...props}
		/>
	);
});
