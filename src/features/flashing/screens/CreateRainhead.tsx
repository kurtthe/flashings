import React, { useState } from 'react';
import {Image, View, StyleSheet} from 'react-native';
import {
  Box,
  Button,
  ScrollBox,
} from '@ui/components';
import Input from '@ui/components/Input';
import SelectInput from '@ui/components/SelectInput';
import { Routes } from '../navigation/routes';
import { DataTable } from 'react-native-paper';
import data from '../tempData/dataRainHead.json'
import tableRows from '../tempData/tablaRows.json'
import { useNavigation } from "@react-navigation/native";
import { images } from "@assets/images";

const CreateRainheadScreen = () => {
  const navigation = useNavigation()
  const [name, setName] = useState('')
  const [qty, setQty] = useState('')

  return (
      <ScrollBox
        p="m"
        backgroundColor={'white'}
        flex={1}
      >
        <Box alignItems='center'>
          <Input
            label="Type"
            onChangeText={(text) => setName(text)}
            value={name}
          />
          <Image
            style={styles.imageStyles}
            source={images.rainHeadDimensions}
          />
          <DataTable style={styles.tableContainer}>
            <DataTable.Header style={{marginHorizontal: -15}}>
              <DataTable.Title textStyle={styles.tableText} style={[styles.border, {flex:2}]}>Dimension</DataTable.Title>
              <DataTable.Title textStyle={styles.tableText} style={[styles.border, {flex:5}]}>Description</DataTable.Title>
              <DataTable.Title textStyle={styles.tableText} style={[styles.border, {flex:3}]}>Length</DataTable.Title>
            </DataTable.Header>
            {tableRows.map((cell, index) => {
              return(
                <DataTable.Row key={`row-${index}`} style={{marginHorizontal: -15}}>
                  <DataTable.Cell textStyle={styles.tableText} style={[styles.border, {flex:2}]}>{cell.dimension}</DataTable.Cell>
                  <DataTable.Cell textStyle={styles.tableText} style={[styles.border, {flex:5}]}>{cell.description}</DataTable.Cell>
                  <DataTable.Cell textStyle={styles.tableText} style={[styles.border, {flex:3}]}>
                    <View style={styles.lengthCell}>
                      <Input
                        variant="small"
                        mx="xs"
                        value={cell.length}
                        suffix="mm"
                      />
                    </View>
                  </DataTable.Cell>
                </DataTable.Row>
              )
              })}
          </DataTable>
          <SelectInput
            label='Colour/Material'
            options={data}
            onChange={option => console.log(option)}
          />
          <Input
            mt="s"
            label="Qty"
            onChangeText={(text) => setQty(text)}
            value={qty}
            keyboardType="numeric"
          />
        </Box>

        <Box>
          <Button mt="l" mb='2xl' onPress={() => null}>
            Save Rainhead
          </Button>
        </Box>
      </ScrollBox>
  );
};
export default CreateRainheadScreen;

const styles = StyleSheet.create({
  imageStyles: {
    width: 276,
    height: 247
  },
  border: {
    borderWidth: 0.5,
    height: 50,
    textAlign: 'center'
  },
  tableText: {
    display: 'flex',
    width: '100%',
    textAlign: 'center',
    color: 'black'
  },
  tableContainer: {
    paddingVertical: 15,
  },
  lengthCell: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})
