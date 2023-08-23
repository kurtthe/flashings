import React from 'react';
import { FieldInput, FieldSelect } from "@components/forms";
import { Button, Box } from "@ui/components";
import selectData from '../tempData/selectData.json'


const FormCreateFlashingComponent = ()=>{

  return (
    <>
      <FieldInput
        name="Name"
        placeholder="Name"
        returnKeyType="next"
        label="Name"
        my="l"
      />

      <FieldSelect
        label="Colour/Material"
        name="material"
        placeholder="Select material"
        options={selectData}
        my="l"
      />

      <Box flexDirection="row" justifyContent="space-between" my="l" >
        <FieldInput
          name="qty"
          placeholder="qty"
          label="Qty"
          style={{width: 150}}
        />
        <FieldInput
          name="length"
          placeholder="length"
          label="Length"
          style={{width: 150}}
        />
      </Box>

      <Button
        variant="outlineWhite"
        mt="2xl">
      + Add Length
      </Button>

    </>
  )

}

export default FormCreateFlashingComponent
