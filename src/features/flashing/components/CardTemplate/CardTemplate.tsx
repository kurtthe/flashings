import React from 'react';
import { TemplateType } from '@models/templates';
import { BaseTouchable, Card, Text } from '@ui/components';
import { Image } from 'react-native';
import { useAppDispatch } from '@hooks/useStore';
import { actions as templateActions } from '@store/templates/actions';
import { useNavigation } from '@react-navigation/native';

type Props = {
  template: TemplateType;
};
const CardTemplate: React.FC<Props> = ({ template }) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const onCardTemplate = () => {
    dispatch(templateActions.templateSelected({ idTemplate: template.id }));
    navigation.goBack();
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
