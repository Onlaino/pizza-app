import { FC } from 'react';
import { HeadingProps } from './heading.props';
import cl from './Heading.module.css';
import cn from 'classnames';

export const Heading: FC<HeadingProps> = ({
	children,
	className,
	...props
}) => {
	return (
		<h1 className={cn(className, cl['heading'])} {...props}>
			{children}
		</h1>
	);
};
