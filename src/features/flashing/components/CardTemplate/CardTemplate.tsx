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
import { Alert, Image } from 'react-native';
import { useAppDispatch } from '@hooks/useStore';
import { actions as templateActions } from '@store/templates/actions';
import { useNavigation } from '@react-navigation/native';
import { EditIcon, EyeIcon, EyeOffIcon, TrashIcon } from '@assets/icons';
import ModalNameTemplate from '@features/jobs/components/ModalNameTemplate';
import { isTablet } from '@shared/platform';
import { SIZE_ICON_PHONE, SIZE_ICON_TABLET } from '@theme';

type Props = {
  template: TemplateType;
  showActions?: boolean;
};
const CardTemplate: React.FC<Props> = ({ template, showActions }) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const [visibleModalNameTemplate, setVisibleModalNameTemplate] =
    React.useState(false);

  const onCardTemplate = () => {
    dispatch(templateActions.templateSelected({ idTemplate: template.id }));
    navigation.goBack();
  };

  const alertDelete = () =>
    Alert.alert('Are you sure delete this template?', '', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => {
          dispatch(templateActions.removeTemplate({ idTemplate: template.id }));
        },
      },
    ]);

  const showOrHideTemplate = () => {
    if (template.isHide) {
      dispatch(templateActions.showTemplate({ idTemplate: template.id }));
    } else {
      dispatch(templateActions.hideTemplate({ idTemplate: template.id }));
    }
  };

  return (
    <>
      <Card borderWidth={1} width={isTablet ? '48%' : '46%'} mx="s">
        <>
          <BaseTouchable onPress={onCardTemplate}>
            <Image
              resizeMode={'contain'}
              source={{
                uri: template.imgPreview,
              }}
              width={isTablet ? 240 : 110}
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
          {showActions && (
            <Box
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              pt="s">
              <IconButton
                icon={
                  <Icon
                    as={EditIcon}
                    size={isTablet ? SIZE_ICON_TABLET : SIZE_ICON_PHONE}
                    color="black"
                  />
                }
                onPress={() => setVisibleModalNameTemplate(true)}
              />
              <IconButton
                icon={
                  <Icon
                    as={template.isHide ? EyeIcon : EyeOffIcon}
                    size={isTablet ? SIZE_ICON_TABLET : SIZE_ICON_PHONE}
                    color="black"
                  />
                }
                onPress={showOrHideTemplate}
              />
              {template.availableDelete && (
                <IconButton
                  icon={
                    <Icon
                      as={TrashIcon}
                      size={isTablet ? SIZE_ICON_TABLET : SIZE_ICON_PHONE}
                      stroke="error500"
                      color="error500"
                    />
                  }
                  onPress={alertDelete}
                />
              )}
            </Box>
          )}
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
