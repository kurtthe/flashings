import React from 'react';
import { Box, Button, Text } from '@ui/components';
import { getBends, getGirth, getMaterial } from '@features/jobs/utils';
import { FlatList } from 'react-native';
import { FLASHINGS_DATA } from '@models';
import ModalAddLengths from '@features/jobs/components/ModalAddLengths';

type Props = {
  title: string;
  data: FLASHINGS_DATA;
  jobId: number;
  sideTapered?: 'front' | 'back';
};
const CardGutterDescription: React.FC<Props> = ({
  data,
  jobId,
  title,
  sideTapered,
}) => {
  const [visibleModalLength, setVisibleModalLength] = React.useState(false);

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
              {data.flashingLengths.length === index + 1 && !sideTapered && (
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
      <Box>
        <Text variant="bodyLabelTextfield" fontWeight="bold" color="black">
          {title}
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
          {getBends(data)} Bend Girth - {`${getGirth(data, sideTapered)}mm`}
        </Text>
      </Box>

      <ModalAddLengths
        idFlashing={data.id}
        jobId={jobId}
        visible={visibleModalLength}
        onClose={() => setVisibleModalLength(false)}
      />
    </>
  );
};

export default CardGutterDescription;
