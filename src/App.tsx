import { MouseEvent } from 'react';
import { Button } from './components/Button/Button.tsx';
import { Input } from './components/Input/Input.tsx';

export const App = () => {
	const addCounter = (e: MouseEvent) => {
		console.log(e);
	};

	return (
		<>
			<Button onClick={addCounter}>Button</Button>
			<Button appearence='big'>big</Button>
			<Input placeholder='email' />
		</>
	);
};
