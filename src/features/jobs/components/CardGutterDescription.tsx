import React from 'react';
import {Box, Button, Text} from '@ui/components';
import {FlatList} from 'react-native';
import {FLASHINGS_DATA} from '@models';
import ModalAddLengths from '@features/jobs/components/ModalAddLengths';
import {getBends, getGirth, getMaterial} from '@shared/utils/JobOrders';

type Props = {
  data: FLASHINGS_DATA;
  jobId: number;
  title: string;
};
const CardGutterDescription: React.FC<Props> = ({data, jobId, title}) => {
  const [visibleModalLength, setVisibleModalLength] = React.useState(false);

  const renderFlashingLengths = () => {
    if (!data.flashingLengths) return null;

    return (
      <Box flexDirection="row">
        <FlatList
          scrollEnabled={false}
          keyExtractor={(item, index) => `textLength-${index}${item.qty}`}
          data={data.flashingLengths}
          renderItem={({item, index}) => (
            <Box flexDirection="row" flexWrap="wrap">
              <Text variant="bodySmallRegular">
                {item.length}mm x {item.qty}
              </Text>
              {data.flashingLengths.length === index + 1 && !data.tapered && (
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
      <Box mt="m">
        <Text variant="bodyLabelTextfield" fontWeight="bold" color="black">
          {title}
        </Text>

        <Text variant="bodySmallRegular" style={{textTransform: 'capitalize'}}>
          0.55 {getMaterial(data.colourMaterial).label}
        </Text>
        <Box
          flexDirection="row"
          alignItems="flex-start"
          justifyContent="flex-start">
          {renderFlashingLengths()}
        </Box>
        {!data.tapered ? (
          <Text variant="bodySmallRegular">
            {getBends(data)} Bend Girth - {`${getGirth(data)}mm`}
          </Text>
        ) : (
          <Box mt="s">
            <Text variant="bodyLabelTextfield" fontWeight="bold" color="black">
              Front End
            </Text>
            <Text variant="bodySmallRegular">
              {getBends(data)} Bend Girth - {`${getGirth(data, 'front')}mm`}
            </Text>
            <Text variant="bodyLabelTextfield" fontWeight="bold" color="black">
              Back End
            </Text>
            <Text variant="bodySmallRegular">
              {getBends(data)} Bend Girth - {`${getGirth(data, 'back')}mm`}
            </Text>
          </Box>
        )}
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
