import React from 'react';
import { Box, Button, Card, CardProps, Text } from '@ui/components';
import { FLASHINGS_DATA } from '@models';

import { useNavigation } from '@react-navigation/native';
import { Routes } from '@features/flashing/navigation/routes';
import PreviewFlashing from '@features/flashing/components/PreviewFlashing/PreviewFlashing';
import { StackPrivateDefinitions, StackPrivateProps } from '@models/navigation';
import ModalNameTemplate from '@features/jobs/components/ModalNameTemplate';
import CardGutterDescription from '@features/jobs/components/CardGutterDescription';

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
      params: { jobId: jobId, idFlashing: data.id },
    });
  };

  const _title = React.useMemo(() => {
    const previousTitle = data.name !== '' ? data.name : 'Flashing';
    if (data.tapered) {
      return previousTitle + '(Tapered)';
    }
    return previousTitle;
  }, [data.name, data.tapered]);

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
            {_title}
          </Text>
          {data.tapered ? (
            <>
              <PreviewFlashing
                imgPreview={data.imgPreview}
                dataFlashing={{ ...data, dataLines: data.tapered.back }}
                jobId={jobId}
              />
              <PreviewFlashing
                imgPreview={data.imgPreview}
                dataFlashing={{ ...data, dataLines: data.tapered.front }}
                jobId={jobId}
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
          {data.tapered ? (
            <Box
              style={{
                paddingVertical: 20,
                flex: 0.8,
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <CardGutterDescription
                data={data}
                jobId={jobId}
                title="Front End"
                sideTapered="front"
              />
              <CardGutterDescription
                data={data}
                jobId={jobId}
                title="Back End"
                sideTapered="back"
              />
            </Box>
          ) : (
            <CardGutterDescription
              data={data}
              jobId={jobId}
              title="Description"
            />
          )}
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

export default CardGutterComponent;
