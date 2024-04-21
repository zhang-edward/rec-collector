import { Image } from 'antd';

export default function Menu() {
	return (
		// rgb(246, 243, 239) is the background color of the image
		<div
			style={{
				backgroundColor: '#f6f3ef',
				width: '100vw',
				height: '100vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Image preview={false} src={'/menu.PNG'} />
		</div>
	);
}
