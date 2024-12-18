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
import {useAppDispatch, useAppSelector} from '@hooks/useStore';
import {actions as jobActions} from '@store/jobs/actions';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {Routes as RoutesJobs} from '@features/jobs/navigation/routes';
import {Routes as RoutesFlashing} from '@features/flashing/navigation/routes';
import {FlashingParamsList} from '@features/flashing/navigation/Stack.types';
import {jobData} from '@store/jobs/selectors';
import {isAndroid} from '@shared/platform';
import {useKeyboardVisibility} from '@hooks/useKeyboardVisibility';
import alert from '@services/general-request/alert';
import {imageToBase64, sleep} from '@shared/utils';
import Board from '@features/flashing/components/Board/Board';
import {StackPrivateDefinitions, StackPrivateProps} from '@models/navigation';
import {templateSelected} from '@store/templates/selectors';
import Loading from '@components/Loading';
import {actions as templateActions} from '@store/templates/actions';
import {actions as flashingActions} from '@store/flashings/actions';
import {MenuEditorComponent} from '@features/flashing/components';
import {boardActions} from '@store/board';
import {LINE_TYPE, POINT_TYPE} from '@models/board';
import {
  getBoardFlashingData,
  getSideTapered,
  getStep,
} from '@store/board/selectors';
import {getDataFlashingInformation} from '@store/flashings/selectors';

