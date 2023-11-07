import React from 'react';
import { Box, Button, Card, CardProps, Text } from "@ui/components";
import { FLASHINGS_DATA, MATERIALS } from "@models";
import { dataMaterials } from "@store/jobs/mocks";
import PreviewFlashing from "@features/flashing/components/PreviewFlashing";
import ModalAddLengths from "@features/jobs/components/ModalAddLengths";
import { FlatList } from "react-native";
import { StackPrivateDefinitions, StackPrivateProps } from "@routes/PrivateNavigator";
import { useNavigation } from "@react-navigation/native";
import { Routes } from "@features/flashing/navigation/routes";

type Props = CardProps & {
  data: FLASHINGS_DATA;
  onAddLength?: () => void;
  jobId: number;
}
const CardGutterComponent: React.FC<Props> = ({data, onAddLength, jobId, ...rest})=>{
  const [visibleModalLength, setVisibleModalLength] = React.useState(false)
  const navigation = useNavigation<StackPrivateProps>()
  const getMaterial = (idMaterial: number): MATERIALS => {

    const material = dataMaterials.find((item)=> item.id === idMaterial)
    if(!material) {
      return {
        id: 1,
        value: 'galvanised',
        label: 'Galvanised',
        bgColor: '#a7aaaf',
        textColor: 'black',
        bold: false,
        disabled: false,
      };
    }
    return material
  }

  const getGirth = () =>{
    const sizeLines = data.dataLines.map((lineInfo)=> lineInfo.distance)
    return sizeLines.reduce((a, b) => a + b, 0)
  }

  const getBends = ()=>{
    const pointers = data.dataLines.map((lineInfo)=> lineInfo.points)
    const lengthPoint = pointers.flat(1).length - 2
    return lengthPoint? lengthPoint/2 : 0
  }

  const handleEditFlashing = ()=> {
    navigation.navigate(StackPrivateDefinitions.FLASHING, {
      screen: Routes.CREATE_EDIT_FLASHING,
      params: {jobId: jobId, idFlashing: data.id}
    });
  }

  const renderFlashingLengths = () => {
    if(!data.flashingLengths) return null

    return (
      <Box flexDirection="row">
        <FlatList
          scrollEnabled={false}
          keyExtractor={(item, index)=>`textLength-${index}${item.qty}`}
          data={data.flashingLengths}
          renderItem={({item, index})=>
            <Box flexDirection="row" flexWrap="wrap">
              <Text variant="bodySmallRegular">
                {item.length}mm x {item.qty}
              </Text>
              {(data.flashingLengths.length ===  (index +1)) && <Button variant="textSmall" onPress={() => setVisibleModalLength(true)}>
                +ADD LENGTH
              </Button>
              }
            </Box>
          }
        />
      </Box>
    )
  }

  return (
    <>
      <Card flexDirection="row" alignItems="flex-start" justifyContent="space-between" {...rest}>
        <Box  width='40%'>
          <Text  mb="xs" variant="bodyBold" >{data.name !== '' ? data.name: 'Flashing'}</Text>
          <PreviewFlashing imgPreview={`data:image/png;base64,${data.imgPreview}`}/>
        </Box>
        <Box width='50%'>
          <Box
            flexDirection='row'
            justifyContent='flex-start'
            mb="xs"
          >
            <Text lineHeight={18} onPress={handleEditFlashing} variant="linkTextSmall">Edit</Text>
          </Box>
          <Box>
            <Text variant="bodyLabelTextfield" fontWeight="bold" color="black" >Description</Text>
            <Text variant="bodySmallRegular" style={{textTransform: 'capitalize'}}>
              0.55 Colorbond, {getMaterial(data.colourMaterial).label}
            </Text>
            <Box  flexDirection="row" alignItems="flex-start" justifyContent="flex-start">
              {renderFlashingLengths()}
            </Box>
            <Text variant="bodySmallRegular">{getBends()} Bend Girth - {`${getGirth()}mm`}</Text>
          </Box>
        </Box>
      </Card>
      <ModalAddLengths idFlashing={data.id} jobId={jobId} visible={visibleModalLength} onClose={()=> setVisibleModalLength(false)} />
    </>
  )
}

export default  CardGutterComponent
