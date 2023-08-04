import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from '@ui/components';
import { Routes } from '@features/flashing/navigation/routes';
import { JOB_DETAIL } from '@models';

type Props = {
  job: JOB_DETAIL;
};
const CardJobComponent: React.FC<Props> = ({ job }) => {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{job.name}</Text>
      <Text style={styles.text}>Status: {job.client_name}</Text>
      <Text style={styles.text}>
        Date Created: {`${new Date().toISOString()}`}
      </Text>
      <Text style={styles.text}>Job Number: {job.job_number}</Text>
      <Text style={styles.text}>Job Address: {job.address}</Text>
      <View style={styles.buttonContainer}>
        <Text style={styles.link}>Archive</Text>
        <View style={{ marginHorizontal: 12 }} />
        <Pressable
          style={styles.button}
          onPress={
            () => null
            // navigation.navigate(Routes.JOB_DETAILS, { item: item })
          }>
          <Text style={styles.white}>View Job</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 20,
    marginBottom: 12,
    marginHorizontal: 16,
    backgroundColor: 'white',
    borderRadius: 4,
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 3,
    shadowColor: 'grey',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    color: '#8F94AE',
  },
  link: {
    color: 'black',
    fontSize: 14,
    textDecorationLine: 'underline',
    fontWeight: '500',
  },
  buttonContainer: {
    marginTop: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  },

  white: {
    color: 'white',
    fontWeight: '500',
  },
});

export default CardJobComponent;
