import React, { useState } from 'react';
import {Animated, View} from 'react-native';
import {
  AppStatusBar,
  Box,
  HeaderBackButton,
  HeaderBox,
  Text,
  Button,
  ScrollBox,
} from '@ui/components';
import Input from '@ui/components/Input';
import SelectInput from '@ui/components/SelectInput';
import { Routes } from '../navigation/routes';
import { SafeAreaView } from 'react-native';

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

const CreateJobScreen = ({ navigation }) => {
  const [name, setName] = useState('')
  const [jobNumber, setJobNumber] = useState('')
  const [siteAddress, setSiteAddress] = useState('')
  const [fileUpload, setFileUpload] = useState(null)
  const [contactName, setContactName] = useState('')
  const [contactNumber, setContactNumber] = useState('')
  const [contactEmail, setContactEmail] = useState('')

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollBox
        p="m"
        backgroundColor={'white'}
        flex={1}
      >
        <Box>
          <Text variant="subheadSmall">Job Details</Text>
          <Input
            label="Job Name"
            onChangeText={(text) => setName(text)}
            value={name}
          />
          <Input
            label="Job Number"
            onChangeText={(text) => setJobNumber(text)}
            value={jobNumber}
          />
          <Input
            label="Site Address"
            onChangeText={(text) => setSiteAddress(text)}
            value={siteAddress}
            isMandatory
          />
          <Input
            label="File upload"
            onChangeText={(text) => setFileUpload(text)}
            //value={fileUpload}
          />
        </Box>
        <View style={{borderColor: "#8F94AE33", borderWidth: 1, marginTop: 5, marginBottom: 25}}/>
        <Text variant="subheadSmall">Contact Details</Text>
        <Input
            label="Contact Name"
            onChangeText={(text) => setContactName(text)}
            value={contactName}
            isMandatory
          />
          <Input
            label="Contact Number"
            onChangeText={(text) => setContactNumber(text)}
            value={contactNumber}
            isMandatory
          />
          <Input
            inputMode="email"
            label="Contact Email"
            onChangeText={(text) => setContactEmail(text)}
            value={contactEmail}
          />

        <Box>
          <Button mt="l" mb='xl' onPress={() => {}}>
            Create Job
          </Button>
        </Box>
      </ScrollBox>
    </SafeAreaView>
  );
};
export default CreateJobScreen;
