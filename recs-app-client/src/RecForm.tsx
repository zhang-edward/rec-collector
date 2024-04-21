import { Button, Checkbox, Form, Image, Input, Typography } from 'antd';

import { useState } from 'react';
import type { FormProps } from 'antd';
import axios from 'axios';
import TextArea from 'antd/es/input/TextArea';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const FORM_URL = 'http://192.168.0.124:3001/recs-write';

const styles = {
	root: {
		display: 'flex',
		flexDirection: 'column' as const,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundImage: 'linear-gradient(plum, palevioletred)',
		height: '100vh',
		width: '100vw',
		gap: 24,
	},
};

type FieldType = {
	name?: string;
	rec?: string;
};

export default function RecForm() {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);

	const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
		axios
			.post(FORM_URL, JSON.stringify(values))
			.then((res) => {
				setLoading(true);
				setLoading(false);
				navigate('/formDone');
			})
			.catch((err) => {
				console.error(err);
			});

		console.log('Success:', values);
	};

	const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
		errorInfo
	) => {
		console.log('Failed:', errorInfo);
	};

	return (
		<div style={styles.root}>
			<Typography>
				<Title>Submit your rec pls</Title>
			</Typography>
			<Form
				name='basic'
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
				style={{ margin: 32, minWidth: 300 }}
				initialValues={{ remember: true }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete='off'
			>
				<Form.Item<FieldType>
					label='your name?? leave empty to be anonymous 🥸'
					name='name'
				>
					<Input />
				</Form.Item>
				<Form.Item<FieldType>
					label='the name of the rec'
					name='rec'
					rules={[{ required: true, message: 'input something!!!!11!' }]}
				>
					<TextArea />
				</Form.Item>
				{/* <Form.Item wrapperCol={{ offset: 8, span: 16 }}> */}
				<Form.Item>
					<Button
						style={{ width: '100%' }}
						type='primary'
						htmlType='submit'
						loading={loading}
					>
						Submit
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
}
