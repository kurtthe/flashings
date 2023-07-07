import React from 'react';
import {ThemeProvider as RestyleProvider} from '@shopify/restyle';

import lightTheme from './lightTheme';

const ThemeProvider: React.FC = ({children}) => {
  return <RestyleProvider theme={lightTheme}>{children}</RestyleProvider>;
};

export default ThemeProvider;
