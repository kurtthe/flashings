import React, { useState } from 'react';
import { Pressable } from 'react-native';
import { SafeAreaView, View, FlatList, StyleSheet, Image } from 'react-native';
import Modal from 'react-native-modal';
import { Box, Text, Button } from '@ui/components';
import data from '../../flashing/screens/tempData/data.json';
import Input from '@ui/components/Input';
import { Routes } from '@features/flashing/navigation/routes';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  PrivateNavigator,
  StackPrivateDefinitions,
} from '@routes/PrivateNavigator';

type ItemProps = {
  id: number;
  name: string;
  address: string;
  job_number: string;
  client_name: string;
};

const CardWithShadow = ({ item, onPress }) => {
  const cardData = item.job_flasing;

  return (
    <View style={styles.card}>
      <View style={styles.leftSection}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Image
          source={require('@assets/images/asset_temp.png')}
          style={styles.cardImage}
        />
      </View>
      <View style={styles.rightSection}>
        <View style={styles.editionSection}>
          <Text style={styles.linkText}>Duplicate</Text>
          <Text style={styles.linkText}>Save</Text>
          <Text style={styles.linkText}>Edit</Text>
        </View>
        <View>
          <Text style={styles.description}>Description</Text>
          {cardData.map(data => {
            return (
              <>
                <Text style={styles.descriptionDetails}>
                  {data.description}
                </Text>
                <Text style={styles.descriptionDetails}>{data.width}</Text>
                <View style={styles.descriptionCanAddLength}>
                  <Text style={styles.descriptionDetails}>{data.high}</Text>
                  {data.canAddLength ? (
                    <Pressable onPress={onPress}>
                      <Text style={styles.addLength}>+ADD LENGTH</Text>
                    </Pressable>
                  ) : null}
                </View>
                <Text style={styles.descriptionDetails}>{data.depth}</Text>
              </>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const FooterButtons = ({ onPress }) => {
  return (
    <>
      <Button
        variant="outlineWhite"
        mt="l"
        onPress={() => onPress(Routes.CREATE_FLASHING)}>
        + Add Flashing
      </Button>
      <Button
        mt="s"
        onPress={() => onPress(Routes.CREATE_RAINHEAD)} //JUST TO TEST
        variant="outlineWhite">
        + Add Rainhead
      </Button>
      <Button
        mt="s"
        onPress={() => onPress(Routes.GUTTER_FLASHING_EXAMPLES)}
        variant="outlineWhite">
        + Add Sump
      </Button>
      <Button mt="s" onPress={() => {}} variant="solid">
        Preview
      </Button>
    </>
  );
};

const JobDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [modalVisible, setModalVisible] = useState(false);
  const [qty, setQty] = useState('');
  const [length, setLength] = useState('');
  const { item } = route.params;
  const onPressFooter = routeToGo => {
    navigation.navigate(StackPrivateDefinitions.FLASHING, {
      screen: routeToGo,
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.paddingContainer}>
        <Box style={styles.mainDetails}>
          <Text style={styles.title}>Job Details</Text>
          <Text style={styles.text}>Site Name: {item.client_name}</Text>
          <Text style={styles.text}>Site Address: {item.address}</Text>
          <Text style={styles.text}>Job # {item.job_number}</Text>
          <Text style={styles.text}>Contact Name: {item.client_name}</Text>
        </Box>
        <FlatList
          data={data[0].custom_fields}
          renderItem={({ item }) => (
            <CardWithShadow
              onPress={() => setModalVisible(!modalVisible)}
              item={item}
            />
          )}
          keyExtractor={item => item.id}
          ListFooterComponent={() => (
            <FooterButtons onPress={routeToGo => onPressFooter(routeToGo)} />
          )}
          ListFooterComponentStyle={{
            paddingHorizontal: 16,
            marginBottom: 60,
          }}
        />
        <Modal
          backdropOpacity={0.3}
          isVisible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.cardTitle}>New Length</Text>
              <Box
                paddingTop="l"
                flexDirection={'row'}
                justifyContent={'space-between'}>
                <Input
                  label="Qty"
                  onChangeText={text => setQty(text)}
                  value={qty}
                  inputStyles={{ width: '35%', height: 30 }}
                />
                <Input
                  label="Length"
                  onChangeText={text => setLength(text)}
                  value={length}
                  inputStyles={{ width: '35%', height: 30 }}
                />
                <Text
                  style={{
                    position: 'absolute',
                    bottom: 30,
                    right: 15,
                    color: 'gray',
                  }}>
                  | mm
                </Text>
              </Box>
              <Button
                style={styles.button}
                onPress={() => setModalVisible(!modalVisible)}>
                Save Flashing
              </Button>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default JobDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  paddingContainer: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
  },
  mainDetails: {
    paddingBottom: 50,
  },
  card: {
    padding: 10,
    paddingBottom: 20,
    marginBottom: 12,
    backgroundColor: 'white',
    borderRadius: 4,
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 3,
    shadowColor: 'grey',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  cardImage: {
    width: 120,
    height: 89,
    marginTop: 10,
  },
  leftSection: {
    width: '40%',
  },
  rightSection: {
    width: '50%',
  },
  editionSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    alignSelf: 'flex-end',
  },
  linkText: {
    fontSize: 10,
    color: '#0E3A90',
    fontWeight: '500',
    textDecorationLine: 'underline',
    marginBottom: 18,
  },
  description: {
    fontSize: 12,
    fontWeight: '600',
  },
  descriptionDetails: {
    fontSize: 10,
    fontWeight: '500',
    color: '#8F94AE',
  },
  addLength: {
    fontSize: 10,
    color: '#0E3A90',
    fontWeight: '500',
  },
  descriptionCanAddLength: {
    flexDirection: 'row',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: 352,
    height: 259,
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'stretch',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    opacity: 2,
  },
  whiteButton: {
    backgroundColor: 'white',
    color: 'black',
    padding: 8,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 303,
    marginTop: '5%',
  },
  button: {
    backgroundColor: '#0E3A90',
    padding: 8,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    width: 303,
    marginTop: '5%',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
