import React from 'react';
import { Image, FlatList, View, StyleSheet } from 'react-native';
import {
  Box,
  Text,
} from '@ui/components';
import {
  MenuEditorComponent,
} from '@features/flashing/components';

interface DataItem {
  id: string;
  source: string;
}

const data=[
  {id: 1, source: require('../../../assets/images/Group17.png')},
  {id:2, source: require('../../../assets/images/Group18.png')},
  {id:3, source: require('../../../assets/images/Group19.png')},
  {id:4, source: require('../../../assets/images/Group20.png')},
  {id:5, source: require('../../../assets/images/Group21.png')},
  {id:6, source: require('../../../assets/images/Group22.png')},
  {id:7, source: require('../../../assets/images/Group23.png')},
  {id:8, source: require('../../../assets/images/Group24.png')},
  {id:9, source: require('../../../assets/images/Group25.png')}
]

const GutterFlashingExamples = ({ navigation }) => {
  const renderItem: React.FC<{ item: DataItem }> = ({ item }) => (
    <View style={styles.item}>
      <Image style={styles.image} source={item.source} />
    </View>
  );

  return (
    <>
      <Box
        p="m"
        backgroundColor={'white'}
        flex={1}
      >
        <Text variant="lightGraySmallText">Standard Size Flashings</Text>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
        />
      </Box>
      <MenuEditorComponent />
    </>
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    margin: 5,
    padding: 10,
    alignItems: 'center',
  },
  image: {
    borderWidth: 1,
    borderRadius: 10,
    width: 150,
    height: 150,
    resizeMode: 'contain'
  }
});
export default GutterFlashingExamples;
