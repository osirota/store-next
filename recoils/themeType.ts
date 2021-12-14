import { atom } from 'recoil';

export const themeState = atom({
  key: 'themeType',
  default: 'dark',
});
