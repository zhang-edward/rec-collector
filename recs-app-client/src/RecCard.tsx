import { Card, Divider, Typography } from 'antd';
import Title from 'antd/es/typography/Title';
import { useEffect, useState } from 'react';
import ConfettiExplosion from 'react-confetti-explosion';
import type { Item } from './RecList';
import Paragraph from 'antd/es/typography/Paragraph';

export default function RecCard({ item }: { item: Item }) {
	const [confetti, setConfetti] = useState(false);
	useEffect(() => {
		setTimeout(() => {
			setConfetti(true);
		}, 100);
		setTimeout(() => {
			setConfetti(false);
		}, 5000);
	}, []);

	return (
		<>
			<Card style={{ width: 300 }}>
				{confetti && (
					<ConfettiExplosion
						style={{
							position: 'absolute',
							top: '50%',
							left: '50%',
							zIndex: 1000,
						}}
					/>
				)}
				<Typography>
					<Title level={4} style={{ textAlign: 'center' }}>
						{item.rec}
					</Title>
					<Divider />
					<Paragraph style={{ textAlign: 'center' }}>
						{item.name ?? 'anonymous 🥸'}
					</Paragraph>
				</Typography>
			</Card>
		</>
	);
}
