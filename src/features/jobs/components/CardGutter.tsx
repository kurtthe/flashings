import React from 'react';
import { Box, Button, Card, CardProps, Text } from '@ui/components';
import { FLASHINGS_DATA } from '@models';
import ModalAddLengths from '@features/jobs/components/ModalAddLengths';
import { FlatList } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { Routes } from '@features/flashing/navigation/routes';
import { getBends, getGirth, getMaterial } from '@features/jobs/utils';
import PreviewFlashing from '@features/flashing/components/PreviewFlashing/PreviewFlashing';
import { StackPrivateDefinitions, StackPrivateProps } from '@models/navigation';
import { useAppDispatch } from '@hooks/useStore';
import { TemplateType } from '@models/templates';
import { actions as templateActions } from '@store/templates/actions';
import { getRandomInt } from '@shared/utils';
import alertService from '@services/general-request/alert';

type Props = CardProps & {
  data: FLASHINGS_DATA;
  onAddLength?: () => void;
  jobId: number;
};
const CardGutterComponent: React.FC<Props> = ({
  data,
  onAddLength,
  jobId,
  ...rest
}) => {
  const dispatch = useAppDispatch();

  const [visibleModalLength, setVisibleModalLength] = React.useState(false);
  const navigation = useNavigation<StackPrivateProps>();

  const handleEditFlashing = () => {
    navigation.navigate(StackPrivateDefinitions.FLASHING, {
      screen: Routes.CREATE_EDIT_FLASHING,
      params: { jobId: jobId, idFlashing: data.id },
    });
  };

  const handleSaveAsTemplate = () => {
    const dataTemplate: TemplateType = {
      id: getRandomInt(100, 200),
      dataLines: data.dataLines,
      angles: data.angles,
      parallelRight: data.parallelRight,
      name: data.name ?? 'Flashing',
      endType: data.endType,
      startType: data.startType,
      imgPreview: data.imgPreview,
    };

    dispatch(templateActions.addTemplate({ template: dataTemplate }));
    alertService.show('Success!', 'The flashing save as template.');
  };

  const renderFlashingLengths = () => {
    if (!data.flashingLengths) return null;

    return (
      <Box flexDirection="row">
        <FlatList
          scrollEnabled={false}
          keyExtractor={(item, index) => `textLength-${index}${item.qty}`}
          data={data.flashingLengths}
          renderItem={({ item, index }) => (
            <Box flexDirection="row" flexWrap="wrap">
              <Text variant="bodySmallRegular">
                {item.length}mm x {item.qty}
              </Text>
              {data.flashingLengths.length === index + 1 && (
                <Button
                  isDisabled={data.flashingLengths.length > 7}
                  variant="textSmall"
                  onPress={() =>
                    data.flashingLengths.length > 7
                      ? null
                      : setVisibleModalLength(true)
                  }>
                  +ADD LENGTH
                </Button>
              )}
            </Box>
          )}
        />
      </Box>
    );
  };

  return (
    <>
      <Card
        pb="unset"
        flexDirection="row"
        alignItems="flex-start"
        justifyContent="space-between"
        {...rest}>
        <Box width="50%">
          <Text mb="m" variant="bodyBold">
            {data.name !== '' ? data.name : 'Flashing'}
          </Text>
          <PreviewFlashing imgPreview={data.imgPreview} dataFlashing={data} />
        </Box>
        <Box width="45%">
          <Box flexDirection="row" justifyContent="flex-start" mb="xs">
            <Text
              lineHeight={18}
              onPress={handleEditFlashing}
              variant="linkTextSmall">
              Edit
            </Text>
            <Text
              mx="s"
              lineHeight={18}
              onPress={handleSaveAsTemplate}
              variant="linkTextSmall">
              Save as template
            </Text>
          </Box>
          <Box>
            <Text variant="bodyLabelTextfield" fontWeight="bold" color="black">
              Description
            </Text>
            <Text
              variant="bodySmallRegular"
              style={{ textTransform: 'capitalize' }}>
              0.55 Colorbond {getMaterial(data.colourMaterial).label}
            </Text>
            <Box
              flexDirection="row"
              alignItems="flex-start"
              justifyContent="flex-start">
              {renderFlashingLengths()}
            </Box>
            <Text variant="bodySmallRegular">
              {getBends(data)} Bend Girth - {`${getGirth(data)}mm`}
            </Text>
          </Box>
        </Box>
      </Card>
      <ModalAddLengths
        idFlashing={data.id}
        jobId={jobId}
        visible={visibleModalLength}
        onClose={() => setVisibleModalLength(false)}
      />
    </>
  );
};

export default CardGutterComponent;
