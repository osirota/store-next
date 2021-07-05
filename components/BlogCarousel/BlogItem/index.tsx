import React from 'react'
import Image from 'next/image'
import { Card, CardContent, CardActions, Button, Typography, Box } from '@material-ui/core'
import styled from 'styled-components'

const CardStyled = styled(Card)`
  background: transparent;
  box-shadow: none;

  :hover {
    background: url('/bg-blog.png') center no-repeat;
    border-radius: 40px;
  }
`

const ImgaeWrapper = styled(Box)`
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

type BlogItemProps = {
  item?: {
    id: string
    url: string
    description: string
    composition: string
    volume: string
    price: string
  }
}

const BlogItem = ({ item }: BlogItemProps) => {
  return (
    <CardStyled>
      <CardContent>
        <ImgaeWrapper data-image display="flex" alignItems="center" justifyContent="center">
          <Image src="/blog.png" height="225px" width="270px" />
        </ImgaeWrapper>
        <Typography variant="h6" component="h6" color="textSecondary" align="center" gutterBottom>
          Як виготовлять сидр, який ми куплямо
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat commodo cla ...
        </Typography>
      </CardContent>
    </CardStyled>
  )
}

export default BlogItem
