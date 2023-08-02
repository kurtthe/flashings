import React, { useState } from 'react';
import {Image} from 'react-native';
import {
  Box,
  Button,
} from '@ui/components';
import Input from '@ui/components/Input';
import SelectInput from '@ui/components/SelectInput';
import { Routes } from '../navigation/routes';
import { StyleSheet } from 'react-native';

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

const CreateRainheadScreen = ({ navigation }) => {
  const [name, setName] = useState('')
  const [qty, setQty] = useState('')

  return (
      <Box
        p="m"
        justifyContent={'space-between'}
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
      </Box>
  );
};
export default CreateRainheadScreen;

const styles = StyleSheet.create({
  imageStyles: {
    width: 276,
    height: 247
  }
})