import React from 'react';
import ViewShot from 'react-native-view-shot';
import {
  calculateAngle,
  calculatePending,
  calculateSizeLine,
  getIndexOfStepForName,
  getLastPoint,
  validateLineComplete,
} from '@features/flashing/utils';
import GuideStepperBoardComponent from '@features/flashing/components/GuideStepperBoard';
import Alert from '@services/general-request/alert';
import {
  TYPE_ACTIONS_STEP,
  VALUE_ACTIONS,
} from '@features/flashing/components/GuideStepperBoard/GuideStepperBoard.type';
import { LINE_TYPE, POINT_TYPE, TYPE_END_LINES } from '@models';
import { useAppDispatch, useAppSelector } from '@hooks/useStore';
import { actions as jobActions } from '@store/jobs/actions';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Routes as RoutesJobs } from '@features/jobs/navigation/routes';
import { Routes as RoutesFlashing } from '@features/flashing/navigation/routes';
import { FlashingParamsList } from '@features/flashing/navigation/Stack.types';
import { jobData } from '@store/jobs/selectors';
import { isAndroid } from '@shared/platform';
import { useKeyboardVisibility } from '@hooks/useKeyboardVisibility';
import alert from '@services/general-request/alert';
import { imageToBase64 } from '@shared/utils';
import { LINE_SELECTED } from '@features/flashing/components/Board/types';
import Board from '@features/flashing/components/Board/Board';
import MenuEditorComponent from '../components/MenuEditor';
import { StackPrivateDefinitions, StackPrivateProps } from '@models/navigation';
import { templateSelected } from '@store/templates/selectors';
import { getDataFlashingDraft, getStep } from '@store/flashings/selectors';
import Loading from '@components/Loading';
import { actions as templateActions } from '@store/templates/actions';
import { actions as flashingActions } from '@store/flashings/actions';

type StateDataBoard = {
  lines: LINE_TYPE[];
  anglesLines: number[];
  blueLineIsRight: boolean;
  startTypeLine: TYPE_END_LINES;
  endTypeLine: TYPE_END_LINES;
};

