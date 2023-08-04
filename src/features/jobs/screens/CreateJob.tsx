import React, { useState } from 'react';
import { View } from 'react-native';
import { Box, Text, Button, ScrollBox } from '@ui/components';
import Input from '@ui/components/Input';
import { SafeAreaView } from 'react-native';

const CreateJobScreen = () => {
  const [name, setName] = useState('');
  const [jobNumber, setJobNumber] = useState('');
  const [siteAddress, setSiteAddress] = useState('');
  const [fileUpload, setFileUpload] = useState(null);
  const [contactName, setContactName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [contactEmail, setContactEmail] = useState('');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollBox p="m" backgroundColor={'white'} flex={1}>
        <Box>
          <Text variant="subheadSmall">Job Details</Text>
          <Input
            label="Job Name"
            onChangeText={text => setName(text)}
            value={name}
          />
          <Input
            label="Job Number"
            onChangeText={text => setJobNumber(text)}
            value={jobNumber}
          />
          <Input
            label="Site Address"
            onChangeText={text => setSiteAddress(text)}
            value={siteAddress}
            isMandatory
          />
          <Input
            label="File upload"
            onChangeText={text => setFileUpload(text)}
            //value={fileUpload}
          />
        </Box>
        <View
          style={{
            borderColor: '#8F94AE33',
            borderWidth: 1,
            marginTop: 5,
            marginBottom: 25,
          }}
        />
        <Text variant="subheadSmall">Contact Details</Text>
        <Input
          label="Contact Name"
          onChangeText={text => setContactName(text)}
          value={contactName}
          isMandatory
        />
        <Input
          label="Contact Number"
          onChangeText={text => setContactNumber(text)}
          value={contactNumber}
          isMandatory
        />
        <Input
          inputMode="email"
          label="Contact Email"
          onChangeText={text => setContactEmail(text)}
          value={contactEmail}
        />

        <Box>
          <Button mt="l" mb="xl" onPress={() => {}}>
            Create Job
          </Button>
        </Box>
      </ScrollBox>
    </SafeAreaView>
  );
};
export default CreateJobScreen;
