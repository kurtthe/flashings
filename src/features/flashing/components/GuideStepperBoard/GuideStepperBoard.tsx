import React from 'react';
import { Box, Button, Card, Divider, Text } from '@ui/components';
import { Dimensions, StyleSheet } from 'react-native';
import {
  GUIDE_STEP,
  guideSteps,
  TYPE_ACTIONS_STEP,
  VALUE_ACTIONS,
} from '@features/flashing/components/GuideStepperBoard/GuideStepperBoard.type';
import { useAppSelector } from '@hooks/useStore';
import { getSideTapered, getStep } from '@store/flashings/selectors';
import { getIndexOfStepForName } from '@features/flashing/utils';
import { useSelector } from 'react-redux';

type Props = {
  onFinish: () => void;
  onChangeOption?: (newValue: VALUE_ACTIONS) => void;
};

const heightScreen = Dimensions.get('screen').height;
const GuideStepperBoardComponent: React.FC<Props> = ({
  onFinish,
  onChangeOption,
}) => {
  const stepBoard = useAppSelector(state => getStep(state));
  const isFront = useSelector(getSideTapered);

  const [dataStep, setDataStep] = React.useState<GUIDE_STEP>();
  const [optionSelected, setOptionSelected] = React.useState<VALUE_ACTIONS>({
    [TYPE_ACTIONS_STEP.SIDE_PAINT_EDGE]:
      dataStep?.action?.defaultOption ?? 'right',
    [TYPE_ACTIONS_STEP.SIDE_TAPERED]:
      dataStep?.action?.defaultOption ?? 'front',
  });

  React.useEffect(() => {
    setOptionSelected({
      ...optionSelected,
      [TYPE_ACTIONS_STEP.SIDE_TAPERED]: isFront ? 'front' : 'back',
    });
  }, [isFront]);

  React.useEffect(() => {
    const lengthSteps = guideSteps.length;
    const newDataStep = guideSteps.find(
      itemStep => itemStep.step === stepBoard,
    );
    if (!newDataStep) return;
    setDataStep(newDataStep);
    stepBoard >= lengthSteps && onFinish();
  }, [stepBoard, guideSteps]);

  const handleChangeOptionAction = (newValue: string) => {
    const keyValue = dataStep?.action?.key;
    if (!keyValue) return false;

    setOptionSelected({ ...optionSelected, [keyValue]: newValue });
    onChangeOption &&
      onChangeOption({ ...optionSelected, [keyValue]: newValue });
  };

  const isOptionSelected = (option: string) => {
    const keyValue = dataStep?.action?.key;
    if (!keyValue) return false;
    return option === optionSelected[keyValue];
  };

  if (!dataStep) return null;

  return (
    <Box style={styles.container} width="100%" p="m">
      <Card variant="guide" p="s" width="70%">
        <Text variant="bodyBold" textAlign="center">
          {dataStep.title}
        </Text>
        {dataStep.description && (
          <Text variant="bodyRegular" textAlign="center">
            {dataStep.description}
          </Text>
        )}
      </Card>
      {dataStep.action && (
        <Box
          top={
            stepBoard === getIndexOfStepForName('tapered')
              ? 0
              : heightScreen - 370
          }>
          <Card my="s" p="xs">
            <Box>
              {dataStep.action.title && (
                <>
                  <Text textAlign="center">{dataStep.action.title}</Text>
                  <Divider my="s" />
                </>
              )}
              <Box flexDirection="row" justifyContent="space-around">
                {dataStep.action.options.map((option, index) => (
                  <Button
                    key={`button-option-action-${index}`}
                    m="xs"
                    variant={
                      isOptionSelected(option.toLowerCase())
                        ? 'smallMenuActive'
                        : 'smallMenu'
                    }
                    onPress={() =>
                      handleChangeOptionAction(option.toLowerCase())
                    }
                    backgroundColor={
                      isOptionSelected(option.toLowerCase())
                        ? 'primaryBlue'
                        : 'white'
                    }>
                    {option}
                  </Button>
                ))}
              </Box>
            </Box>
          </Card>
        </Box>
      )}
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: 'transparent',
    top: -5,
    left: 0,
    zIndex: 1,

    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default GuideStepperBoardComponent;
