import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { Box, Text, Button } from "@ui/components";
import data from '@features/flashing/tempData/data.json';
import { Routes } from '@features/flashing/navigation/routes';
import { Routes as RoutesJobs } from '@features/jobs/navigation/routes';
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import {
  StackPrivateDefinitions, StackPrivateProps
} from "@routes/PrivateNavigator";
import { JobsStackParamsList } from "@features/jobs/navigation/Stack.types";
import CardGutterComponent from "@features/jobs/components";
import { JOB_GUTTER } from "@models";


const JobDetailsScreen = () => {
  const navigation = useNavigation<StackPrivateProps>();
  const route = useRoute<RouteProp<JobsStackParamsList, RoutesJobs.JOB_DETAILS>>();
  const [modalVisible, setModalVisible] = useState(false);
  const { item } = route.params;
  const onPressFooter = (routeToGo: Routes) => {
    navigation.navigate(StackPrivateDefinitions.FLASHING, {
      screen: routeToGo,
    });
  };

  return (
    <Box flex={1} backgroundColor="white">
      <Box p="m">
        <Box>
          <Text variant="subheadSmallBold" mb="s">Job Details</Text>
          <Text variant="bodyBold">Site Name: <Text variant="bodyRegular">{item.client_name}</Text></Text>
          <Text variant="bodyBold">Site Address: <Text variant="bodyRegular">{item.address}</Text> </Text>
          <Text variant="bodyBold">Job # <Text variant="bodyRegular">{item.job_number}</Text></Text>
          <Text variant="bodyBold">Contact Name: <Text variant="bodyRegular">{item.client_name}</Text></Text>
        </Box>
      </Box>
        <FlatList
          contentContainerStyle={{paddingVertical: 10}}
          data={(data[0].custom_fields as any as JOB_GUTTER[])}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <CardGutterComponent
              key={`${index}`}
              onAddLength={() => setModalVisible(!modalVisible)}
              data={item}
            />
          )}
          keyExtractor={(item, index) => `card-gutter${item.id}-${index}`}
          ListFooterComponent={
            <Box mx="m" mb="xl" >
              <Button
                variant="outlineWhite"
                mt="l"
                onPress={() => onPressFooter(Routes.CREATE_FLASHING)}>
                + Add Flashing
              </Button>
              <Button
                mt="s"
                onPress={() => onPressFooter(Routes.CREATE_RAINHEAD)} //JUST TO TEST
                variant="outlineWhite">
                + Add Rainhead
              </Button>
              <Button
                mt="s"
                onPress={() => onPressFooter(Routes.GUTTER_FLASHING_EXAMPLES)}
                variant="outlineWhite">
                + Add Sump
              </Button>
              <Button mt="s" onPress={() => {}} variant="solid">
                Preview
              </Button>
            </Box>
          }
        />

    </Box>
  );
};

export default JobDetailsScreen;


