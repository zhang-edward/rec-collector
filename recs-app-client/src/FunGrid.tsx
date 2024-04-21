import { Card } from 'antd';
import { useEffect, useLayoutEffect, useState } from 'react';
import { animated, useSpring, useTransition } from '@react-spring/web';

//
export default function FunGrid() {
	const list = [
		'hi1',
		'qowidjq',
		'qodjzisd',
		'hi2',
		'Nam',
		'occaecati',
		'ea',
		'Dolorem',
		'hic',
		'provident',
		'nobis',
		'quas',
		'Facilis',
		'enim',
		'ipsam',
		'magni',
		'deleniti',
		'pariatur',
		'aut',
	];
	const [activeList, setActiveList] = useState<string[]>(list.slice(0, 9));
	const [inactiveList, setInactiveList] = useState<string[]>(list.slice(9));

	const transitions = useTransition(activeList, {
		from: { opacity: 0 },
		enter: { opacity: 1 },
		leave: { opacity: 0 },
		// config: { duration: 100 },
		exitBeforeEnter: true,
	});

	useLayoutEffect(() => {
		const t = setInterval(() => {
			// pick a random item from inactiveList and swap it with a random item from activeList
			const randomInactiveIndex = Math.floor(
				Math.random() * inactiveList.length
			);
			const randomActiveIndex = Math.floor(Math.random() * activeList.length);

			let newActiveList = [...activeList];
			let newInactiveList = [...inactiveList];

			const temp = newActiveList[randomActiveIndex];
			newActiveList[randomActiveIndex] = newInactiveList[randomInactiveIndex];
			newInactiveList[randomInactiveIndex] = temp;

			setActiveList(newActiveList);
			setInactiveList(newInactiveList);

			// console.log('hi');
		}, 2000);
		return () => clearInterval(t);
	}, []);

	// const [springs, api] = useSpring(() => ({
	// 	from: { opacity: 0, gap: 4 },
	// }));
	// return (
	// 	<div style={{ transform: `translate(20px, 30px)` }}>
	// 		<Card>hi</Card>
	// 	</div>
	// );

	return (
		<animated.div
			style={{
				flexGrow: 1,
				display: 'grid',
				gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
				gridTemplateRows: 'masonry',
				padding: 16,
				gap: '10px',
				// ...springs,
			}}
		>
			{transitions((style, item) => (
				<animated.div
					style={{
						padding: 16,
						textAlign: 'center',
						...style,
					}}
				>
					<Card size='default'>{item}</Card>
				</animated.div>
			))}
			{/* {activeList.map((item) => (
				<Card
					style={{
						padding: 16,
						textAlign: 'center',
					}}
					size='default'
				>
					{item}
				</Card>
			))} */}
		</animated.div>
	);
}
