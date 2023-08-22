import React from 'react';
import { Box, Button, Divider, Icon, IconButton, Text } from '@ui/components';
import { BackIcon, NextIcon } from '@assets/icons';
import { StyleSheet } from 'react-native';

type Props = {
  onChangeSide: (value: boolean) => void;
};

const ButtonMenu: React.FC<Props> = ({ onChangeSide }) => {
  const [open, setOpen] = React.useState(false);
  const [isRight, setIsRight] = React.useState(true);

  const handleChangeSide = (newValue: boolean) => {
    onChangeSide(newValue);
    setIsRight(newValue);
  };

  return (
    <Box
      style={[styles.container, styles.shadow]}
      flexDirection="row-reverse"
      justifyContent="center"
      borderRadius="s"
      >
      <Box p="s">
        <IconButton
          onPress={() => setOpen(!open)}
          icon={<Icon as={!open ? NextIcon : BackIcon} size={16} />}
        />
      </Box>
      {open && (
        <Box backgroundColor="white" pl="s" py="s">
          <Text textAlign="center">Side</Text>
          <Divider my="s" />
          <Box>
            <Button
              variant={isRight ? 'smallMenuActive' : 'smallMenu'}
              onPress={() => handleChangeSide(true)}
              backgroundColor={isRight ? 'primaryBlue' : 'white'}>
              Right
            </Button>
            <Button
              variant={!isRight ? 'smallMenuActive' : 'smallMenu'}
              mt="xs"
              onPress={() => handleChangeSide(false)}>
              Left
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 30,
    left: 0,
    zIndex: 1,
  },
  shadow: {
    backgroundColor: 'white',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    elevation: 10,
    shadowRadius: 5,
    shadowColor: 'rgba(47, 51, 80, 0.4)',
    shadowOpacity: 1,
  },
});
export default ButtonMenu;
