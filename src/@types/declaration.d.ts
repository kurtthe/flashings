declare module '*.svg' {
  import React from 'react';
  import {SvgProps} from 'react-native-svg';
  const content: React.FC<SvgProps>;
  /**
   * @see: https://github.com/kristerkari/react-native-svg-transformer
   **/
  export default content;
}
