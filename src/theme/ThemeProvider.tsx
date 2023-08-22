import React from 'react';
import {ThemeProvider as RestyleProvider} from '@shopify/restyle';

import lightTheme from './lightTheme';

type Props = {
  children: React.ReactElement
}
const ThemeProvider: React.FC<Props> = ({children}) => {
  return <RestyleProvider theme={lightTheme}>{children}</RestyleProvider>;
};

export default ThemeProvider;
