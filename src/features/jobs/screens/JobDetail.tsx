import React, { useState } from 'react';
import { ActivityIndicator, FlatList } from "react-native";
import { Box, Text } from "@ui/components";
import { Routes } from '@features/flashing/navigation/routes';
import { Routes as RoutesJobs } from '@features/jobs/navigation/routes';
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import {
  StackPrivateDefinitions, StackPrivateProps
} from "@routes/PrivateNavigator";
import { JobsStackParamsList } from "@features/jobs/navigation/Stack.types";
import { CardGutter, SectionsButtonsJobsDetails } from "@features/jobs/components";
import { useAppSelector } from "@hooks/useStore";
import { jobData } from "@store/jobs/selectors";
import { useAddDataJob } from "@hooks/jobs";
import { mapDataJobToDataPetition } from "@features/jobs/utils";


const JobDetailsScreen = () => {
  const navigation = useNavigation<StackPrivateProps>();
  const route = useRoute<RouteProp<JobsStackParamsList, RoutesJobs.JOB_DETAILS>>();
  const [modalVisible, setModalVisible] = useState(false);
  const { jobId } = route.params;
  const item = useAppSelector((state) => jobData(state, jobId));
  const { mutate: createJob, isLoading } = useAddDataJob({
    onSuccess: (data) => {
      navigation.navigate(StackPrivateDefinitions.JOBS, { screen: RoutesJobs.ORDER_SUMMARY, params: {
        responseApi: JSON.stringify(data)
        }})
    },
  });
  const getCommonMaterial = (): number| null => {
    if(!item || item.flashings.length < 1) return null

    const elementCountMap: Map<any, number> = new Map();
    const flashingsMaterial = item.flashings.map((flash)=> flash.colourMaterial)

    flashingsMaterial.forEach((material)=> {
      if (elementCountMap.has(material)) {
        elementCountMap.set(material, elementCountMap.get(material)! + 1);
      } else {
        elementCountMap.set(material, 1);
      }
    })

    let mostFrequentElement = flashingsMaterial[0]; // Default to the first element
    let maxCount = 1; // Default count is 1

    // Find the element with the highest occurrence
    for (const [element, count] of elementCountMap.entries()) {
      if (count > maxCount) {
        mostFrequentElement = element;
        maxCount = count;
      }
    }

    return mostFrequentElement;

  }
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
          <Text variant="bodyBold" my="xxs">Job Name: <Text variant="bodyRegular">{item.name}</Text></Text>
          <Text variant="bodyBold"  my="xxs">Site Address: <Text variant="bodyRegular">{item.address}</Text> </Text>
          <Text variant="bodyBold" my="xxs">Job # <Text variant="bodyRegular">{item.number}</Text></Text>
          { item.contact.name && <Text variant="bodyBold"  my="xxs">Contact Name: <Text variant="bodyRegular">{item.contact.name}</Text></Text>}
          {item.contact.email && <Text variant="bodyBold"  my="xxs">Contact Email: <Text variant="bodyRegular">{item.contact.email}</Text></Text>}
          {item.contact.number && <Text variant="bodyBold"  my="xxs">Contact Phone: <Text variant="bodyRegular">{item.contact.number}</Text></Text>}
        </Box>
      </Box>
      <FlatList
        contentContainerStyle={{paddingVertical: 10}}
        data={item.flashings}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <CardGutter
            key={`${item.id}-${index}`}
            jobId={jobId}
            onAddLength={() => setModalVisible(!modalVisible)}
            data={{ ...item, name: item.name === '' ? `Flashing ${index +1}` :item.name}}
          />
        )}
        ListFooterComponent={
          <SectionsButtonsJobsDetails
            loadingPreview={isLoading}
            showPreview={item.flashings.length > 0}
            disabledAddFlashing={item.flashings.length === 6}
            onPreview={()=> createJob({
              dataJobAndFlashing: mapDataJobToDataPetition(item)
            })
            }
            onAddFlashing={() => onPressFooter(
              Routes.CREATE_EDIT_FLASHING,
              {
                jobId: item.id,
                jobName: item.name,
                commonMaterial: getCommonMaterial()
              })}
          />
        }
      />
    </Box>
  );
};

export default JobDetailsScreen;


