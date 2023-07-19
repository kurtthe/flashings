import {
  ALIGN_BARS,
  LINE_OFFSET,
  PADDING_BARS,
} from '@features/flashing/components/Grid/Grid.types';
import {scaleBand} from 'd3-scale';

type ScaleColumnType = {
  domainData: string[];
  sizeScreen: number;
  paddingInner?: number;
  paddingOuter?: number;
  align?: number;
};

const scaleColumns = ({
  domainData,
  sizeScreen,
  paddingInner = PADDING_BARS,
  paddingOuter = PADDING_BARS,
  align = ALIGN_BARS,
}: ScaleColumnType) =>
  scaleBand()
    .domain(domainData)
    .range([LINE_OFFSET, sizeScreen - LINE_OFFSET])
    .paddingInner(paddingInner)
    .paddingOuter(paddingOuter)
    .align(align)
    .round(true);

export const ScaleXBar = (dataScale: ScaleColumnType) =>
  scaleColumns(dataScale);

export const ScaleYBar = (dataScale: ScaleColumnType) =>
  scaleColumns(dataScale);
