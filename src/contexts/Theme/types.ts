import {globalDark} from './constants';
import {ReactElement} from 'react';

export type ThemeKeys = typeof globalDark;

export type Theme = {
  light: ThemeKeys;
  dark: ThemeKeys;
};

export type ThemeProps = {
  theme?: Theme;
  children: ReactElement;
};

export type ThemeProviderType = {
  mode: 'dark' | 'light';
  setThemeDark: () => void;
  setThemeLight: () => void;
  theme: ThemeKeys;
};
