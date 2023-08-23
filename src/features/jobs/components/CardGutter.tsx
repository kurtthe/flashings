import React from 'react';
import { Box, Button, Card, Text } from "@ui/components";
import { Image,  StyleSheet} from "react-native";
import { JOB_GUTTER } from "@models";

type Props = {
  data: JOB_GUTTER;
  onAddLength?: () => void}
const CardGutterComponent: React.FC<Props> = ({data, onAddLength})=>{

  return (
    <Card flexDirection="row" alignItems="center" justifyContent="space-between">
      <Box  width='40%'>
        <Text variant="bodyBold">{data.title}</Text>
        <Image
          source={require('@assets/images/asset_temp.png')}
          style={styles.cardImage}
        />
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
          <Text variant="bodyRegular">Description</Text>
          {data.job_flasing.map(dataFlashing => {
            return (
              <>
                <Text variant="bodyRegular">
                  {dataFlashing.description}
                </Text>
                <Text variant="bodySmallRegular">{dataFlashing.width}</Text>
                <Box  flexDirection="row" alignItems="flex-start" justifyContent="flex-start">
                  <Text variant="bodySmallRegular">{dataFlashing.high}</Text>
                  {dataFlashing.canAddLength && (
                    <Button variant="textSmall" onPress={() => onAddLength && onAddLength()}>
                      +ADD LENGTH
                    </Button>
                  )}
                </Box>
                <Text variant="bodySmallRegular">{dataFlashing.depth}</Text>
              </>
            );
          })}
        </Box>
      </Box>
    </Card>
  )
}

const styles = StyleSheet.create({
  cardImage: {
    width: 120,
    height: 89,
    marginTop: 10,
  },
});


export default  CardGutterComponent
