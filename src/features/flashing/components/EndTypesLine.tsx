import React from 'react';
import {BaseTouchable, Box, Icon, Text} from '@ui/components';
import {
  EndBreakLeft2Icon,
  EndBreakLeftIcon,
  EndBreakRight2Icon,
  EndBreakRightIcon,
  EndCurveLeftIcon,
  EndCurveRightIcon,
} from '@assets/icons';
import {StyleSheet, ViewStyle} from 'react-native';
import {useAppDispatch, useAppSelector} from '@hooks/useStore';
import {isTablet} from '@shared/platform';
import {SIZE_ICON_PHONE, SIZE_ICON_TABLET} from '@theme';
import {TYPE_END_LINES} from '@models/board';
import {getBoardFlashingData} from '@store/board/selectors';
import {boardActions} from '@store/board';

const ButtonEndType = ({
  title,
  icon,
  fullWidth = false,
  style = {},
  onPress,
  active = false,
}: {
  title: string;
  icon?: any;
  fullWidth?: boolean;
  style?: ViewStyle;
  onPress?: () => void;
  active?: boolean;
}) => {
  return (
    <BaseTouchable
      onPress={() => onPress && onPress()}
      my="xxs"
      mx="s"
      backgroundColor={active ? 'lightBlue' : 'transparent'}
      style={[
        styles.button,
        fullWidth && {width: isTablet ? '92%' : '95%'},
        style,
      ]}>
      <Text textAlign={!icon ? 'center' : 'left'} variant="bodyRegular" mx="s">
        {title}
      </Text>
      {icon && (
        <Icon
          as={icon}
          size={isTablet ? SIZE_ICON_TABLET : SIZE_ICON_PHONE}
          color="grayIcon"
        />
      )}
    </BaseTouchable>
  );
};
const EndTypesLineComponent = ({}) => {
  const dispatch = useAppDispatch();
  const flashingDataDraft = useAppSelector(state =>
    getBoardFlashingData(state),
  );

  const [currentValueStartSelected, setCurrentValueStartSelected] =
    React.useState<TYPE_END_LINES>('none');
  const [currentValueEndSelected, setCurrentValueEndSelected] =
    React.useState<TYPE_END_LINES>('none');
  const [typeLine, setTypeLine] = React.useState<'start' | 'end'>('start');

  React.useEffect(() => {
    if (!flashingDataDraft) return;
    setCurrentValueStartSelected(flashingDataDraft.startType);
    setCurrentValueEndSelected(flashingDataDraft.endType);
  }, [flashingDataDraft?.endType, flashingDataDraft?.startType]);

  const handlePressButton = (label: TYPE_END_LINES = 'none') => {
    if (!flashingDataDraft) return;
    const getHowManyFolds = getBends(flashingDataDraft);

    if (getHowManyFolds >= config.maxFolds) {
      Toast.show({
        position: 'bottom',
        text1: `You can't add more than ${config.maxFolds} bends.`,
        type: 'info',
      });
      return;
    }

    if (typeLine === 'start') {
      dispatch(
        boardActions.updateDataFlashing({
          dataFlashing: {
            startType: label,
          },
        }),
      );
      setCurrentValueStartSelected(label);
      return;
    }
    dispatch(
      boardActions.updateDataFlashing({
        dataFlashing: {
          endType: label,
        },
      }),
    );
    setCurrentValueEndSelected(label);
  };
  const handleClearLineType = () => {
    if (typeLine === 'start') {
      setCurrentValueStartSelected('none');
      dispatch(
        boardActions.updateDataFlashing({
          dataFlashing: {
            startType: 'none',
          },
        }),
      );
      return;
    }
    setCurrentValueEndSelected('none');
    dispatch(
      boardActions.updateDataFlashing({
        dataFlashing: {
          endType: 'none',
        },
      }),
    );
  };
  const validateTypeLine = (typeLineStartEnd: TYPE_END_LINES) => {
    if (typeLine === 'start') {
      return currentValueStartSelected === typeLineStartEnd;
    }
    return currentValueEndSelected === typeLineStartEnd;
  };

  return (
    <Box flex={1} backgroundColor="white" p="m">
      <Box
        flexDirection="row"
        pt="s"
        mx="s"
        alignItems="center"
        justifyContent="space-between">
        <Text variant="bodyBold">End Type</Text>
        <Box flexDirection="row">
          <Text
            fontWeight="600"
            fontSize={18}
            mr="s"
            variant={typeLine === 'start' ? 'typeJobActive' : 'typeJob'}
            onPress={() => setTypeLine('start')}>
            Start
          </Text>
          <Text
            fontWeight="600"
            fontSize={18}
            variant={typeLine === 'end' ? 'typeJobActive' : 'typeJob'}
            onPress={() => setTypeLine('end')}>
            End
          </Text>
        </Box>
      </Box>
      <Box py="m" flexDirection="row" flexWrap="wrap">
        <ButtonEndType
          title="None"
          fullWidth
          style={{height: isTablet ? 50 : 40}}
          active={validateTypeLine('none')}
          onPress={() => handleClearLineType()}
        />
        <ButtonEndType
          title="Safety"
          active={validateTypeLine(
            `safety${typeLine === 'end' ? '2' : '1'}Left`,
          )}
          onPress={() =>
            handlePressButton(`safety${typeLine === 'end' ? '2' : '1'}Left`)
          }
          icon={EndCurveLeftIcon}
        />
        <ButtonEndType
          title="Safety"
          active={validateTypeLine(
            `safety${typeLine === 'end' ? '2' : '1'}Right`,
          )}
          onPress={() =>
            handlePressButton(`safety${typeLine === 'end' ? '2' : '1'}Right`)
          }
          icon={EndCurveRightIcon}
        />

        <ButtonEndType
          title="Break"
          active={validateTypeLine('break2Start')}
          onPress={() => handlePressButton('break2Start')}
          icon={EndBreakLeft2Icon}
        />
        <ButtonEndType
          title="Break"
          active={validateTypeLine('break2End')}
          onPress={() => handlePressButton('break2End')}
          icon={EndBreakRight2Icon}
        />

        <ButtonEndType
          title="Break"
          active={validateTypeLine('break1Start')}
          onPress={() => handlePressButton('break1Start')}
          icon={EndBreakLeftIcon}
        />
        <ButtonEndType
          title="Break"
          active={validateTypeLine('break1End')}
          onPress={() => handlePressButton('break1End')}
          icon={EndBreakRightIcon}
        />
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '45%',
    marginVertical: isTablet ? 5 : 2,
    flexDirection: 'row',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#828489',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
export default EndTypesLineComponent;
