import React from 'react';
import {
  COLOR_GRID,
  HEIGHT_SCREEN,
  SIZE_GRID,
  WIDTH_SCREEN,
} from '@features/flashing/components/Grid/Grid.types';
import {
  findClosestNumber,
  ScaleXBar,
  ScaleYBar,
} from '@features/flashing/utils';
import {G, Rect} from 'react-native-svg';
import {ScaleBand} from 'd3-scale';

export const renderLines = () => {
  const arrayGrid = Array.from({length: SIZE_GRID}, (_, i) => i.toString());
  const scaleXBar = ScaleXBar({
    domainData: arrayGrid,
    sizeScreen: WIDTH_SCREEN,
  });

  const scaleYBar = ScaleYBar({
    domainData: arrayGrid,
    sizeScreen: HEIGHT_SCREEN,
  });

  return (
    <G>
      {renderLinesVerticals({
        domainData: arrayGrid,
        scaleXBar,
        heightLine: HEIGHT_SCREEN,
      })}
      {renderLinesHorizontals({
        domainData: arrayGrid,
        scaleYBar,
        widthLine: WIDTH_SCREEN,
      })}
    </G>
  );
};

const renderLinesVerticals = ({
  domainData,
  heightLine,
  scaleXBar,
}: {
  heightLine: number;
  domainData: string[];
  scaleXBar: ScaleBand<string>;
}) => {
  return domainData.map(dataLine => (
    <Rect
      key={`vertical-line${dataLine}`}
      fill={COLOR_GRID}
      width={1}
      height={heightLine}
      y={0}
      x={scaleXBar(dataLine)}
    />
  ));
};

const renderLinesHorizontals = ({
  domainData,
  widthLine,
  scaleYBar,
}: {
  widthLine: number;
  domainData: string[];
  scaleYBar: ScaleBand<string>;
}) => {
  return domainData.map(dataLine => (
    <Rect
      key={`horizontal-line${dataLine}`}
      fill={COLOR_GRID}
      width={widthLine}
      height={1}
      y={scaleYBar(dataLine)}
      x={0}
    />
  ));
};

export const findCoordsNearest = (pointCoord: [number, number]) => {
  const arrayGrid = Array.from({length: SIZE_GRID}, (_, i) => i.toString());
  const scaleXBar = ScaleXBar({
    domainData: arrayGrid,
    sizeScreen: WIDTH_SCREEN,
  });

  const scaleYBar = ScaleYBar({
    domainData: arrayGrid,
    sizeScreen: HEIGHT_SCREEN,
  });

  const filterXCoords = arrayGrid.map(point =>
    parseInt(scaleXBar(point) as unknown as string),
  );
  const filterYCoords = arrayGrid.map(point =>
    parseInt(scaleYBar(point) as unknown as string),
  );
  return {
    x: findClosestNumber(filterXCoords, pointCoord[0]),
    y: findClosestNumber(filterYCoords, pointCoord[1]),
  };
};