const BoardContainer = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<StackPrivateProps>();
  const route =
    useRoute<RouteProp<FlashingParamsList, RoutesFlashing.BOARD_FLASHING>>();
  const templateChose = useAppSelector(state => templateSelected(state));
  const flashingDataDraft = useAppSelector(state =>
    getDataFlashingDraft(state),
  );
  const stepBoard = useAppSelector(state => getStep(state));
  const dataJob = useAppSelector(state => jobData(state, route.params?.jobId));

  const [loading, setLoading] = React.useState(false);

  const refViewShot = React.createRef<ViewShot>();
  const showKeyboard = useKeyboardVisibility({});
  React.useEffect(() => {
    if (!templateChose) return;
    setLoading(true);
    dispatch(
      flashingActions.updateFlashingDraft({
        dataFlashing: {
          dataLines: templateChose.dataLines,
          parallelRight: templateChose.parallelRight,
          startType: templateChose.startType,
          endType: templateChose.endType,
          angles: templateChose.angles,
        },
      }),
    );

    const delay = setTimeout(() => {
      dispatch(templateActions.templateSelected({ idTemplate: null }));
      setLoading(false);
    }, 2000);

    return () => {
      clearTimeout(delay);
    };
  }, [templateChose, dispatch]);

  React.useEffect(() => {
    if (!flashingDataDraft) return;
    if (flashingDataDraft.dataLines.length < 2) return;

    const newAngles = flashingDataDraft.dataLines.map(
      (line, index, arrayLines) => {
        if (!flashingDataDraft.angles[index]) {
          return calculateAngle(line, arrayLines[index + 1]) ?? 0;
        }
        return flashingDataDraft.angles[index];
      },
    );

    dispatch(
      flashingActions.updateFlashingDraft({
        dataFlashing: {
          angles: newAngles,
        },
      }),
    );
  }, [flashingDataDraft?.dataLines]);

  const _changeStep = React.useCallback((newIndexStep: number) => {
    dispatch(flashingActions.changeStep({ step: newIndexStep }));
  }, []);

  const handleAddPoint = (newPoint: POINT_TYPE) => {
    if (!flashingDataDraft) return;
    if (flashingDataDraft.dataLines.length < 1) {
      const dataLine: LINE_TYPE = {
        points: [newPoint],
        pending: 0,
        distance: 0,
        isLine: false,
      };
      dispatch(
        flashingActions.updateFlashingDraft({
          dataFlashing: {
            dataLines: [dataLine],
          },
        }),
      );
      return;
    }

    const lineComplete = validateLineComplete(flashingDataDraft.dataLines);
    const lastPoint = getLastPoint(flashingDataDraft.dataLines);

    const validAddNewPoint = flashingDataDraft.dataLines.find(line => {
      return JSON.stringify(line.points[0]) === JSON.stringify(newPoint);
    });
    if (validAddNewPoint) return;

    const dataLine: LINE_TYPE = {
      points: [lastPoint, newPoint],
      pending: calculatePending(lastPoint, newPoint),
      distance: calculateSizeLine(lastPoint, newPoint),
      isLine: true,
    };

    if (!lineComplete) {
      dispatch(
        flashingActions.updateFlashingDraft({
          dataFlashing: {
            dataLines: [dataLine],
          },
        }),
      );
      return;
    }
    dispatch(
      flashingActions.updateFlashingDraft({
        dataFlashing: {
          dataLines: [...flashingDataDraft.dataLines, dataLine],
        },
      }),
    );
  };

  const handleUndo = () => {
    if (!flashingDataDraft) return;
    const newPointCoordinates = flashingDataDraft.dataLines.slice(0, -1);
    const newAngles = flashingDataDraft.angles.slice(0, -1);
    if (newPointCoordinates.length === 0 || !newPointCoordinates[0].isLine) {
      _changeStep(getIndexOfStepForName('draw'));
    }
    dispatch(
      flashingActions.updateFlashingDraft({
        dataFlashing: {
          dataLines: newPointCoordinates,
          angles: newAngles,
        },
      }),
    );
  };

  const handleBack = () => {
    const newStep = stepBoard - 1;
    if (newStep < 0) return;
    _changeStep(newStep);
  };

  const handleNext = () => {
    if (!flashingDataDraft) return;
    if (stepBoard === getIndexOfStepForName('finish')) {
      handleSave();
      return;
    }

    if (
      flashingDataDraft.dataLines.length === 0 ||
      !flashingDataDraft.dataLines[0].isLine
    ) {
      return Alert.show('Please draw a line', '');
    }
    const newStep = stepBoard + 1;
    _changeStep(newStep);
  };

  const handleUpdatePoint = (dataLine: LINE_SELECTED) => {
    if (!flashingDataDraft) return;
    const linesUpdated = flashingDataDraft.dataLines.map((line, index) => {
      if (dataLine.numberLine === index) {
        return {
          ...line,
          distance: dataLine.sizeLine,
        };
      }
      return line;
    });
    dispatch(
      flashingActions.updateFlashingDraft({
        dataFlashing: {
          dataLines: linesUpdated,
        },
      }),
    );
  };

  const handleClear = () => {
    dispatch(
      flashingActions.updateFlashingDraft({
        dataFlashing: {
          startType: 'none',
          endType: 'none',
          dataLines: [],
          angles: [],
          parallelRight: true,
        },
      }),
    );
    _changeStep(getIndexOfStepForName('draw'));
  };

  const handleLibrary = () => {
    // @ts-ignore
    navigation.navigate(RoutesFlashing.LIST_TEMPLATES);
  };

  const finishSteps = () => {
    console.log('on finish steps::');
  };

  const changeSettingsBoard = (newSettings: VALUE_ACTIONS) => {
    const sideBlueLine =
      newSettings[TYPE_ACTIONS_STEP.SIDE_PAINT_EDGE].toLowerCase();
    dispatch(
      flashingActions.updateFlashingDraft({
        dataFlashing: {
          parallelRight: sideBlueLine === 'right',
        },
      }),
    );
  };

  const handleUpdateAngle = (newAngle: number, positionAngle: number) => {
    const anglesUpdated = flashingDataDraft?.angles.map((angle, index) => {
      if (index === positionAngle) {
        return newAngle;
      }
      return angle;
    });
    dispatch(
      flashingActions.updateFlashingDraft({
        dataFlashing: {
          angles: anglesUpdated,
        },
      }),
    );
  };

  const handleSave = React.useCallback(() => {
    (async () => {
      if (!refViewShot.current) return;

      const idJob = route.params?.jobId;
      // @ts-ignore
      refViewShot.current
        .capture()
        .then(async uriScreen => {
          const dataB64Preview = await imageToBase64(uriScreen);
          if (!flashingDataDraft) return alert.show('Error saving flashing.');

          dispatch(
            jobActions.addEditFlashing({
              idJob,
              flashing: {
                ...flashingDataDraft,
                dataLines: flashingDataDraft.dataLines,
                parallelRight: flashingDataDraft.parallelRight,
                angles: flashingDataDraft.angles,
                endType: flashingDataDraft.endType,
                startType: flashingDataDraft.startType,
                imgPreview: `data:image/png;base64,${dataB64Preview}`,
              },
            }),
          );

          navigation.navigate(StackPrivateDefinitions.JOBS, {
            screen: RoutesJobs.JOB_DETAILS,
            params: {
              jobId: idJob,
              jobName: dataJob?.name,
            },
          });
        })
        .catch(error => {
          console.log('error: screenshot', error);
          alert.show('Error', 'Snapshot failed');
        });
    })();
  }, [flashingDataDraft]);

  if (loading || !dataJob || !flashingDataDraft) return <Loading />;

  return (
    <>
      {stepBoard !== getIndexOfStepForName('screen_shot') && (
        <GuideStepperBoardComponent
          step={stepBoard}
          onFinish={finishSteps}
          onChangeOption={changeSettingsBoard}
        />
      )}
      <ViewShot
        ref={refViewShot}
        onCapture={() => null}
        options={{ fileName: `flashing-shot${Math.random()}`, quality: 0.9 }}
        captureMode="mount"
        onCaptureFailure={error =>
          Alert.show('Error for preview', error.message)
        }>
        <Board
          onAddPoint={handleAddPoint}
          onUpdatePoint={handleUpdatePoint}
          onSave={handleSave}
          angles={flashingDataDraft.angles}
          updateAngle={handleUpdateAngle}
        />
      </ViewShot>
      {isAndroid &&
      showKeyboard &&
      stepBoard === getIndexOfStepForName('measurements') ? null : (
        <MenuEditorComponent
          disabledBack={stepBoard === getIndexOfStepForName('draw')}
          disabledNext={stepBoard === getIndexOfStepForName('finish')}
          disabledUndo={
            flashingDataDraft.dataLines.length === 0 ||
            stepBoard !== getIndexOfStepForName('draw')
          }
          disabledEraser={flashingDataDraft.dataLines.length === 0}
          onUndo={handleUndo}
          onBack={handleBack}
          onNext={handleNext}
          onEraser={handleClear}
          onLibrary={handleLibrary}
        />
      )}
    </>
  );
};

export default React.memo(BoardContainer);
