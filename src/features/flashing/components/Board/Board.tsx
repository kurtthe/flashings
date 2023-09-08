import React from 'react';
import { TouchableOpacity, GestureResponderEvent } from 'react-native';
import {
  DREW_LINE_TYPE,
  heightScreen,
  LINE_SELECTED,
  widthScreen,
} from './types';
import { findCoordsNearest } from '@features/flashing/components/Grid/Grid.utils';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SvgBoard from '@features/flashing/components/SvgBoard';
import { ModalBottom, ModalBottomRef } from '@components';
import MeasurementLines from '@features/flashing/components/MeasurementLines';
import { drawLines, drawParallelLines } from "@features/flashing/components/Board/utils";
import { Path } from 'react-native-redash';
import SectionsButton from "@features/flashing/components/SectionsButton";
import { LINE_TYPE, MODES_BOARD, POINT_TYPE } from "@models";
import { isNaN } from "lodash";
import { Box } from "@ui/components";

type Props = {
  lines: LINE_TYPE[];
  onAddPoint?: (newPoint: POINT_TYPE) => void;
  onUpdatePoint?: (dataLine: LINE_SELECTED) => void;
  onSave?: () => void;
  onTape?: ()=> void
  width?: number;
  height?: number;
  changeMode?: (newMode:MODES_BOARD) => void;
  backStep?: () => void;
  mode: MODES_BOARD;
  rightLinePaint: boolean;
};

const Board: React.FC<Props> = ({
  lines,
  onUpdatePoint,
  onAddPoint,
  width = widthScreen,
  height = heightScreen,
  mode = 'draw',
  changeMode,
  rightLinePaint,
  onSave,
  onTape,
  backStep
}) => {
  const modalBottomRef = React.useRef<ModalBottomRef>();
  const [graphs, setGraphs] = React.useState<DREW_LINE_TYPE[]>([]);
  const [pointSelected, setPointSelected] = React.useState<
    LINE_SELECTED | undefined
  >();
  const [pathParallel, setPathParallel] = React.useState<Path | null>(null)
  const [indexLineSelected, setIndexLineSelected] = React.useState(0)
  const [visibleKeyboard, setVisibleKeyboard] = React.useState(false)
  const [showKeyboard, setShowKeyboard] = React.useState(false)

  const isDrawing = mode === 'draw';

  React.useEffect(() => {
    const makingLines = drawLines({
      lines,
      widthGraph: width,
      heightGraph: height,
      mode,
      rightLinePaint,
      lineSelected: indexLineSelected
    });
    setPathParallel(drawParallelLines(lines, rightLinePaint))
    setGraphs(makingLines);
  }, [lines, mode, rightLinePaint, indexLineSelected]);

  React.useEffect(()=>{
    if(mode === "finish" ) {
      modalBottomRef.current?.hide()
      setVisibleKeyboard(false)
    }
    if(mode !== 'measurements') {
      return setVisibleKeyboard(false);
    }
    setPointSelected({
      numberLine: indexLineSelected,
      sizeLine: lines[indexLineSelected]?.distance ?? 0,
    });
    modalBottomRef.current?.show()
    setVisibleKeyboard(true)
  }, [mode, indexLineSelected])

  const handleDoneSize = (newSize: number) => {
    if (!pointSelected ) return;

    if(isNaN(newSize)) return
    onUpdatePoint && onUpdatePoint({ ...pointSelected, sizeLine: newSize });
  };
  const handlePointer = (event: GestureResponderEvent) => {
    if (!isDrawing) return;
    const newPosition = findCoordsNearest([
      event.nativeEvent.locationX,
      event.nativeEvent.locationY,
    ]);

    onAddPoint && onAddPoint([newPosition.x, newPosition.y]);
  };

  const handleNextLineSelected = ()=>{
    const newIndex = indexLineSelected + 1
    const lengthLine = lines.length - 1

    setIndexLineSelected(newIndex > lengthLine? lengthLine : newIndex)

    if(newIndex > lengthLine){
      changeMode && changeMode('finish')
    }
  }

  const handleBackLineSelected = ()=>{
    const newIndex = indexLineSelected - 1
    setIndexLineSelected(newIndex <= 0? 0 : newIndex)
  }

  const handleOnSave = ()=> {
    onSave && onSave()
  }
  const handleOnTape = ()=> {
    onTape && onTape()
  }

  const validateShowHigher = () => {
    if(!graphs.length) return 0

    const getSelectedLine = graphs[indexLineSelected];
    if(getSelectedLine?.points?.length <= 1) return 0

    if(visibleKeyboard && getSelectedLine.points[1][1] > 384){
      return (getSelectedLine.points[1][1] / indexLineSelected) * -1
    }
    return 0
  }

  return (
    <Box style={{marginTop: validateShowHigher()}}>
      <TouchableOpacity activeOpacity={1} onPress={handlePointer} >
        <GestureHandlerRootView>
          <SvgBoard graphs={graphs} pathParallel={pathParallel} />
        </GestureHandlerRootView>
      </TouchableOpacity>
      <ModalBottom
        onCloseFinish={() => {
          if (mode === "finish") return
          backStep && backStep();
        }}
        backdropBackgroundColor="transparent"
        draggable={false}
        ref={modalBottomRef}
        height={showKeyboard? 380 :320}
        borderRadius={0}>
        <MeasurementLines
          handleInput={(visibleKeyBoard: boolean)=> setShowKeyboard(visibleKeyBoard)}
          disabledPrevious={indexLineSelected === 0}
          onNext={handleNextLineSelected}
          onPrevious={handleBackLineSelected}
          onDone={handleDoneSize}
          dataLine={pointSelected}
        />
      </ModalBottom>
      {mode === "finish" && <SectionsButton onSave={handleOnSave} onSetTape={handleOnTape} />}
    </Box>
  );
};

export default Board;
