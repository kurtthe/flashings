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
import {LINE_TYPE, POINT_TYPE} from '@models';
import {useAppDispatch, useAppSelector} from '@hooks/useStore';
import {actions as jobActions} from '@store/jobs/actions';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {Routes as RoutesJobs} from '@features/jobs/navigation/routes';
import {Routes as RoutesFlashing} from '@features/flashing/navigation/routes';
import {FlashingParamsList} from '@features/flashing/navigation/Stack.types';
import {jobData} from '@store/jobs/selectors';
import {isAndroid, isTablet} from '@shared/platform';
import {useKeyboardVisibility} from '@hooks/useKeyboardVisibility';
import alert from '@services/general-request/alert';
import {imageToBase64, sleep} from '@shared/utils';
import {LINE_SELECTED} from '@features/flashing/components/Board/types';
import Board from '@features/flashing/components/Board/Board';
import {StackPrivateDefinitions, StackPrivateProps} from '@models/navigation';
import {templateSelected} from '@store/templates/selectors';
import {getDataFlashingDraft, getStep} from '@store/flashings/selectors';
import Loading from '@components/Loading';
import {actions as templateActions} from '@store/templates/actions';
import {actions as flashingActions} from '@store/flashings/actions';
import {MenuEditorComponent} from '@features/flashing/components';
import {getBends, getGirth} from '@shared/utils/JobOrders';
import Toast from 'react-native-toast-message';
import {config} from '@env/config';

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
  const [girthLeft, setGirthLeft] = React.useState(config.maxGirth);
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
      dispatch(templateActions.templateSelected({idTemplate: null}));
      setLoading(false);
    }, 2000);

    return () => {
      clearTimeout(delay);
    };
  }, [templateChose, dispatch]);

  React.useEffect(() => {
    if (!flashingDataDraft) return;
    const getHowManyGirth = getGirth(flashingDataDraft);
    const maxGirth = isTablet ? config.maxGirthTable : config.maxGirthPhone;

    if (getHowManyGirth >= maxGirth) {
      Toast.show({
        position: 'bottom',
        text1: `Girth must not exceed ${config.maxGirth}${config.unitMeasurement}`,
        type: 'info',
      });
    }
    setGirthLeft(maxGirth - getHowManyGirth);

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
    dispatch(flashingActions.changeStep({step: newIndexStep}));
  }, []);

  const _validationFoldsAndGirths = React.useCallback(() => {
    if (!flashingDataDraft) return false;

    const getHowManyFolds = getBends(flashingDataDraft);

    if (getHowManyFolds >= config.maxFolds) {
      Toast.show({
        position: 'bottom',
        text1: `You can't add more than ${config.maxFolds} bends.`,
        type: 'info',
      });
      return false;
    }

    return girthLeft > 0;
  }, [flashingDataDraft, girthLeft]);

  const handleAddPoint = (newPoint: POINT_TYPE) => {
    if (!_validationFoldsAndGirths() || !flashingDataDraft) return;

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

    if (flashingDataDraft.tapered) {
      dispatch(
        flashingActions.updateFlashingDraft({
          dataFlashing: {
            dataLines: [...flashingDataDraft.dataLines, dataLine],
            tapered: {
              ...flashingDataDraft.tapered,
              front: [...flashingDataDraft.tapered.front, dataLine],
              back: [...flashingDataDraft.tapered.back, dataLine],
            },
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
        flashingActions.changeSideTapered({
          isFront: sideTapered === 'front',
        }),
      );
      return;
    }

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

  const onCapturedScreenshot = () => {
    (async () => {
      try {
        const idJob = route.params?.jobId;

        if (
          !refViewShot.current ||
          !flashingDataDraft ||
          !flashingDataDraft.tapered
        )
          throw new Error('Snapshot failed');

        let dataFlashingTapered = flashingDataDraft;

        //@ts-ignore
        const uriPreviewBack = await refViewShot.current.capture();
        const dataB64PreviewBack = await imageToBase64(uriPreviewBack);

        dispatch(flashingActions.changeSideTapered({isFront: true}));
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
      if (!refViewShot.current || !flashingDataDraft) return;

      // @ts-ignore
      const uriScreen = await refViewShot.current.capture();
      const dataB64Preview = await imageToBase64(uriScreen);
      const idJob = route.params?.jobId;

      dispatch(
        jobActions.addEditFlashing({
          idJob,
          flashing: {
            ...flashingDataDraft,
            imgPreview: `data:image/png;base64,${dataB64Preview}`,
          },
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
    })();
  };

  const onScreenShot = () => {
    if (isSaveTapered) {
      onCapturedScreenshot();
    } else handleSave();
  };

  if (loading || !dataJob || !flashingDataDraft) return <Loading />;

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
        <Board
          onAddPoint={handleAddPoint}
          onUpdatePoint={handleUpdatePoint}
          onSave={onScreenShot}
          updateAngle={handleUpdateAngle}
        />
      </ViewShot>

      {(isAndroid &&
        showKeyboard &&
        stepBoard === getIndexOfStepForName('measurements')) ||
      stepBoard === getIndexOfStepForName('tapered') ? null : (
        <MenuEditorComponent
          onUndo={handleUndo}
          onSave={handleSave}
          disabledNext={girthLeft < 0}
        />
      )}
    </>
  );
};

export default React.memo(BoardContainer);
