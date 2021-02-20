import React from 'react';
import { Layout, Radio, Typography, List } from 'antd';
import Image from 'next/image'

const { Header } = Layout;
const { Text, Link } = Typography;

const data = [
	'про нас',
	'блог',
	'сидр та перри',
	'наши партнеры',
	'контакты',
];

const PageHeader = () => (
	<Header>
		<div className="">
			<div className="logo">
				<Image src="/logo.png" alt="logo" width="130px" height="134px" />
			</div>
			<div>
				<Radio.Group defaultValue="a" size="small" style={{ marginTop: 16 }}>
					<Radio.Button value="a">Hangzhou</Radio.Button>
					<Radio.Button value="b">Shanghai</Radio.Button>
					<Radio.Button value="c">Beijing</Radio.Button>
					<Radio.Button value="d">Chengdu</Radio.Button>
				</Radio.Group>
				<Text>We share spirit of cider, join us!</Text>
			</div>
		</div>

		<List
			grid={{
				gutter: 16,
				xs: 1,
				sm: 2,
				md: 4,
				lg: 4,
				xl: 6,
				xxl: 3,
			}}
			dataSource={data}
			renderItem={item => (
				<List.Item>
					<Link title={item}>{item}</Link>
				</List.Item>
			)}
		/>
	</Header>
);

export default PageHeader;