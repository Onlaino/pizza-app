import cn from 'classnames';
import cl from './Search.module.css';
import { forwardRef } from 'react';
import { InputProps } from './search.props';

export const Search = forwardRef<HTMLInputElement, InputProps>(function Input(
	{ isValid = true, className, ...props },
	ref
) {
	return (
		<div className={cl.inputWrapper}>
			<input
				ref={ref}
				className={cn(cl['input'], className, {
					[cl['invalid']]: isValid,
				})}
				{...props}
			/>
			<img className={cl.icon} src='/search-icon.svg' alt='search-icon' />
		</div>
	);
});
