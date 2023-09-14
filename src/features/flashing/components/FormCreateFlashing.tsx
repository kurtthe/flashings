import React from 'react';
import { FieldInput, FieldSelect } from "@components/forms";
import { Button, Box } from "@ui/components";
import selectData from '../tempData/selectData.json'
import { useFormikContext } from "formik";
import { AddFlashingFormValues } from "@features/flashing/constants";
import DismissKeyboardPressable from "@components/forms/DismissKeyboardPressable";


const FormCreateFlashingComponent = ()=>{
  const formik = useFormikContext<AddFlashingFormValues>();
  const { handleSubmit, isValid,isSubmitting } = formik;

  return (
			<DismissKeyboardPressable>
	      <Box px="m" flex={1} >
	        <Box my="m" flex={0.8}>
	          <FieldInput
	            isRequired
	            name="name"
	            placeholder="Name"
	            returnKeyType="next"
	            label="Name"
	            my="l"
	          />
	          <FieldSelect
	            isRequired
	            label="Colour/Material"
	            name="material"
	            options={selectData}
	            my="l"
	          />

	          <Box flexDirection="row" justifyContent="space-between" my="l" >
	            <FieldInput
	              isRequired
	              name="qty"
	              placeholder="qty"
	              label="Qty"
	              style={{width: 150}}
	              keyboardType="numeric"
	            />
	            <FieldInput
	              isRequired
	              name="length"
	              placeholder="length"
	              label="Length"
	              style={{width: 150}}
	              suffix="mm"
	              keyboardType="numeric"
	            />
	          </Box>

	            <Button
	              variant="outlineWhite"
	              mt="2xl">
	              + Add Length
	            </Button>
	          </Box>

	          <Button
		          isDisabled={!isValid || isSubmitting}
	            onPress={handleSubmit.bind(null, undefined)}>
	            Start Drawing
	          </Button>
	      </Box>
    </DismissKeyboardPressable>
  )
}

export default FormCreateFlashingComponent
