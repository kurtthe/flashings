import React from 'react';
import { BaseTouchable, Card, Text } from '@ui/components';
import { BaseToastProps } from 'react-native-toast-message';

export const toastConfig = {
  updateToast: ({ onPress }: BaseToastProps) => (
    <Card
      as={BaseTouchable}
      onPress={() => {
        onPress?.();
      }}
      variant="updates">
      <Text variant="subheadSmall">An update to the app is available</Text>
      <Text variant="menuEditor">
        A new version is available. Tap here to update.
      </Text>
    </Card>
  ),
};
