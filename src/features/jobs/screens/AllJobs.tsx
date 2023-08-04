import React from 'react';
import { Pressable } from 'react-native';
import { View, FlatList, StyleSheet } from 'react-native';
import { Box, Text, Button } from '@ui/components';
import { Routes } from '../../flashing/navigation/routes';

const data = [
  {
    id: 1001,
    name: '6A Pine Cres Ringwood North',
    address: '6a Pine Cres, Ringwood North VIC, Australia',
    job_number: '894',
    client_name: 'Ross Jurey',
  },
  {
    id: 1002,
    job_number: '1391',
    name: '20-22 hereford rd Mount Evelyn',
    address: '20-22 Hereford Rd, Mount Evelyn VIC, Australia',
    client_name: 'Barry  Biggin',
  },
  {
    id: 1003,
    job_number: '1392',
    name: '46 Centre way, Croydon South.',
    address: '46 Centre Way, Croydon South VIC, Australia',
    client_name: 'Sharp & Howells',
  },
];

type ItemProps = {
  id: number;
  name: string;
  address: string;
  job_number: string;
  client_name: string;
};

const AllJobsScreens = ({ navigation }) => {
  const Item = ({ item }: ItemProps) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.text}>Status: {item.client_name}</Text>
      <Text style={styles.text}>
        Date Created: {`${new Date().toISOString()}`}
      </Text>
      <Text style={styles.text}>Job Number: {item.job_number}</Text>
      <Text style={styles.text}>Job Address: {item.address}</Text>
      <View style={styles.buttonContainer}>
        <Text style={styles.link}>Archive</Text>
        <View style={{ marginHorizontal: 12 }} />
        <Pressable
          style={styles.button}
          onPress={() =>
            navigation.navigate(Routes.JOB_DETAILS, { item: item })
          }>
          <Text style={styles.white}>View Job</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <Box style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={item => item.id}
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
export default AllJobsScreens;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: 'white',
  },
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
  button: {
    backgroundColor: '#0E3A90',
    padding: 8,
    paddingHorizontal: 18,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  white: {
    color: 'white',
    fontWeight: '500',
  },
});
