import React from 'react';
import { FieldInput, FieldSelect } from "@components/forms";
import { Button, Box } from "@ui/components";
import selectData from '../tempData/selectData.json'
import { useFormikContext } from "formik";
import { AddFlashingFormValues } from "@features/flashing/constants";


const FormCreateFlashingComponent = ()=>{
  const formik = useFormikContext<AddFlashingFormValues>();
  const {  handleSubmit } = formik;
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
          keyboardType="numeric"
        />
        <FieldInput
          name="length"
          placeholder="length"
          label="Length"
          style={{width: 150}}
          suffix="mm"
          keyboardType="numeric"
        />
      </Box>

      <Button
        onPress={handleSubmit.bind(null, undefined)}
        variant="outlineWhite"
        mt="2xl">
      + Add Length
      </Button>

    </>
  )

}

export default FormCreateFlashingComponent