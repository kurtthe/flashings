import React, { useState } from 'react';
import {Image, View} from 'react-native';
import {
  Box,
  Button,
  ScrollBox,
  Text
} from '@ui/components';
import Input from '@ui/components/Input';
import SelectInput from '@ui/components/SelectInput';
import { Routes } from '../navigation/routes';
import { StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';

const data = [{
  id: 1,
  value: 'stone',
  label: 'Stone',
  bgColor: '#857f76',
  textColor: 'white'
}, {
  id: 2,
  value: 'galvanised',
  label: 'Galvanised',
  bgColor: '#a7aaaf',
  textColor: 'black'
},{
  id: 3,
  value: 'zinc',
  label: 'Zinc',
  bgColor: '#b7b5b5',
  textColor: 'black'
},{
  id: 4,
  value: 'basalt',
  label: 'Basalt',
  bgColor: '#6e6c70',
  textColor: 'white'
},{
  id: 5,
  value: 'cream',
  label: 'Cream',
  bgColor: '#e8dec0',
  textColor: '#8F94AE'
},{
  id: 6,
  value: 'cottage_green',
  label: 'Cottage Green',
  bgColor: '#3b4c40',
  textColor: 'white'
},{
  id: 7,
  value: 'deep_ocean',
  label: 'Deep Ocean',
  bgColor: '#3b4252',
  textColor: 'white'
},{
  id: 8,
  value: 'manor_red',
  label: 'Manor Red',
  bgColor: '#532317',
  textColor: 'white'
}]

const tableRows = [{
  dimension: 'A',
  description: 'Length across',
  length: ''
},{
  dimension: 'B',
  description: 'Off the wall dimension for overflow',
  length: ''
},{
  dimension: 'C',
  description: 'Overall Height',
  length: ''
},
{
  dimension: 'D',
  description: 'Off the wall dimension for shroud',
  length: ''
},
{
  dimension: 'E',
  description: 'Height of overflow wall',
  length: ''
}]

const CreateRainheadScreen = ({ navigation }) => {
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
            source={require('../../../assets/images/rainHeadDimensions.png')}
          />
          <DataTable style={styles.tableContainer}>
            <DataTable.Header style={{marginHorizontal: -15}}>
              <DataTable.Title textStyle={styles.tableText} style={[styles.border, {flex:2}]}>Dimension</DataTable.Title>
              <DataTable.Title textStyle={styles.tableText} style={[styles.border, {flex:5}]}>Description</DataTable.Title>
              <DataTable.Title textStyle={styles.tableText} style={[styles.border, {flex:3}]}>Length</DataTable.Title>
            </DataTable.Header>
            {tableRows.map((cell) => {
              return(
                <DataTable.Row style={{marginHorizontal: -15}}>
                  <DataTable.Cell textStyle={styles.tableText} style={[styles.border, {flex:2}]}>{cell.dimension}</DataTable.Cell>
                  <DataTable.Cell textStyle={styles.tableText} style={[styles.border, {flex:5}]}>{cell.description}</DataTable.Cell>
                  <DataTable.Cell textStyle={styles.tableText} style={[styles.border, {flex:3}]}>
                    <View style={styles.lengthCell}>
                      <Input
                        label=""
                        onChangeText={() => {}}
                        value={cell.length}
                        inputStyles={{ width: '50%', height: '100%'}}
                      />
                      <Text style={{color: 'gray'}}>| mm</Text>
                    </View>
                  </DataTable.Cell>
                </DataTable.Row>
              )
              })}
          </DataTable>
          <SelectInput
            value=''
            label='Colour/Material'
            options={data}
            onChange={option => console.log(option)}
          />
          <Input
            label="Qty"
            onChangeText={(text) => setQty(text)}
            value={qty}
          />
        </Box>

        <Box>
          <Button mt="l" mb='xl' onPress={() => navigation.navigate(Routes.DEMO_BOARD)}>
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