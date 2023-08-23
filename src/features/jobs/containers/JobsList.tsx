import React from 'react';
import { Box, Button, Text } from '@ui/components';
import { FlatList, StyleSheet } from 'react-native';
import { Routes } from '@features/jobs/navigation/routes';
import { dataJobs } from '@features/jobs/mocks';
import CardJobComponent from '@features/jobs/components/CardJob';
import { useNavigation } from '@react-navigation/native';
import { JobStackProps } from "@features/jobs/navigation/Stack.types";

const JobsListContainer = () => {
  const navigation = useNavigation<JobStackProps>();

  return (
    <Box flex={1} pt="m" backgroundColor="white">
      <Box my="m" px="m" flexDirection="row" alignItems="center" justifyContent="flex-end">
        <Text variant="subheadSecondary" fontWeight="900" mr="m" color="textGray">Current</Text>
        <Text variant="subheadSecondary" color="mustard" textDecorationLine="underline" textDecorationColor="mustard" >Archived</Text>
      </Box>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingVertical: 10}}
        data={dataJobs}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({ item }) => <CardJobComponent job={item} />}
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
