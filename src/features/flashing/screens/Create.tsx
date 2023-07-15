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
  value: 'pink',
  label: 'piiiink',
  color: 'pink',
}, {
  value: 'hot pink',
  label: 'hot piiiink',
  color: 'hotpink',
},{
  value: 'skyblue',
  label: 'skyblue',
  color: 'skyblue',
},{
  value: 'pink',
  label: 'piiiink',
  color: 'pink',
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
          value='pink' 
          label='hola'
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
