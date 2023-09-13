import React from 'react';
import { Box, Button, Text } from '@ui/components';
import { FlatList, StyleSheet } from 'react-native';
import { Routes } from '@features/jobs/navigation/routes';
import CardJobComponent from '@features/jobs/components/CardJob';
import { useNavigation } from '@react-navigation/native';
import { JobStackProps } from "@features/jobs/navigation/Stack.types";
import { useAppSelector } from "@hooks/useStore";
import { jobsList } from "@store/jobs/selectors";

const JobsListContainer = () => {
  const [typeJobs, setTypeJobs] = React.useState<'current' | 'archived'>('current')
  const navigation = useNavigation<JobStackProps>();
  const jobs = useAppSelector((state) => jobsList(state, typeJobs));

  return (
    <Box flex={1} pt="m" backgroundColor="white">
      <Box my="m" px="m" flexDirection="row" alignItems="center" justifyContent="flex-end">
        <Text variant={typeJobs === 'current' ? "typeJobActive" :"typeJob"} mx="s"  onPress={() => setTypeJobs('current')}>Current</Text>
        <Text variant={typeJobs === 'archived' ? "typeJobActive" :"typeJob"} onPress={() => setTypeJobs('archived')} >Archived</Text>
      </Box>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingVertical: 10}}
        data={jobs}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({ item }) => <CardJobComponent job={item} isArchived={typeJobs === "archived"} />}
      />
      <Button
        mx="m"
        mb="xl"
        onPress={() => navigation.navigate(Routes.CREATE_JOB)}
        style={[styles.button, { padding: 12 }]}>
        Create New Job
      </Button>
    </Box>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#0E3A90',
    padding: 8,
    paddingHorizontal: 18,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },

});

export default JobsListContainer;
