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
import { LINE_TYPE, POINT_TYPE } from '@models';
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
import { StackPrivateDefinitions, StackPrivateProps } from '@models/navigation';
import { templateSelected } from '@store/templates/selectors';
import { getDataFlashingDraft, getStep } from '@store/flashings/selectors';
import Loading from '@components/Loading';
import { actions as templateActions } from '@store/templates/actions';
import { actions as flashingActions } from '@store/flashings/actions';
import { MenuEditorComponent } from '@features/flashing/components';

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
  const refViewShot = React.useRef<ViewShot>();
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
    const idJob = route.params?.jobId;

    if (
      !refViewShot.current ||
      !flashingDataDraft ||
      !flashingDataDraft.tapered
    )
      return alert.show('Error', 'Snapshot failed');
    dispatch(flashingActions.changeSideTapered({ isFront: true }));
    let dataFlashingTapered = flashingDataDraft;

    //@ts-ignore
    refViewShot.current
      .capture()
      .then(async uriPreviewFront => {
        const dataB64PreviewFront = await imageToBase64(uriPreviewFront);

        dataFlashingTapered = {
          ...dataFlashingTapered,
          //@ts-ignore
          tapered: {
            ...dataFlashingTapered.tapered,
            frontImagePreview: `data:image/png;base64,${dataB64PreviewFront}`,
          },
        };
        dispatch(flashingActions.changeSideTapered({ isFront: false }));
        await new Promise(resolve => setTimeout(resolve, 500));

        //@ts-ignore
        refViewShot.current
          .capture()
          .then(async uriPreviewBack => {
            const dataB64PreviewBack = await imageToBase64(uriPreviewBack);
            dataFlashingTapered = {
              ...dataFlashingTapered,
              //@ts-ignore
              tapered: {
                ...dataFlashingTapered.tapered,
                backImagePreview: `data:image/png;base64,${dataB64PreviewBack}`,
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
          })
          .catch(error => {
            console.log('error: screenshot', error);
            alert.show('Error', 'Snapshot failed');
          });
      })
      .catch(error => {
        console.log('error: screenshot', error);
        alert.show('Error', 'Snapshot failed');
      });
  };

  const handleSave = () => {
    (async () => {
      if (!refViewShot.current || !flashingDataDraft) return;

      const idJob = route.params?.jobId;
      // @ts-ignore
      refViewShot.current
        .capture()
        .then(async uriScreen => {
          const dataB64Preview = await imageToBase64(uriScreen);

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
        })
        .catch(error => {
          console.log('error: screenshot', error);
          alert.show('Error', 'Snapshot failed');
        });
    })();
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
        options={{ fileName: `flashing-shot${Math.random()}`, quality: 0.9 }}
        captureMode="mount"
        onCaptureFailure={error =>
          Alert.show('Error for preview', error.message)
        }>
        <Board
          onAddPoint={handleAddPoint}
          onUpdatePoint={handleUpdatePoint}
          onSave={() => (isSaveTapered ? onCapturedScreenshot() : handleSave())}
          updateAngle={handleUpdateAngle}
        />
      </ViewShot>

      {isAndroid &&
      showKeyboard &&
      stepBoard === getIndexOfStepForName('measurements') ? null : (
        <MenuEditorComponent onUndo={handleUndo} onSave={handleSave} />
      )}
    </>
  );
};

export default React.memo(BoardContainer);
