import React from 'react';
import { Box, Button } from '@ui/components';
import { FlatList, StyleSheet } from 'react-native';
import { Routes } from '@features/jobs/navigation/routes';
import { dataJobs } from '@features/jobs/mocks';
import CardJobComponent from '@features/jobs/components/CardJob';
import { useNavigation } from '@react-navigation/native';

const JobsListContainer = ({}) => {
  const navigation = useNavigation();
  return (
    <Box flex={1} pt="m" backgroundColor="white">
      <FlatList
        data={dataJobs}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({ item }) => <CardJobComponent job={item} />}
        ListFooterComponent={() => (
          <Button
            mt="l"
            onPress={() => navigation.navigate(Routes.CREATE_JOB)}
            style={[styles.button, { padding: 12 }]}>
            Create New Job
          </Button>
        )}
        ListFooterComponentStyle={{
          paddingHorizontal: 16,
          marginBottom: 60,
        }}
      />
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
