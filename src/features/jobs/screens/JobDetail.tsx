import React, { useState } from 'react';
import { ActivityIndicator, FlatList } from "react-native";
import { Box, Text, Button } from "@ui/components";
import { Routes } from '@features/flashing/navigation/routes';
import { Routes as RoutesJobs } from '@features/jobs/navigation/routes';
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import {
  StackPrivateDefinitions, StackPrivateProps
} from "@routes/PrivateNavigator";
import { JobsStackParamsList } from "@features/jobs/navigation/Stack.types";
import CardGutterComponent from "@features/jobs/components";
import { useAppSelector } from "@hooks/useStore";
import { jobData } from "@store/jobs/selectors";


const JobDetailsScreen = () => {
  const navigation = useNavigation<StackPrivateProps>();
  const route = useRoute<RouteProp<JobsStackParamsList, RoutesJobs.JOB_DETAILS>>();
  const [modalVisible, setModalVisible] = useState(false);
  const { jobId } = route.params;
  const item = useAppSelector((state) => jobData(state, jobId));

  const onPressFooter = (routeToGo: Routes, params= {}) => {
    navigation.navigate(StackPrivateDefinitions.FLASHING, {
      screen: routeToGo,
      params
    });
  };

  if(!item){
    return (
      <Box flex={1} alignItems="center" justifyContent="center">
        <ActivityIndicator/>
      </Box>
    );
  }

  return (
    <Box flex={1} backgroundColor="white">
      <Box p="m">
        <Box>
          <Text variant="subheadSmallBold" mb="s">Job Details</Text>
          <Text variant="bodyBold">Site Name: <Text variant="bodyRegular">{item.name}</Text></Text>
          <Text variant="bodyBold">Site Address: <Text variant="bodyRegular">{item.address}</Text> </Text>
          <Text variant="bodyBold">Job # <Text variant="bodyRegular">{item.number}</Text></Text>
          <Text variant="bodyBold">Contact Name: <Text variant="bodyRegular">{item.contact.name}</Text></Text>
        </Box>
      </Box>
      <FlatList
        contentContainerStyle={{paddingVertical: 10}}
        data={item.flashings}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <CardGutterComponent
            key={`${item.id}-${index}`}
            onAddLength={() => setModalVisible(!modalVisible)}
            data={item}
          />
        )}
        ListFooterComponent={
          <Box mx="m" mb="xl" >
            <Button
              variant="outlineWhite"
              mt="l"
              onPress={() => onPressFooter(Routes.CREATE_EDIT_FLASHING, {jobId: item.id, jobName: item.name})}>
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
              onPress={() => null}
              variant="outlineWhite">
              + Add Sump
            </Button>
            {/*<Button mt="s" onPress={() => {}} variant="solid">*/}
            {/*  Preview*/}
            {/*</Button>*/}
          </Box>
        }
      />
    </Box>
  );
};

export default JobDetailsScreen;


