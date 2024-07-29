import React from 'react';
import { StyleSheet } from 'react-native';
import {
  BackIcon,
  ClearIcon,
  LibraryIcon,
  NextIcon,
  UndoIcon,
} from '@assets/icons';
import { Box } from '@ui/components';
import { getIndexOfStepForName } from '@features/flashing/utils';
import Alert from '@services/general-request/alert';
import { useAppDispatch, useAppSelector } from '@hooks/useStore';
import {
  getDataFlashingDraft,
  getIsEdit,
  getStep,
} from '@store/flashings/selectors';
import { actions as flashingActions } from '@store/flashings/actions';
import { Routes as RoutesFlashing } from '@features/flashing/navigation/routes';
import { useNavigation } from '@react-navigation/native';
import { StackPrivateDefinitions, StackPrivateProps } from '@models/navigation';
import IconMenuEditor from '@features/flashing/components/MenuEditor/IconMenuEditor';
import { useSelector } from 'react-redux';

type Props = {
  onUndo?: () => void;
  onSave: () => void;
};

const MenuEditorComponent: React.FC<Props> = ({ onSave, onUndo }) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<StackPrivateProps>();
  const isEdit = useSelector(getIsEdit);

  const flashingDataDraft = useAppSelector(state =>
    getDataFlashingDraft(state),
  );
  const stepBoard = useAppSelector(state => getStep(state));

  const _disabledBack = React.useMemo(() => {
    return stepBoard === getIndexOfStepForName('draw');
  }, [stepBoard]);

  const _disabledNext = React.useMemo(() => {
    return (
      stepBoard === getIndexOfStepForName('finish') ||
      stepBoard === getIndexOfStepForName('save_tapered')
    );
  }, [stepBoard]);

  const _disabledUndo = React.useMemo(() => {
    if (!flashingDataDraft) return true;

    return (
      flashingDataDraft.dataLines.length === 0 ||
      stepBoard !== getIndexOfStepForName('draw')
    );
  }, [flashingDataDraft?.dataLines, stepBoard]);

  const _disabledEraser = React.useMemo(() => {
    if (!flashingDataDraft) return true;
    return flashingDataDraft.dataLines.length === 0;
  }, [flashingDataDraft?.dataLines]);

  const _changeStep = React.useCallback((newIndexStep: number) => {
    dispatch(flashingActions.changeStep({ step: newIndexStep }));
  }, []);

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

  const handleNext = () => {
    if (!flashingDataDraft) return;

    if (stepBoard === getIndexOfStepForName('end_type')) {
      if (isEdit && !!flashingDataDraft?.tapered) {
        _changeStep(getIndexOfStepForName('tapered'));
        return;
      }
    }

    if (stepBoard === getIndexOfStepForName('tapered')) {
      _changeStep(getIndexOfStepForName('save_tapered'));
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

  const handleLibrary = () => {
    navigation.navigate(StackPrivateDefinitions.FLASHING, {
      screen: RoutesFlashing.LIST_TEMPLATES,
    });
  };

  const handleBack = () => {
    if (stepBoard === getIndexOfStepForName('tapered')) {
      _changeStep(getIndexOfStepForName('finish'));
      return;
    }
    const newStep = stepBoard - 1;
    if (newStep < 0) return;
    _changeStep(newStep);
  };

  return (
    <Box
      py="s"
      mb="xl"
      backgroundColor="white"
      position="absolute"
      width="100%"
      bottom="-4%"
      style={styles.shadow}>
      <Box px="m" style={styles.content}>
        <IconMenuEditor
          disabled={_disabledBack}
          onPress={handleBack}
          nameIcon={BackIcon}
          title="Back"
          color="black"
          size={20}
        />
        <IconMenuEditor
          disabled={_disabledUndo}
          onPress={() => onUndo && onUndo()}
          nameIcon={UndoIcon}
          title="Undo"
        />
        <IconMenuEditor
          onPress={handleClear}
          disabled={_disabledEraser}
          nameIcon={ClearIcon}
          title="Clear"
          size={22}
        />
        <IconMenuEditor
          disabled={false}
          onPress={handleLibrary}
          nameIcon={LibraryIcon}
          title="Library"
        />
        <IconMenuEditor
          disabled={_disabledNext}
          onPress={handleNext}
          nameIcon={NextIcon}
          title="Next"
          size={22}
        />
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  shadow: {
    shadowOffset: {
      width: 0,
      height: -4,
    },
    elevation: 16,
    shadowRadius: 10,
    shadowColor: 'rgba(47, 51, 80, 0.12)',
    shadowOpacity: 1,
  },
});

export default MenuEditorComponent;
