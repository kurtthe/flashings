import React, { useState } from 'react';
import { ActivityIndicator, FlatList, Linking } from "react-native";
import { Box, Icon, IconButton, ScrollBox, Text } from "@ui/components";
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
import { useAddDataJob, useGetAccountAndCompany } from "@hooks/jobs";
import { mapDataJobToDataPetition } from "@features/jobs/utils";
import { ModalBottom, ModalBottomRef } from "@components";
import PDFShared from "@features/jobs/containers/PDFShared";
import { CloseIcon } from "@assets/icons";


const JobDetailsScreen = () => {
  const modalBottomRef = React.useRef<ModalBottomRef>();
  const navigation = useNavigation<StackPrivateProps>();
  const route = useRoute<RouteProp<JobsStackParamsList, RoutesJobs.JOB_DETAILS>>();
  const [modalVisible, setModalVisible] = useState(false);
  const { jobId } = route.params;
  const item = useAppSelector((state) => jobData(state, jobId));
  const {data: dataAccountCompany} = useGetAccountAndCompany()
  const { mutate: createJob, isLoading } = useAddDataJob({
    onSuccess: (data) => {
      if(!item) return ;
      navigation.navigate(StackPrivateDefinitions.JOBS, { screen: RoutesJobs.ORDER_SUMMARY, params: {
        responseApi: JSON.stringify(data),
        jobName: item.name,
        jobId: item.id,
        jobAddress: item.address
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

  const handleOpenLink = () => {
    if(!item || !item.orderData) return;
    Linking.openURL(item.orderData.urlPdf).catch((err)=> console.log("error opening URL:", err))
  }

  if(!item || !dataAccountCompany){
    return (
      <Box flex={1} alignItems="center" justifyContent="center">
        <ActivityIndicator/>
      </Box>
    );
  }

  return (
    <>

    <ScrollBox flex={1} backgroundColor="white">
      <Box p="m">
        <Box>
          <Text variant="subheadSmallBold" mb="s">Job Details</Text>
          <Text variant="bodyBold" my="xxs">Job Name: <Text variant="bodyRegular">{item.name}</Text></Text>
          <Text variant="bodyBold"  my="xxs">Site Address: <Text variant="bodyRegular">{item.address}</Text> </Text>
          <Text variant="bodyBold" my="xxs">Job #: <Text variant="bodyRegular">{item.number}</Text></Text>
          { item.contact.name && <Text variant="bodyBold"  my="xxs">Contact Name: <Text variant="bodyRegular">{item.contact.name}</Text></Text>}
          {item.contact.email && <Text variant="bodyBold"  my="xxs">Contact Email: <Text variant="bodyRegular">{item.contact.email}</Text></Text>}
          {item.contact.number && <Text variant="bodyBold"  my="xxs">Contact Phone: <Text variant="bodyRegular">{item.contact.number}</Text></Text>}
          {item.orderData && <Text  variant="subheadSmallBold"  my="xs">Order Sent</Text>}
          {item.orderData && <Text  variant="bodyBold"  my="xxs">Order Number: <Text variant="bodyRegular">{item.orderData.orderNumber}</Text></Text>}
          {item.orderData && <Text  variant="bodyBold"  my="xxs">Store: <Text variant="bodyRegular">{item.orderData.store}</Text></Text>}
          {item.orderData && <Text  variant="bodyBold"  my="xxs">Sent: <Text variant="bodyRegular">{item.orderData.date}</Text></Text>}
          {item.orderData && <Text  variant="bodyBold"  my="xxs">PDF: <Text onPress={() => modalBottomRef.current?.show()} variant="subheadMediumLink">View PDF</Text></Text>}
        </Box>
      </Box>
      <FlatList
        scrollEnabled={false}
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
            onPreview={()=> {
              createJob({
                dataJobAndFlashing: mapDataJobToDataPetition(item, dataAccountCompany)
              })
            }
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
    </ScrollBox>

      <ModalBottom
        backdropClosesSheet={true}
        ref={modalBottomRef}
        height={800}
        draggable={false}
      >
        <Box p="m" justifyContent="flex-start" flex={1}>
          <Box width="100%" alignItems="flex-end">
            <IconButton icon={<Icon as={CloseIcon} color="base300" />} onPress={()=> modalBottomRef.current?.hide()} />
          </Box>
          <PDFShared shareSmall urlIdPdf={item.orderData?item.orderData.urlPdf : '' } namePdf={item.name ?? ''} />
        </Box>
      </ModalBottom>
    </>

  );
};

export default JobDetailsScreen;


