import React from 'react';
import { 
	Container,
	Box,
 } from '@material-ui/core';
import styled from 'styled-components';
import Head from 'next/head'
import Image from 'next/image'

import PageHeader from '../PageHeader/PageHeader';

const ContainerStyled = styled(Container)`
	max-width: 1140px;
	margin: 0 auto;
	padding: 30px 0 10px;
`;

const Wrapper = styled.div`
	position: fixed;
	height: 100vh;
	width: 100vw;
	overflow: hidden;
	z-index: -1;
`;

type PageLayoutProps = {
	title: string;
	children: React.ReactNode;
}


const PageLayout = ({ children, title }: PageLayoutProps) => (
	<>
		<Wrapper>
			<Image
				alt="bg"
				src="/bg-black.jpg"
				layout="fill"
				objectFit="cover"
				quality={100}
			/>
		</Wrapper>
		<PageHeader />
		<ContainerStyled disableGutters maxWidth={false}>
			<Head>
				<title>{title}</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Box component="main">
				{children}
			</Box>
			<Box component="footer">
				footer
			</Box>
		</ContainerStyled>
	</>
)

export default PageLayout;
