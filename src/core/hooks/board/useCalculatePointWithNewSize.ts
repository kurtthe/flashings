import {useAppDispatch, useAppSelector} from '@hooks/useStore';
import {LINE_TYPE, POINT_TYPE} from '@models/board';
import {boardActions} from '@store/board';
import {
  getBoardFlashingData,
  getIndexLineSelected,
} from '@store/board/selectors';
import React from 'react';

type PositionsLine = 'first' | 'last' | 'middle';

const useCalculatePointWithNewSize = () => {
  const dispatch = useAppDispatch();
  const indexLineSelected = useAppSelector(getIndexLineSelected);
  const dataFlashing = useAppSelector(state => getBoardFlashingData(state));

  const changeMeasurement = React.useCallback(
    (newSize: number) => {
      if (!dataFlashing) return;

      const isFirstLine = indexLineSelected === 0;
      const isLastLine =
        indexLineSelected === dataFlashing.dataLines.length - 1;

      let positionLine: PositionsLine = 'middle';

      if (isFirstLine || isLastLine) {
        positionLine = isFirstLine ? 'first' : 'last';
        const infoLine = dataFlashing.dataLines[indexLineSelected];

        const newPointData = calculateNewCoordinatesForTheLine(
          positionLine,
          newSize,
        );
        dispatch(
          boardActions.updatePoint({
            dataLine: {...infoLine, distance: newSize, points: newPointData},
          }),
        );
        return;
      }

      calculateCoordinatesMiddleLines();
    },
    [dataFlashing, indexLineSelected],
  );

  // {"points":[[102,340],[68,238]],"pending":3,"distance":108,"isLine":true}
  const calculateNewCoordinatesForTheLine = React.useCallback(
    (
      positionLine: PositionsLine,
      newSize: number,
      indexLine = indexLineSelected,
    ): POINT_TYPE[] => {
      if (!dataFlashing)
        return [
          [0, 0],
          [0, 0],
        ];
      const dataLineSelected = dataFlashing.dataLines[indexLine];

      if (!dataLineSelected)
        return [
          [0, 0],
          [0, 0],
        ];
      const indexDataPointStatic = positionLine === 'first' ? 1 : 0;
      const dataPointStatic = dataLineSelected.points[indexDataPointStatic];

      const baseX = dataPointStatic[0];
      const baseY = dataPointStatic[1];

      //convert the pending to angle
      const arctanPending = Math.atan(dataLineSelected.pending);
      //getting direction of the line
      const dx = Math.cos(arctanPending);
      const dy = Math.sin(arctanPending);

      const newPoint1x = baseX + newSize * dx;
      const newPoint1y = baseY + newSize * dy;

      const newPoints: POINT_TYPE[] =
        positionLine === 'first'
          ? [[newPoint1x, newPoint1y], dataPointStatic]
          : [dataPointStatic, [newPoint1x, newPoint1y]];

      return newPoints;
    },

    [dataFlashing],
  );

  const calculateCoordinatesMiddleLines = () => {
    if (!dataFlashing) return;

    let initialPointForNextLine: POINT_TYPE = [0, 0];

    const newDataLines: LINE_TYPE[] = dataFlashing.dataLines.map(
      (dataLineItem, indexDataLineItem) => {
        if (indexDataLineItem >= indexLineSelected) {
          const newPoints = calculateNewCoordinatesForTheLine(
            'last',
            dataLineItem.distance,
            indexDataLineItem,
          );

          const newPointWithBeforeLine =
            indexLineSelected === indexDataLineItem
              ? newPoints
              : [initialPointForNextLine, newPoints[1]];
          return {
            ...dataLineItem,
            points: newPointWithBeforeLine,
          };
        }

        return dataLineItem;
      },
    );

    dispatch(
      boardActions.updateDataFlashing({
        dataFlashing: {
          dataLines: newDataLines,
        },
      }),
    );
  };

  return {
    changeMeasurement,
  };
};

export default useCalculatePointWithNewSize;
