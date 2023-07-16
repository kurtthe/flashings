import React, { useState } from 'react';
import {Animated} from 'react-native';
import {
  AppStatusBar,
  Box,
  HeaderBackButton,
  HeaderBox,
  Text,
  Button,
} from '@ui/components';
import Input from '@ui/components/Input';
import SelectInput from '@ui/components/SelectInput';
import { Routes } from '../navigation/routes';

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

const CreateFlashingScreen = ({ navigation }) => {
  const [name, setName] = useState('')
  const [qty, setQty] = useState('')
  const [length, setLength] = useState('')
  return (
    <>
      <AppStatusBar backgroundColor={'white'}/>
      <HeaderBox
        mb="s"
        leftIcon={<HeaderBackButton customPressEvent={() => navigation.goBack()}  />}
        centerText={
          <Text as={Animated.Text} variant="subheadBold" ml="m">
            New Flashing
          </Text>
        }
      />
      <Box mt="s" p="m">
        <Input 
          label="Name"
          onChangeText={(text) => setName(text)} 
          value={name} 
        />
        <SelectInput 
          value='' 
          label='Colour/Material'
          options={data}
          onChange={option => console.log(option)}
        />
        <Box flexDirection={'row'} justifyContent={'space-between'}>
          <Input 
            label="Qty"
            onChangeText={(text) => setQty(text)} 
            value={qty} 
            inputStyles={{ width: '35%'}}
          />
          <Input 
            label="Length"
            onChangeText={(text) => setLength(text)} 
            value={length} 
            inputStyles={{ width: '35%'}}
          />
            <Text style={{position: 'absolute', bottom: 36, right: 20, color: 'gray'}}>| mm</Text>
        </Box>

      <Box mt="2xl" p="m">
        <Text variant="headerExtraBold">create screen</Text>
        <Button
          mt="l"
          onPress={() => navigation.navigate(Routes.GUTTER_FLASHING)}>
          Go to board
        </Button>
        <Button mt="l" onPress={() => navigation.navigate(Routes.DEMO)}>
          Demo event
        </Button>
      </Box>
      </Box>
    </>
  );
};
export default CreateFlashingScreen;
