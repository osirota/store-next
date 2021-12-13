import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { useTranslation } from 'next-i18next';
import NextLink from 'next/link';

import { themeState } from 'recoils/themeType';

interface NextLinkProps {
  mode: string;
}
const NextLinkStyled = styled('p')`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 210px;
  background: #eaef10;
  border: 1px solid transparent;
  font-weight: bold;
  font-size: 18px;
  color: #171b26;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  padding: 7px 27px;
  margin: 20px auto;
  transition: all 0.5s;
  text-transform: uppercase;
  :hover {
    background: transparent;
    border: 1px solid #eaef10;
    color: ${(props: NextLinkProps): any =>
      props.mode === 'dark' ? '#fff' : '#171b26'};
  }
`;

interface INextLinkProps {
  text: string;
  link: string;
}

const NextLinkStyle = ({ text, link }: INextLinkProps) => {
  const mode = useRecoilValue(themeState);
  const { t } = useTranslation(['landing', 'common']);
  return (
    <NextLink href={link}>
      <NextLinkStyled mode={mode}>{t(text, { ns: 'common' })}</NextLinkStyled>
    </NextLink>
  );
};

export default NextLinkStyle;
