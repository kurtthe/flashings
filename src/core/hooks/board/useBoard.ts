import {useAppSelector} from '@hooks/useStore';
import {getDataFlashingDraft} from '@store/flashings/selectors';
import React from 'react';
import {
  drawLines,
  drawParallelLines,
  positionTextLabels,
} from '@features/flashing/components/Board/utils';
import {
  DREW_LINE_TYPE,
  heightScreen,
  widthScreen,
} from '@features/flashing/components/Board/types';
import {Path} from 'react-native-redash';
import {POINT_TYPE} from '@models/flashings';

type ParamsBoardHook = {
  width?: number;
  height?: number;
};

type ParamsMakeLines = {
  indexLineSelected: number;
  typeSelected: 'line' | 'angle';
};

export const useBoard = ({
  width = widthScreen,
  height = heightScreen,
}: ParamsBoardHook) => {
  const [graphs, setGraphs] = React.useState<DREW_LINE_TYPE[]>([]);

  const flashingDataDraft = useAppSelector(state =>
    getDataFlashingDraft(state),
  );

  const [pathParallel, setPathParallel] = React.useState<Path | null>(null);
  const [pointsForLabel, setPointsForLabel] = React.useState<
    null | POINT_TYPE[][]
  >(null);

  React.useEffect(() => {
    makeLines({indexLineSelected: 0, typeSelected: 'line'});
  }, [flashingDataDraft]);

  const makeLines = React.useCallback(
    ({indexLineSelected = 0, typeSelected = 'line'}: ParamsMakeLines) => {
      if (!flashingDataDraft) return;

      const makingLines = drawLines({
        lines: flashingDataDraft.dataLines,
        widthGraph: width,
        heightGraph: height,
        rightLinePaint: flashingDataDraft.parallelRight,
        lineSelected: indexLineSelected,
        typeSelected,
        anglesLines: flashingDataDraft.angles,
      });
      setPathParallel(
        drawParallelLines(
          flashingDataDraft.dataLines,
          flashingDataDraft.parallelRight,
        ),
      );
      setPointsForLabel(
        positionTextLabels(
          flashingDataDraft.dataLines,
          !flashingDataDraft.parallelRight,
        ),
      );
      setGraphs(makingLines);
    },
    [flashingDataDraft],
  );

  return {
    reMakeLines: makeLines,
    pathParallel,
    graphs,
    pointsForLabel,
  };
};
