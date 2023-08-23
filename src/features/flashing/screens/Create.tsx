import React from 'react';
import { Box,  Button } from '@ui/components';
import { Routes } from '../navigation/routes';
import { useNavigation } from "@react-navigation/native";
import FormCreateFlashingContainer from "../containers/FormCreateFlashing";
import { FlashingStackProps } from "@features/flashing/navigation/Stack.types";


const CreateFlashingScreen = () => {
  const navigation = useNavigation<FlashingStackProps>()

  return (
    <Box
      p="m"
      justifyContent='space-between'
      backgroundColor='white'
      flex={1}>
      <Box>
        <FormCreateFlashingContainer />
      </Box>
        <Button
          onPress={() => navigation.navigate(Routes.GUTTER_FLASHING)}>
          Start Drawing
        </Button>
    </Box>
  );
};
export default CreateFlashingScreen;
