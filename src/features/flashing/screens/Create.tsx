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

const data = [{
  value: 'stone',
  label: 'Stone',
  bgColor: '#867F76',
  textColor: 'white'
}, {
  value: 'galvanised',
  label: 'Galvanised',
  bgColor: 'lightgray',
  textColor: 'black'
},{
  value: 'zinc',
  label: 'Zinc',
  bgColor: '#A6A6A6',
  textColor: 'black'
},{
  value: 'basalt',
  label: 'Basalt',
  bgColor: '#6E6C70',
  textColor: 'white'
},{
  value: 'cream',
  label: 'Cream',
  bgColor: '#EADEBF',
  textColor: '#8F94AE'
},{
  value: 'cottage_green',
  label: 'Cottage Green',
  bgColor: '#384C40',
  textColor: 'white'
},{
  value: 'deep_ocean',
  label: 'Deep Ocean',
  bgColor: '#3A4252',
  textColor: 'white'
},{
  value: 'manor_red',
  label: 'Manor Red',
  bgColor: '#582115',
  textColor: 'white'
}]

const CreateFlashingScreen = () => {
  const [name, setName] = useState('')
  const [qty, setQty] = useState('')
  const [length, setLength] = useState('')
  return (
    <>
      <AppStatusBar backgroundColor={'white'}/>
      <HeaderBox
        mb="s"
        leftIcon={<HeaderBackButton customPressEvent={() => null} />}
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
      </Box>
    </>
  );
};
export default CreateFlashingScreen;
