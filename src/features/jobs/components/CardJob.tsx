import React from 'react';
import { View } from 'react-native';
import { Box, Button, Text, Card } from '@ui/components';
import { Routes } from '@features/jobs/navigation/routes';
import { JOB_DATA } from "@models";
import { useNavigation } from '@react-navigation/native';
import { JobStackProps } from '@features/jobs/navigation/Stack.types';

type Props = {
  job: JOB_DATA;
};
const CardJobComponent: React.FC<Props> = ({ job }) => {
  const navigation = useNavigation<JobStackProps>();

  return (
    <Card>
      <Text variant="subheadSmall">{job.name}</Text>
      <Text variant="menuEditor">Status: {job.contact.name}</Text>
      <Text variant="menuEditor">
        Date Created: {`${new Date().toISOString()}`}
      </Text>
      <Text variant="menuEditor">Job Number: {job.number}</Text>
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
            navigation.navigate(Routes.JOB_DETAILS, { jobId: job.id, jobName: job.name})
          }>
          View Job
        </Button>
      </Box>
    </Card>
  );
};

export default CardJobComponent;
