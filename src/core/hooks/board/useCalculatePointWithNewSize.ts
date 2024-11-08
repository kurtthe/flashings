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

      calculateCoordinatesMiddleLines(newSize);
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
      const increasing = dataLineSelected.distance === newSize;

      if (!dataLineSelected) return dataLineSelected;

      const indexDataPointStatic = positionLine === 'first' ? 1 : 0;
      const dataPointStatic = dataLineSelected.points[indexDataPointStatic];

      const baseX = dataPointStatic[0];
      const baseY = dataPointStatic[1];

      let newPoint1x, newPoint1y;

      if (dataLineSelected.pending === 0) {
        const increasingX = dataLineSelected.distance > newSize;
        newPoint1x = increasingX ? baseX + newSize : Math.abs(newSize - baseX);

        return positionLine === 'first'
          ? [[newPoint1x, baseY], dataPointStatic]
          : [dataPointStatic, [newPoint1x, baseY]];
      }

      const arctanPending = Math.atan(dataLineSelected.pending);
      const dx = Math.cos(arctanPending);
      const dy = Math.sin(arctanPending);

      newPoint1x = increasing ? baseX + newSize * dx : baseX - newSize * dx;
      newPoint1y = increasing ? baseY + newSize * dy : baseY - newSize * dy;

      return positionLine === 'first'
        ? [[newPoint1x, newPoint1y], dataPointStatic]
        : [dataPointStatic, [newPoint1x, newPoint1y]];
    },

    [dataFlashing],
  );

  const calculateCoordinatesMiddleLines = (newSize: number) => {
    if (!dataFlashing) return;

    let savePrevValue = dataFlashing.dataLines[indexLineSelected].points[1];

    const updatedDataLines: LINE_TYPE[] = dataFlashing.dataLines.map(
      (currentLine, lineIndex) => {
        if (lineIndex < indexLineSelected) {
          return currentLine;
        }

        const isCurrentLineSelected = lineIndex === indexLineSelected;
        const newPoints = calculateNewCoordinatesForTheLine(
          'last',
          currentLine.distance,
          lineIndex,
        );
        console.log('==================', lineIndex, '==================');

        console.log('===<currentLine::', JSON.stringify(currentLine));
        console.log('==>newPoints::', JSON.stringify(newPoints));
        console.log('==>savePrevValue::', JSON.stringify(savePrevValue));

        const previousPoint =
          lineIndex > indexLineSelected ? savePrevValue : currentLine.points[0];

        const updatedPoints = isCurrentLineSelected
          ? newPoints
          : [previousPoint, newPoints[1]];
        console.log('===<updatedPoints::', JSON.stringify(updatedPoints));
        savePrevValue = newPoints[1];

        return {
          ...currentLine,
          points: updatedPoints,
          distance: isCurrentLineSelected ? newSize : currentLine.distance,
        };
      },
    );

    dispatch(
      boardActions.updateDataFlashing({
        dataFlashing: {
          dataLines: updatedDataLines,
        },
      }),
    );
  };

  return {
    changeMeasurement,
  };
};

export default useCalculatePointWithNewSize;
