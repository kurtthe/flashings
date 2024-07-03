import React from 'react';
import { TemplateType } from '@models/templates';
import {
  BaseTouchable,
  Box,
  Card,
  Icon,
  IconButton,
  Text,
} from '@ui/components';
import { Image } from 'react-native';
import { useAppDispatch } from '@hooks/useStore';
import { actions as templateActions } from '@store/templates/actions';
import { useNavigation } from '@react-navigation/native';
import { DeleteIcon, EditIcon, TrashIcon } from '@assets/icons';
import ModalNameTemplate from '@features/jobs/components/ModalNameTemplate';

type Props = {
  template: TemplateType;
};
const CardTemplate: React.FC<Props> = ({ template }) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const [visibleModalNameTemplate, setVisibleModalNameTemplate] =
    React.useState(false);

  const onCardTemplate = () => {
    dispatch(templateActions.templateSelected({ idTemplate: template.id }));
    navigation.goBack();
  };

  const onRemoveTemplate = () => {
    dispatch(templateActions.removeTemplate({ idTemplate: template.id }));
  };

  return (
    <>
      <Card borderWidth={1} width="46%" mx="s">
        <>
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
          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            pt="s">
            <IconButton
              icon={<Icon as={EditIcon} size={20} color="black" />}
              onPress={() => setVisibleModalNameTemplate(true)}
            />
            <IconButton
              icon={
                <Icon
                  as={TrashIcon}
                  size={28}
                  stroke="error500"
                  color="error500"
                />
              }
              onPress={onRemoveTemplate}
            />
          </Box>
        </>
      </Card>

      <ModalNameTemplate
        visible={visibleModalNameTemplate}
        onClose={() => setVisibleModalNameTemplate(false)}
        data={template}
        edit
      />
    </>
  );
};

export default CardTemplate;
