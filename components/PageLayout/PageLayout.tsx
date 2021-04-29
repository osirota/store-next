import React from 'react';
import { Layout } from 'antd';
import styled from 'styled-components';
import Head from 'next/head'
import Image from 'next/image'

import PageHeader from '../PageHeader/PageHeader';

const { Header, Footer, Content } = Layout;

const LayoutStyled = styled(Layout)`
	max-width: 1140px;
	margin: 0 auto;
	padding: 30px 0 10px;
`;
const ImageStyled = styled(Image)`
	z-index: -1;
`;


const PageLayout = ({ children, title }) => (
	<>
		<ImageStyled
			alt="bg"
			src="/bg-black.jpg"
			layout="fill"
			objectFit="cover"
			quality={100}
		/>
		<LayoutStyled>
			<Head>
				<title>{title}</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Header>
				<PageHeader />
			</Header>
			<Content>
				{children}
			</Content>
			<Footer>
				footer
			</Footer>
		</LayoutStyled>
	</>
)

export default PageLayout;
