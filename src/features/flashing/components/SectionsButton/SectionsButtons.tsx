import React from 'react';
import {BaseTouchable, Box, Icon, Text} from '@ui/components';
import {EditIcon, SaveIcon} from '@assets/icons';
import {StyleSheet} from 'react-native';

type Props = {
  onSave: () => void;
  onEdit?: () => void;
  onEditEndType?: () => void;
  onTapered?: () => void;
  disabledTapered?: boolean;
};

const widthStandard = 160;

const SectionsButtons: React.FC<Props> = ({
  onSave,
  onEdit,
  onEditEndType,
  onTapered,
  disabledTapered = false,
}) => {
  const isOnlySave = !onEdit && !onEditEndType && !onTapered;

  return (
    <Box
      p="m"
      my="s"
      position="absolute"
      bottom="11%"
      width="100%"
      flexDirection="row"
      flexWrap="wrap"
      alignItems="center"
      justifyContent={isOnlySave ? 'center' : 'space-between'}>
      {onEdit && (
        <BaseTouchable
          onPress={onEdit}
          m="s"
          width={widthStandard}
          flexDirection="row-reverse"
          p="m"
          borderRadius="s"
          backgroundColor="white"
          justifyContent="center"
          alignItems="center"
          style={styles.shadow}>
          <Text variant="subheadMedium" mx="s">
            Edit Sizes
          </Text>
        </BaseTouchable>
      )}

      {onTapered && (
        <BaseTouchable
          disabled={disabledTapered}
          onPress={onTapered}
          m="s"
          width={widthStandard}
          flexDirection="row-reverse"
          p="m"
          borderRadius="s"
          backgroundColor="white"
          justifyContent="center"
          alignItems="center"
          style={styles.shadow}>
          <Text variant="subheadMedium" mx="s">
            Set Tapered
          </Text>
        </BaseTouchable>
      )}

      {onEditEndType && (
        <BaseTouchable
          onPress={onEditEndType}
          m="s"
          width={widthStandard}
          flexDirection="row-reverse"
          p="m"
          borderRadius="s"
          backgroundColor="white"
          justifyContent="center"
          alignItems="center"
          style={styles.shadow}>
          <Text variant="subheadMedium" mx="s">
            End | Start
          </Text>
        </BaseTouchable>
      )}

      <BaseTouchable
        onPress={onSave}
        width={widthStandard}
        m="s"
        flexDirection="row-reverse"
        p="m"
        borderRadius="s"
        backgroundColor="primary"
        alignItems="center"
        justifyContent="center"
        style={styles.shadow}>
        <Text color="white" variant="subheadMedium" mx="s">
          Save
        </Text>
      </BaseTouchable>
    </Box>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowColor: 'lightGray',
  },
});

export default SectionsButtons;
