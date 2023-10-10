import React from 'react';
import { BaseTouchable, Box, Icon, Text } from "@ui/components";
import { EditIcon, SaveIcon } from "@assets/icons";
import { StyleSheet } from "react-native";

type Props = {
  onSave: ()=> void;
  onEdit: ()=> void;
};

const SectionsButton: React.FC<Props> = ({ onSave, onEdit }) => {
  return (
    <Box p="m" position="absolute" bottom="18%"  width="100%" alignItems="center" justifyContent="center" >
      <BaseTouchable
        onPress={onSave}
        my="xs"
        flexDirection="row-reverse"
        p="m"
        borderRadius="s"
        backgroundColor="primary"
        alignItems="center"
        style={styles.shadow}
      >
        <Text color="white" variant="subheadMedium" mx="s">Save</Text>
        <Icon as={SaveIcon} color="white" />
      </BaseTouchable>

      <BaseTouchable
        onPress={onEdit}
        my="xs"
        flexDirection="row-reverse"
        p="m"
        borderRadius="s"
        backgroundColor="white"
        alignItems="center"
        style={styles.shadow}
      >
        <Text variant="subheadMedium" mx="s">Edit measurement</Text>
        <Icon as={EditIcon} color="black" />
      </BaseTouchable>

    </Box>
  );
};

const styles = StyleSheet.create({
  shadow: {
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 0.5,
    shadowRadius: 5,
  shadowColor: 'lightGray',
  }
})

export default SectionsButton;
