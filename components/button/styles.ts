import styled from 'styled-components';

export const ButtonStyled = styled.a`
  display: block;
  position: relative;
  margin: 0.5em 0;
  padding: 0.8em 2.2em;
  cursor: pointer;
  background-color: rgb(67, 230, 96);
  border: none;
  border-radius: 0.4em;
  text-decoration: none;
  color: inherit;
  text-transform: uppercase;
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.04em;

  mix-blend-mode: color-dodge;
  perspective: 500px;
  transform-style: preserve-3d;

  &:before,
  &:after {
    --z: 0px;
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    content: '';
    width: 100%;
    height: 100%;
    opacity: 0;
    mix-blend-mode: inherit;
    border-radius: inherit;
    transform-style: preserve-3d;
    transform: translate3d(
      calc(var(--z) * 0px),
      calc(var(--z) * 0px),
      calc(var(--z) * 0px)
    );
  }

  span {
    mix-blend-mode: none;
    display: block;
  }

  &:after {
    background-color: #5d00ff;
  }

  &:before {
    background-color: #ff1731;
  }

  &:hover {
    background-color: #fff65b;
    transition: background 0.3s 0.1s;
  }

  &:hover:before {
    --z: 0.04;
    animation: translateWobble 2.2s ease forwards;
  }

  &:hover:after {
    --z: -0.06;
    animation: translateWobble 2.2s ease forwards;
  }

  @-webkit-keyframes translateWobble {
    0% {
      opacity: 0;
      transform: translate3d(calc(var(--z) * 0px), calc(var(--z) * 0px), calc(var(--z) * 0px));
    }
    16% {
      transform: translate3d(calc(var(--z) * 160px), calc(var(--z) * 160px), calc(var(--z) * 160px));
    }
    28% {
      opacity: 1;
      transform: translate3d(calc(var(--z) * 70px), calc(var(--z) * 70px), calc(var(--z) * 70px));
    }
    44% {
      transform: translate3d(calc(var(--z) * 130px), calc(var(--z) * 130px), calc(var(--z) * 130px));
    }
    59% {
      transform: translate3d(calc(var(--z) * 85px), calc(var(--z) * 85px), calc(var(--z) * 85px));
    }
    73% {
      transform: translate3d(calc(var(--z) * 110px), calc(var(--z) * 110px), calc(var(--z) * 110px));
    }
    88% {
      opacity: 1;
      transform: translate3d(calc(var(--z) * 90px), calc(var(--z) * 90px), calc(var(--z) * 90px));
    }
    100% {
      opacity: 1;
      transform: translate3d(calc(var(--z) * 100px), calc(var(--z) * 100px), calc(var(--z) * 100px));
    }
  }
  @keyframes translateWobble {
    0% {
      opacity: 0;
      transform: translate3d(calc(var(--z) * 0px), calc(var(--z) * 0px), calc(var(--z) * 0px));
    }
    16% {
      transform: translate3d(calc(var(--z) * 160px), calc(var(--z) * 160px), calc(var(--z) * 160px));
    }
    28% {
      opacity: 1;
      transform: translate3d(calc(var(--z) * 70px), calc(var(--z) * 70px), calc(var(--z) * 70px));
    }
    44% {
      transform: translate3d(calc(var(--z) * 130px), calc(var(--z) * 130px), calc(var(--z) * 130px));
    }
    59% {
      transform: translate3d(calc(var(--z) * 85px), calc(var(--z) * 85px), calc(var(--z) * 85px));
    }
    73% {
      transform: translate3d(calc(var(--z) * 110px), calc(var(--z) * 110px), calc(var(--z) * 110px));
    }
    88% {
      opacity: 1;
      transform: translate3d(calc(var(--z) * 90px), calc(var(--z) * 90px), calc(var(--z) * 90px));
    }
    100% {
      opacity: 1;
      transform: translate3d(calc(var(--z) * 100px), calc(var(--z) * 100px), calc(var(--z) * 100px));
    }
`;
