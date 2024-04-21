import { animated, easings, useSpring, useTransition } from '@react-spring/web';
import { useCallback, useEffect, useState } from 'react';
import RecCard from './RecCard';
import Title from 'antd/es/typography/Title';
import axios from 'axios';

const BG_COLOR = 'plum';

const styles = {
	root: {
		display: 'flex',
		flexDirection: 'column' as const,
		width: '75%',
		height: '90%',
	},
	recsList: {
		display: 'flex',
		width: '100%',
		height: '100%',
		alignContent: 'start',
		borderRadius: 8,
		flexDirection: 'column' as const,
		flexWrap: 'wrap' as const,
		backgroundColor: BG_COLOR,
		boxShadow: '0 0 32px rgba(0, 0, 0, 0.2)',
		overflow: 'hidden',
	},
};

export type Item = {
	name: string;
	rec: string;
};

export default function RecList() {
	const [items, setItems] = useState<Item[]>([]);

	const handleAddItem = useCallback((newItem: any) => {
		setItems((items) => [newItem, ...items]);
		api.start({
			to: async (next) => {
				const colors = [
					'#ffadad',
					'#ffd6a5',
					'#fdffb6',
					'#caffbf',
					'#9bf6ff',
					'#a0c4ff',
					'#bdb2ff',
					BG_COLOR,
				];
				for (let i = 0; i < colors.length; i++) {
					await next({ backgroundColor: colors[i] });
				}
			},
			config: { duration: 50, easing: easings.linear },
		});
	}, []);

	useEffect(() => {
		const ws = new WebSocket('ws://localhost:3001'); // Replace with your backend WebSocket URL

		axios.get('http://localhost:3001/recs').then((res) => {
			if (res.data) {
				setItems(res.data);
			}
		});

		ws.onopen = () => {
			console.log('WebSocket connected');
		};

		ws.onmessage = (event) => {
			try {
				const data = JSON.parse(event.data);
				if (data.type != null) {
					handleAddItem(data.newData);
				}
			} catch (e) {}
		};

		return () => {
			ws.close(); // Clean up WebSocket connection
		};
	}, []);

	const transitions = useTransition(items, {
		from: { opacity: 0, transform: 'translate3d(0, -100%, 0)' }, // Starting style for entering items
		enter: { opacity: 1, transform: 'translate3d(0, 0, 0)' }, // Ending style for entering items
		config: { tension: 220, friction: 20 },
	});

	// cycle through colors of rainbow
	const [rainbowSpring, api] = useSpring(() => ({
		from: { backgroundColor: BG_COLOR },
		config: { duration: 1000 },
	}));

	const waveSpring = useSpring({
		from: { transform: 'rotate(0deg)' },
		to: async (next) => {
			while (1) {
				await next({ transform: 'rotate(2deg)' });
				await next({ transform: 'rotate(-2deg)' });
			}
		},
		config: {
			duration: 2000,
			easing: easings.easeInOutSine,
		},
	});

	const inOutScaleSpring = useSpring({
		from: { transform: 'scale(1.5, 1.5)' },
		to: async (next) => {
			while (1) {
				await next({ transform: 'scale(1.55, 1.55)' });
				await next({ transform: 'scale(1.45, 1.45)' });
			}
		},
		config: {
			duration: 1500,
			easing: easings.easeInOutSine,
		},
	});

	return (
		<div style={styles.root}>
			<animated.div style={{ ...inOutScaleSpring }}>
				<animated.div
					style={{ ...waveSpring, textAlign: 'center', paddingBottom: 16 }}
				>
					<Title level={1}>🗽 NYC recs list 🗽</Title>
				</animated.div>
			</animated.div>
			<animated.div
				style={{ ...styles.recsList, ...rainbowSpring }}
				onClick={() => {}}
			>
				{transitions((style, item, t, index) => (
					<animated.div
						style={{
							margin: 16,
							...style,
						}}
					>
						<RecCard item={item} />
					</animated.div>
				))}
			</animated.div>
		</div>
	);
}
