import React from 'react';
import {View} from 'react-native';
import {Box, Button, Text, Card} from '@ui/components';
import {Routes} from '@features/jobs/navigation/routes';
import {JOB_DATA} from '@models';
import {useNavigation} from '@react-navigation/native';
import {JobStackProps} from '@features/jobs/navigation/Stack.types';
import {actions} from '@store/jobs/actions';
import {useAppDispatch} from '@hooks/useStore';
import {formatDate} from '@shared/utils/formatDate';

type Props = {
  job: JOB_DATA;
  isArchived: boolean;
};
const CardJobComponent: React.FC<Props> = ({job, isArchived}) => {
  const navigation = useNavigation<JobStackProps>();
  const dispatch = useAppDispatch();

  const handleToggleArchive = () => {
    if (isArchived) {
      return dispatch(actions.changeUnArchive({idJob: job.id}));
    }
    dispatch(actions.changeArchive({idJob: job.id}));
  };

  return (
    <Card>
      <Text variant="subheadSmall">{job.name}</Text>
      <Text variant="menuEditor">Status: {job.contact.name}</Text>
      <Text variant="menuEditor">Date Created: {`${job.date_created}`}</Text>
      <Text variant="menuEditor">Date Updated: {`${job.date_updated}`}</Text>
      <Text variant="menuEditor">Job Number: {job.number}</Text>
      <Text variant="menuEditor">Job Address: {job.address}</Text>
      <Box
        mt="s"
        justifyContent="space-between"
        alignItems="center"
        flexDirection="row">
        <View>
          {job.orderData && (
            <Text variant="bodyBold" my="s">
              Sent:{' '}
              <Text variant="bodyRegular">{job.orderData.orderNumber}</Text>
            </Text>
          )}
        </View>

        <Box flexDirection="row" alignItems="center">
          <Button variant="smallWhite" onPress={handleToggleArchive}>
            {!isArchived ? 'Archive' : 'Unarchive'}
          </Button>
          <View style={{marginHorizontal: 12}} />
          <Button
            variant="small"
            onPress={() =>
              navigation.navigate(Routes.JOB_DETAILS, {
                jobId: job.id,
                jobName: job.name,
              })
            }>
            View Job
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

export default CardJobComponent;
