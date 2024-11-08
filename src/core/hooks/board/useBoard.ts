import {useAppSelector} from '@hooks/useStore';
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
import {
  getBoardFlashingData,
  getIndexLineSelected,
  getTypeSelected,
} from '@store/board/selectors';
import {POINT_TYPE} from '@models/board';

type ParamsBoardHook = {
  width?: number;
  height?: number;
};

export const useBoard = ({
  width = widthScreen,
  height = heightScreen,
}: ParamsBoardHook) => {
  const [graphs, setGraphs] = React.useState<DREW_LINE_TYPE[]>([]);
  const indexLineSelected = useAppSelector(getIndexLineSelected);
  const typeSelected = useAppSelector(getTypeSelected);
  const flashingDataDraft = useAppSelector(state =>
    getBoardFlashingData(state),
  );

  const [pathParallel, setPathParallel] = React.useState<Path | null>(null);
  const [pointsForLabel, setPointsForLabel] = React.useState<
    null | POINT_TYPE[][]
  >(null);

  React.useEffect(() => {
    makeLines();
  }, [flashingDataDraft, typeSelected, indexLineSelected]);

  const makeLines = React.useCallback(() => {
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
  }, [flashingDataDraft, indexLineSelected, typeSelected]);

  return {
    reMakeLines: makeLines,
    pathParallel,
    graphs,
    pointsForLabel,
  };
};
