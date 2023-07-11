import React from 'react';

import {CoordsType, heightScreen, widthScreen} from './types';

type Props = {
  width?: number;
  height?: number;
};
const Board: React.FC<Props> = ({
  width = widthScreen,
  height = heightScreen,
}) => {
  return null;
};

export default Board;
