import React from 'react'
import Image from 'next/image'
import { Card, CardContent, CardActions, Button, Typography, Box } from '@material-ui/core'
import styled from 'styled-components'

const CardStyled = styled(Card)`
  background: transparent;
  padding: 1rem;
  box-shadow: none;
  height: 460px;
  [data-image] {
    transform: rotate(0deg);
    transition: all 0.5s;
  }

  .MuiCardActions-root {
    display: none;
  }

  :hover {
    background: url('/bg-product.png') center no-repeat;
    border-radius: 40px;
    [data-image] {
      transform: rotate(-16deg);
      transition: all 0.5s;
    }
    .MuiCardActions-root {
      display: flex;
    }
  }
  @media (max-width: 1024px) {
    :hover {
      background: transparent;
    }
  }
`

const CardContentStyled = styled(CardContent)`
  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`

const ImageWrapper = styled(Box)`
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 128px;
    height: 128px;
    background-image: url('/icons/circule.svg');
  }
`

type ProductItemProps = {
  item?: {
    id: string
    url: string
    description: string
    composition: string
    volume: string
    price: string
  }
}

const ProductItem = ({ item }: ProductItemProps) => {
  return (
    <CardStyled>
      <CardContentStyled>
        <ImageWrapper data-image>
          <Image src="/bottle.png" height="225px" width="270px" />
        </ImageWrapper>
        <Typography variant="h6" component="h6" color="textSecondary" align="center" gutterBottom>
          Сидр "Poma Aurea" 4.7%
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          Склад: вода, яблука (40%), лимонна кислота, сироп глюкозно- фруктозний.
        </Typography>
        <Typography variant="body2" component="p" color="textSecondary" gutterBottom>
          26.99 грн
        </Typography>
      </CardContentStyled>
      <CardActions>
        <Button variant="outlined" color="primary" fullWidth>
          Купити
        </Button>
      </CardActions>
    </CardStyled>
  )
}

export default ProductItem
