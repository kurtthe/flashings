import React from 'react';
import { Box, Button, Card, CardProps, Text } from "@ui/components";
import { FLASHINGS_DATA, MATERIALS } from "@models";
import { dataMaterials } from "@store/jobs/mocks";
import PreviewFlashing from "@features/flashing/components/PreviewFlashing";
import ModalAddLengths from "@features/jobs/components/ModalAddLengths";

type Props = CardProps & {
  data: FLASHINGS_DATA;
  onAddLength?: () => void;
  jobId: string;
}
const CardGutterComponent: React.FC<Props> = ({data, onAddLength, jobId, ...rest})=>{
  const [visibleModalLength, setVisibleModalLength] = React.useState(false)
  const getMaterial = (idMaterial: number): MATERIALS => {

    const material = dataMaterials.find((item)=> item.id === idMaterial)
    if(!material) {
      return {
        id: 1,
        value: 'stone',
        label: 'Stone',
        bgColor: '#857f76',
        textColor: 'white',
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
    return pointers.flat(1).length ?? 0
  }

  const renderFlashingLengths = () => {
    if(!data.flashingLengths) return null

    return (
      <>
        {
          data.flashingLengths.map((flashLength, index) => (
          <Text key={`flashingLength${index}`} variant="bodySmallRegular">
            {flashLength.length} x {flashLength.qty}
          </Text>))
        }
        <Button variant="textSmall" onPress={() => setVisibleModalLength(true)}>
          +ADD LENGTH
        </Button>
      </>
    )
  }

  return (
    <>
    <Card flexDirection="row" alignItems="center" justifyContent="space-between" {...rest}>
      <Box  width='40%'>
        <Text variant="bodyBold">{data.name !== '' ? data.name: 'Flashing'}</Text>
        <PreviewFlashing width={120} height={89} dataFlashing={data} />
      </Box>
      <Box width='50%'>
        <Box
          flexDirection='row'
          justifyContent='space-around'
          width='80%'
          alignSelf='flex-end'
          mb="s"
          >
          {/*<Text variant="linkTextSmall">Duplicate</Text>*/}
          {/*<Text variant="linkTextSmall">Save</Text>*/}
          {/*<Text variant="linkTextSmall">Edit</Text>*/}
        </Box>
        <Box>
          <Text variant="bodyLabelTextfield" fontWeight="bold" color="black" >Description</Text>
            <Text variant="bodySmallRegular" style={{textTransform: 'capitalize'}}>
              0.55 Colorbond, {getMaterial(data.colourMaterial).label}
            </Text>
            <Box  flexDirection="row" alignItems="flex-start" justifyContent="flex-start">
              {renderFlashingLengths()}
            </Box>
            <Text variant="bodySmallRegular"> {getBends()} Bend Girth - {`${getGirth()}mm`}</Text>
        </Box>
      </Box>
    </Card>
    <ModalAddLengths visible={visibleModalLength} onClose={()=> setVisibleModalLength(false)} />
    </>
  )
}

export default  CardGutterComponent
