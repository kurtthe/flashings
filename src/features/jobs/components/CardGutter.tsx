import React from 'react';
import { Box, Button, Card, Text } from "@ui/components";
import { FLASHINGS_DATA, MATERIALS } from "@models";
import { dataMaterials } from "@store/jobs/mocks";
import PreviewFlashing from "@features/flashing/components/PreviewFlashing";

type Props = {
  data: FLASHINGS_DATA;
  onAddLength?: () => void;
  key?: string;
}
const CardGutterComponent: React.FC<Props> = ({data, onAddLength,key})=>{
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

  return (
    <Card flexDirection="row" alignItems="center" justifyContent="space-between" key={`card-gutter-${key}`}>
      <Box  width='40%'>
        <Text variant="bodyBold">{data.name}</Text>
        <PreviewFlashing width={120} height={89} dataLines={data.dataLines} />
      </Box>
      <Box width='50%'>
        <Box
          flexDirection='row'
          justifyContent='space-around'
          width='80%'
          alignSelf='flex-end'
          mb="s"
          >
          <Text variant="linkTextSmall">Duplicate</Text>
          <Text variant="linkTextSmall">Save</Text>
          <Text variant="linkTextSmall">Edit</Text>
        </Box>
        <Box>
          <Text variant="bodyLabelTextfield" fontWeight="bold" color="black" >Description</Text>
            <Text variant="bodySmallRegular">
              <Text variant="bodySmallRegular" style={{textTransform: 'capitalize'}}>{getMaterial(data.colourMaterial).id} </Text>
              <Text variant="bodySmallRegular" style={{textTransform: 'capitalize'}}>{getMaterial(data.colourMaterial).textColor}</Text>,
              {getMaterial(data.colourMaterial).label}
            </Text>
            <Box  flexDirection="row" alignItems="flex-start" justifyContent="flex-start">
              <Text variant="bodySmallRegular">{data.length} x <Text variant="bodySmallRegular">{data.qty}</Text></Text>
              <Button variant="textSmall" onPress={() => onAddLength && onAddLength()}>
                +ADD LENGTH
              </Button>
            </Box>
        </Box>
      </Box>
    </Card>
  )
}

export default  CardGutterComponent
