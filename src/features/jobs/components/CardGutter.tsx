import React from 'react';
import {Box, Card, CardProps, Text} from '@ui/components';
import {FLASHINGS_DATA} from '@models';

import {useNavigation} from '@react-navigation/native';
import {Routes} from '@features/flashing/navigation/routes';
import PreviewFlashing from '@features/flashing/components/PreviewFlashing/PreviewFlashing';
import {StackPrivateDefinitions, StackPrivateProps} from '@models/navigation';
import ModalNameTemplate from '@features/jobs/components/ModalNameTemplate';
import CardGutterDescription from '@features/jobs/components/CardGutterDescription';
import {StyleSheet} from 'react-native';

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
  const [visibleModalNameTemplate, setVisibleModalNameTemplate] =
    React.useState(false);
  const navigation = useNavigation<StackPrivateProps>();

  const handleEditFlashing = () => {
    navigation.navigate(StackPrivateDefinitions.FLASHING, {
      screen: Routes.CREATE_EDIT_FLASHING,
      params: {jobId: jobId, idFlashing: data.id},
    });
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
            {data.tapered && (
              <Text fontStyle="italic" fontWeight="300">
                {' '}
                Tapered
              </Text>
            )}
          </Text>
          {data.tapered ? (
            <>
              <PreviewFlashing
                imgPreview={data.tapered.frontImagePreview}
                dataFlashing={data}
                jobId={jobId}
                isFront={true}
                style={StyleSheet.flatten([
                  styles.styleContainerPreviewTapered,
                  styles.styleFrontTapered,
                ])}
              />

              <PreviewFlashing
                imgPreview={data.tapered.backImagePreview}
                dataFlashing={data}
                jobId={jobId}
                isFront={false}
                style={StyleSheet.flatten([
                  styles.styleContainerPreviewTapered,
                  styles.styleBackTapered,
                ])}
              />
            </>
          ) : (
            <PreviewFlashing
              imgPreview={data.imgPreview}
              dataFlashing={data}
              jobId={jobId}
            />
          )}
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
              onPress={() => setVisibleModalNameTemplate(true)}
              variant="linkTextSmall">
              Save as Template
            </Text>
          </Box>

          <CardGutterDescription
            data={data}
            jobId={jobId}
            title="Description"
          />
        </Box>
      </Card>

      <ModalNameTemplate
        visible={visibleModalNameTemplate}
        onClose={() => setVisibleModalNameTemplate(false)}
        data={data}
      />
    </>
  );
};

const styles = StyleSheet.create({
  styleContainerPreviewTapered: {
    marginVertical: 0,
    borderRadius: 0,
  },
  styleBackTapered: {
    borderTopWidth: 0,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  styleFrontTapered: {
    borderBottomWidth: 0,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
});

export default CardGutterComponent;