const BoardContainer = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<StackPrivateProps>();
  const route =
    useRoute<RouteProp<FlashingParamsList, RoutesFlashing.BOARD_FLASHING>>();
  const templateChose = useAppSelector(state => templateSelected(state));
  const flashingDataBoard = useAppSelector(state =>
    getBoardFlashingData(state),
  );
  const flashingInformation = useAppSelector(state =>
    getDataFlashingInformation(state),
  );

  const stepBoard = useAppSelector(state => getStep(state));
  const dataJob = useAppSelector(state => jobData(state, route.params?.jobId));
  const [loading, setLoading] = React.useState(false);
  const refViewShot = React.useRef<ViewShot>(null);
  const showKeyboard = useKeyboardVisibility({});

  const isSaveTapered = React.useMemo(() => {
    return stepBoard === getIndexOfStepForName('save_tapered');
  }, [stepBoard]);

  const isScreenShot = React.useMemo(() => {
    return stepBoard === getIndexOfStepForName('screen_shot');
  }, [stepBoard]);

  React.useEffect(() => {
    if (!templateChose) return;
    setLoading(true);
    dispatch(
      boardActions.updateDataFlashing({
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
      dispatch(templateActions.templateSelected({idTemplate: null}));
      setLoading(false);
    }, 2000);

    return () => {
      clearTimeout(delay);
    };
  }, [templateChose, dispatch]);

  React.useEffect(() => {
    if (!flashingDataBoard) return;
    if (flashingDataBoard.dataLines.length < 2) return;

    const newAngles = flashingDataBoard.dataLines.map(
      (line, index, arrayLines) => {
        if (!flashingDataBoard.angles[index]) {
          return calculateAngle(line, arrayLines[index + 1]) ?? 0;
        }
        return flashingDataBoard.angles[index];
      },
    );

    dispatch(
      boardActions.updateDataFlashing({
        dataFlashing: {
          angles: newAngles,
        },
      }),
    );
  }, [flashingDataBoard?.dataLines]);

  const _changeStep = React.useCallback((newIndexStep: number) => {
    dispatch(boardActions.changeStep({step: newIndexStep}));
  }, []);

  // const _validationFoldsAndGirths = React.useCallback(() => {
  //   if (!flashingDataDraft) return;
  //   const getHowManyFolds = getBends(flashingDataDraft);
  //   const getHowManyGirth = getGirth(flashingDataDraft);
  //   if (getHowManyFolds >= config.maxFolds) {
  //     Toast.show({
  //       position: 'bottom',
  //       text1: `You can't add more than ${config.maxFolds} bends.`,
  //       type: 'info',
  //     });
  //     return;
  //   }

  //   if (getHowManyGirth >= config.maxGirth) {
  //     Toast.show({
  //       position: 'bottom',
  //       text1: `Girth must not exceed ${config.maxGirth}${config.unitMeasurement}`,
  //       type: 'info',
  //     });
  //     return;
  //   }
  // }, [flashingDataDraft]);

  const handleAddPoint = (newPoint: POINT_TYPE) => {
    if (!flashingDataBoard) return;
    if (flashingDataBoard.dataLines.length < 1) {
      const dataLine: LINE_TYPE = {
        points: [newPoint],
        pending: 0,
        distance: 0,
        isLine: false,
      };

      dispatch(
        boardActions.updateDataFlashing({
          dataFlashing: {
            dataLines: [dataLine],
          },
        }),
      );
      return;
    }

    const lineComplete = validateLineComplete(flashingDataBoard.dataLines);
    const lastPoint = getLastPoint(flashingDataBoard.dataLines);

    const validAddNewPoint = flashingDataBoard.dataLines.find(line => {
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
        boardActions.updateDataFlashing({
          dataFlashing: {
            dataLines: [dataLine],
          },
        }),
      );
      return;
    }

    if (flashingDataBoard.tapered) {
      dispatch(
        boardActions.updateDataFlashing({
          dataFlashing: {
            dataLines: [...flashingDataBoard.dataLines, dataLine],
            tapered: {
              ...flashingDataBoard.tapered,
              front: [...flashingDataBoard.tapered.front, dataLine],
              back: [...flashingDataBoard.tapered.back, dataLine],
            },
          },
        }),
      );
      return;
    }

    dispatch(
      boardActions.updateDataFlashing({
        dataFlashing: {
          dataLines: [...flashingDataBoard.dataLines, dataLine],
        },
      }),
    );
  };

  const handleUndo = () => {
    if (!flashingDataBoard) return;
    const newPointCoordinates = flashingDataBoard.dataLines.slice(0, -1);
    const newAngles = flashingDataBoard.angles.slice(0, -1);
    if (newPointCoordinates.length === 0 || !newPointCoordinates[0].isLine) {
      _changeStep(getIndexOfStepForName('draw'));
    }
    dispatch(
      boardActions.updateDataFlashing({
        dataFlashing: {
          dataLines: newPointCoordinates,
          angles: newAngles,
        },
      }),
    );
  };

  const finishSteps = () => {
    console.log('on finish steps::');
  };

  const changeSettingsBoard = (newSettings: VALUE_ACTIONS) => {
    if (
      stepBoard === getIndexOfStepForName('tapered') ||
      stepBoard === getIndexOfStepForName('save_tapered')
    ) {
      const sideTapered =
        newSettings[TYPE_ACTIONS_STEP.SIDE_TAPERED].toLowerCase();
      dispatch(
        boardActions.changeSideTapered({
          isFront: sideTapered === 'front',
        }),
      );
      return;
    }

    const sideBlueLine =
      newSettings[TYPE_ACTIONS_STEP.SIDE_PAINT_EDGE].toLowerCase();
    dispatch(
      boardActions.updateDataFlashing({
        dataFlashing: {
          parallelRight: sideBlueLine === 'right',
        },
      }),
    );
  };

  const onCapturedScreenshot = () => {
    (async () => {
      try {
        const idJob = route.params?.jobId;

        if (
          !refViewShot.current ||
          !flashingDataBoard ||
          !flashingDataBoard.tapered ||
          !getDataFlashingInformation
        )
          throw new Error('Snapshot failed');

        let dataFlashingTapered = {
          ...getDataFlashingInformation,
          ...flashingDataBoard,
        };

        //@ts-ignore
        const uriPreviewBack = await refViewShot.current.capture();
        const dataB64PreviewBack = await imageToBase64(uriPreviewBack);

        dispatch(boardActions.changeSideTapered({isFront: true}));
        await sleep(2000);

        //@ts-ignore
        const uriPreviewFront = await refViewShot.current.capture();
        const dataB64PreviewFront = await imageToBase64(uriPreviewFront);

        dataFlashingTapered = {
          ...dataFlashingTapered,
          //@ts-ignore
          tapered: {
            ...dataFlashingTapered.tapered,
            backImagePreview: `data:image/png;base64,${dataB64PreviewBack}`,
            frontImagePreview: `data:image/png;base64,${dataB64PreviewFront}`,
          },
        };

        dispatch(
          jobActions.addEditFlashing({
            idJob,
            flashing: dataFlashingTapered,
          }),
        );

        dispatch(flashingActions.clear());

        navigation.navigate(StackPrivateDefinitions.JOBS, {
          screen: RoutesJobs.JOB_DETAILS,
          params: {
            jobId: idJob,
            jobName: dataJob?.name,
          },
        });
      } catch (err) {
        console.log('error: screenshot', err);
        alert.show('Error', 'Snapshot failed');
      }
    })();
  };

  const handleSave = () => {
    (async () => {
      if (!refViewShot.current || !flashingDataBoard || !flashingInformation)
        return;

      // @ts-ignore
      const uriScreen = await refViewShot.current.capture();
      const dataB64Preview = await imageToBase64(uriScreen);
      const idJob = route.params?.jobId;

      dispatch(
        jobActions.addEditFlashing({
          idJob,
          flashing: {
            ...flashingInformation,
            ...flashingDataBoard,
            imgPreview: `data:image/png;base64,${dataB64Preview}`,
          },
        }),
      );

      dispatch(flashingActions.clear());
      dispatch(boardActions.clear());

      navigation.navigate(StackPrivateDefinitions.JOBS, {
        screen: RoutesJobs.JOB_DETAILS,
        params: {
          jobId: idJob,
          jobName: dataJob?.name,
        },
      });
    })();
  };

  const onScreenShot = () => {
    if (isSaveTapered) {
      onCapturedScreenshot();
    } else handleSave();
  };

  if (loading || !dataJob || !flashingDataBoard) return <Loading />;

  return (
    <>
      {!isScreenShot && (
        <GuideStepperBoardComponent
          onFinish={finishSteps}
          onChangeOption={changeSettingsBoard}
        />
      )}

      <ViewShot
        ref={refViewShot}
        onCapture={() => null}
        options={{fileName: `flashing-shot${Math.random()}`, quality: 0.9}}
        captureMode="mount"
        onCaptureFailure={error =>
          Alert.show('Error for preview', error.message)
        }>
        <Board onAddPoint={handleAddPoint} onSave={onScreenShot} />
      </ViewShot>

      {(isAndroid &&
        showKeyboard &&
        stepBoard === getIndexOfStepForName('measurements')) ||
      stepBoard === getIndexOfStepForName('tapered') ? null : (
        <MenuEditorComponent onUndo={handleUndo} onSave={handleSave} />
      )}
    </>
  );
};

export default React.memo(BoardContainer);
