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
    <Card borderWidth={1} width="46%" mx="s">
      <BaseTouchable onPress={onCardTemplate}>
        <Image
          resizeMode="contain"
          source={{
            uri: template.imgPreview,
          }}
          width={110}
          height={180}
          style={{
            transform: [{ scale: 1.8 }],
            top: 15,
            left: 15,
          }}
        />
        <Text mx="s" mt="s" variant="bodyBold">
          {template.name}
        </Text>
      </BaseTouchable>
    </Card>
  );
};

export default CardTemplate;
