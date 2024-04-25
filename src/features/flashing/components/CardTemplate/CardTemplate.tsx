import React from 'react';
import { TemplateType } from '@models/templates';
import { BaseTouchable, Card, Text } from '@ui/components';
import { Image } from 'react-native';

type Props = {
  template: TemplateType;
};
const CardTemplate: React.FC<Props> = ({ template }) => {
  const onCardTemplate = () => {
    console.log('onCardTemplate::');
  };

  return (
    <Card borderWidth={1} flex={0.5} mt="s">
      <BaseTouchable onPress={onCardTemplate}>
        <Image
          resizeMode="contain"
          source={{
            uri: template.imgPreview,
          }}
          width={100}
          height={200}
          style={{
            transform: [{ scale: 2 }],
            top: 60,
            left: 25,
          }}
        />
        <Text variant="subheadSmall">{template.name}</Text>
      </BaseTouchable>
    </Card>
  );
};

export default CardTemplate;
