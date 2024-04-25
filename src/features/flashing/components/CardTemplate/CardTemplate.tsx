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
    <Card>
      <BaseTouchable onPress={onCardTemplate}>
        <Image
          resizeMode="contain"
          source={{
            uri: 'https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg',
          }}
          width={90}
          height={250}
          style={{
            transform: [{ scale: 2 }],
            top: 15,
            left: 25,
          }}
        />
        <Text variant="subheadSmall">{template.name}</Text>
      </BaseTouchable>
    </Card>
  );
};

export default CardTemplate;
