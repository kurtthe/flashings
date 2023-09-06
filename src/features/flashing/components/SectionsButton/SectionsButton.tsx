import React from 'react';
import { Box, Button } from "@ui/components";

type Props = {
  onSave: ()=> void;
  onSetTape: ()=> void;
};

const SectionsButton: React.FC<Props> = ({ onSave, onSetTape }) => {
  return (
    <Box p="m" position="absolute" bottom="18%"  width="100%" alignItems="center" justifyContent="center" >
        <Button
          my="m"
          onPress={onSave}>
          Save Flashing
        </Button>
    </Box>
  );
};

export default SectionsButton;
