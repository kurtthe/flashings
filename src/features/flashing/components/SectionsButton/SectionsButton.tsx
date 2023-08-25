import React from 'react';
import { Box, Button, Card } from "@ui/components";

type Props = {
  onSave: ()=> void;
  onSetTape: ()=> void;
};

const SectionsButton: React.FC<Props> = ({ onSave, onSetTape }) => {
  return (
    <Box position="absolute" bottom="15%"  width="100%" alignItems="center" justifyContent="center" >
      <Card p="m">
        <Button
          my="m"
          variant="outlineWhite"
          onPress={onSave}>
          Set as Tapered Flashing
        </Button>
        <Button
          my="m"
          onPress={onSetTape}>
          Save Flashing
        </Button>
      </Card>
    </Box>
  );
};

export default SectionsButton;
