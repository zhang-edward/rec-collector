import { QRCode, Typography } from 'antd';
import { useEffect, useState } from 'react';
import RecList from './RecList';
import { animated, easings, useSpring } from '@react-spring/web';

const { Title } = Typography;
const BG_COLOR = 'plum';

const styles = {
	root: {
		display: 'flex',
		justifyContent: 'center',
		// backgroundColor: 'plum',
		backgroundImage: 'linear-gradient(plum, palevioletred)',
		height: '100vh',
		padding: 64,
		gap: 64,
	},
	container: {
		display: 'flex',
		flexDirection: 'column' as const,
		justifyContent: 'center',
		alignItems: 'center',
	},
	button: {
		margin: 16,
	},
	qrContainer: {
		textAlign: 'center' as const,
		display: 'flex',
		flexDirection: 'column' as const,
		alignItems: 'center',
		justifyContent: 'center',
	},
};

const possibleTikToks = [
	'7351466280441990432',
	'7312119099759332640',
	'7357160667616398625',
	'7342532532417695009',
	'7338398862018907425',
	'7337251787432299808',
];

export default function Home() {
	const [showingImg, setShowingImg] = useState(false);
	const [chosenTikTok, setChosenTikTok] = useState(possibleTikToks[0]);
	const style = showingImg
		? {
				opacity: 1,
		  }
		: {
				opacity: 0,
				transition: 'opacity 5s ease-in 10s',
		  };

	useEffect(() => {
		if (showingImg) {
			setShowingImg(false);
		}
	}, [showingImg]);

	// tilt from side to side
	const qr1spring = useSpring({
		from: { transform: 'rotate(0deg)' },
		to: async (next) => {
			while (1) {
				await next({ transform: 'rotate(2deg)' });
				await next({ transform: 'rotate(-2deg)' });
				await next({ transform: 'rotate(0deg)' });
				// wait for 1 second
				await new Promise((resolve) => setTimeout(resolve, 10000));
			}
		},
		config: { duration: 100, easing: easings.easeInOutCirc },
	});
	const qr2spring = useSpring({
		from: { transform: 'rotate(0deg)' },
		to: async (next) => {
			while (1) {
				await new Promise((resolve) => setTimeout(resolve, 5000));
				await next({ transform: 'rotate(2deg)' });
				await next({ transform: 'rotate(-2deg)' });
				await next({ transform: 'rotate(0deg)' });
				// wait for 1 second
				await new Promise((resolve) => setTimeout(resolve, 5000));
			}
		},
		config: { duration: 100, easing: easings.easeInOutCirc },
	});

	const float1Spring = useSpring({
		from: { transform: 'translate(0px, 0px)' },
		to: async (next) => {
			while (1) {
				await next({ transform: 'translate(0px, 5px)' });
				await next({ transform: 'translate(0px, -5px)' });
			}
		},
		config: {
			duration: 2000,
			easing: easings.easeInOutSine,
		},
	});

	const float2Spring = useSpring({
		from: { transform: 'translate(0px, 0px)' },
		to: async (next) => {
			await new Promise((resolve) => setTimeout(resolve, 500));
			while (1) {
				await next({ transform: 'translate(0px, 5px)' });
				await next({ transform: 'translate(0px, -5px)' });
			}
		},
		config: {
			duration: 2000,
			easing: easings.easeInOutSine,
		},
	});

	return (
		<div style={styles.root}>
			<div
				style={styles.container}
				onClick={() => {
					setShowingImg(true);
					setChosenTikTok(
						possibleTikToks[Math.floor(Math.random() * possibleTikToks.length)]
					);
				}}
			>
				<animated.div
					style={{
						...float1Spring,
						...styles.qrContainer,
					}}
				>
					<Title level={2}>contribute to the list! ➡️</Title>
					<animated.div style={qr1spring}>
						<QRCode
							style={styles.button}
							value={'http://192.168.0.124:3000/form'}
							size={256}
						/>
					</animated.div>
				</animated.div>
				<animated.div
					style={{
						...float2Spring,
						...styles.qrContainer,
					}}
				>
					<Title level={2}>look at the menu! ☕️</Title>
					<animated.div style={qr2spring}>
						<QRCode
							style={styles.button}
							value={'http://192.168.0.124:3000/menu'}
							size={256}
						/>
					</animated.div>
				</animated.div>
			</div>
			<RecList />
			<div
				style={{
					...style,
					position: 'absolute',
				}}
			>
				<div
					style={{
						zIndex: 1000,
						top: '-25%',
						left: '25%',
						transform: `rotate(${Math.random() * 60 - 30}deg) translate(${
							Math.random() * 400 - 200
						}px, ${Math.random() * 400 - 200}px)`,
					}}
				>
					<iframe
						style={{
							position: 'absolute',
							top: '-100',
							left: '-100',
							zIndex: '',
						}}
						title='tiktok-embed-0'
						src={`https://www.tiktok.com/embed/v2/${chosenTikTok}?lang=en-US`}
						width='300px'
						height='600px'
					/>
				</div>
			</div>
		</div>
	);
}
