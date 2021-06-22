import React, { useState } from 'react';
import {
	Container,
	Box,
	Fab,
	SwipeableDrawer,
	List,
	ListItem,
	Typography,
	ListItemSecondaryAction,
	ListItemAvatar,
	IconButton,
	Button,
} from '@material-ui/core';
import { ShoppingCart, Add, Remove, Cancel } from '@material-ui/icons';
import styled from 'styled-components';
import Head from 'next/head'
import Image from 'next/image'

import PageHeader from 'components/PageHeader/PageHeader';

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

const FabStyled = styled(Fab)`
	position: fixed;
	right: 2rem;
	bottom: 2rem;
	z-index: 2;
`;

const SwipeableDrawerStyled = styled(SwipeableDrawer)`
	color: red;
	& .MuiDrawer-paper {
		width: 400px;
		background-color: #b2b2b2;
	}
`;

const ListItemStyled = styled(Box)`
	border: 1px solid;
	margin: 1rem 0;
`;

const CompleteWrapper = styled(Box)`
	display: flex;
	align-items: center;
	justify-content: space-around;
	border-top: 1px solid;
	padding: 1rem 0 0;
`;

const ContentWrapper = styled(Box)`
	max-height: 90vh;
	overflow: overlay;
`;

type PageLayoutProps = {
	title: string;
	children: React.ReactNode;
}


const PageLayout = ({ children, title }: PageLayoutProps) => {
	const [drawerState, setDrawerState] = useState(false);

	const toggleDrawer = () => {
		setDrawerState(!drawerState);
	};

	return (
		<>
			<PageHeader />
			<ContainerStyled disableGutters maxWidth={false}>
				<Head>
					<title>{title}</title>
					<link rel="icon" href="/favicon.ico" />
				</Head>

				<Box component="main">
					{children}
				</Box>
			</ContainerStyled>
			<PageHeader isFooter />
			<SwipeableDrawerStyled
				anchor="right"
				open={drawerState}
				onClose={toggleDrawer}
				onOpen={toggleDrawer}
			>
				<ContentWrapper display="flex" flexDirection="column" p="1.25rem">
					<Typography color="primary">Ваше замовлення</Typography>
					<List>
						{['Inbox', 'Starred', 'Send email', 'Drafts', '1', '2', '3', '5'].map((text) => (
							<ListItemStyled key={text}>
								<ListItem>
									<ListItemSecondaryAction>
											<IconButton>
												<Cancel />
											</IconButton>
									</ListItemSecondaryAction>
									<Box>
										<Typography color="primary">Сидр "Poma Aurea"</Typography>
										<Box display="flex" alignItems="center">
											<Box display="flex" alignItems="center">
												<IconButton>
													<Remove />
												</IconButton>
												<Typography color="primary">2</Typography>
												<IconButton>
													<Add />
												</IconButton>
											</Box>
											<Typography color="primary">220 грн</Typography>
										</Box>
									</Box>
									<ListItemAvatar>
									<Image
										alt="bg"
										src="/bottle.png"
										width={100}
										height={100}
									/>
									</ListItemAvatar>
								</ListItem>
							</ListItemStyled>
						))}
					</List>
				</ContentWrapper>
				<CompleteWrapper>
					<Box>
						<Typography color="primary">Итого:</Typography>
						<Typography color="primary">1905 грн</Typography>
					</Box>
					<Button>Оформить заказ</Button>
				</CompleteWrapper>
			</SwipeableDrawerStyled>
			<FabStyled color="primary" onClick={toggleDrawer}>
				<ShoppingCart />
			</FabStyled>
		</>
	)
};

export default PageLayout;
