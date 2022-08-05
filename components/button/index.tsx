import Box from '@material-ui/core/Box';
import Image from 'next/image';

// @ts-ignore
import { ButtonStyled } from './styles.ts';

interface IButton {
  title: string;
  img: string;
  href: string;
}

const Button = ({ title, img, href }: IButton) => {
  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <ButtonStyled href={href} target="_blank">
      {/* eslint-disable-next-line react/react-in-jsx-scope */}
      <Box display="flex" alignItems="center" justifyContent="space-around">
        {/* eslint-disable-next-line react/react-in-jsx-scope */}
        <Box mr={1}>
          {/* eslint-disable-next-line react/react-in-jsx-scope */}
          <Image src={img} height={48} width={48} layout="fixed" />
        </Box>
        {title}
      </Box>
    </ButtonStyled>
  );
};

export default Button;
