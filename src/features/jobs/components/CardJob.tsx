import React from 'react';
import { View } from 'react-native';
import { Box, Button, Text } from '@ui/components';
import { Routes } from '@features/jobs/navigation/routes';
import { JOB_DETAIL } from '@models';
import { useNavigation } from '@react-navigation/native';
import { JobStackProps } from '@features/jobs/navigation/Stack.types';
import { Card } from '@ui/components';

type Props = {
  job: JOB_DETAIL;
};
const CardJobComponent: React.FC<Props> = ({ job }) => {
  const navigation = useNavigation<JobStackProps>();

  return (
    <Card>
      <Text variant="subheadSmall">{job.name}</Text>
      <Text variant="menuEditor">Status: {job.client_name}</Text>
      <Text variant="menuEditor">
        Date Created: {`${new Date().toISOString()}`}
      </Text>
      <Text variant="menuEditor">Job Number: {job.job_number}</Text>
      <Text variant="menuEditor">Job Address: {job.address}</Text>
      <Box
        mt="s"
        justifyContent="flex-end"
        alignItems="center"
        flexDirection="row">
        <Text variant="bodyMediumLink">Archive</Text>
        <View style={{ marginHorizontal: 12 }} />
        <Button
          variant="small"
          onPress={() =>
            navigation.navigate(Routes.JOB_DETAILS, { item: job })
          }>
          View Job
        </Button>
      </Box>
    </Card>
  );
};

export default CardJobComponent;