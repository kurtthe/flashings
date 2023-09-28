import React from 'react';
import { FieldInput, FieldSelect } from "@components/forms";
import { Button, Box, ScrollBox, IconButton, Icon } from "@ui/components";
import selectData from '../tempData/selectData.json'
import { FieldArray, useFormikContext } from "formik";
import { AddFlashingFormValues } from "@features/flashing/constants";
import { TrashIcon } from "@assets/icons";


const FormCreateFlashingComponent = ()=> {
  const formik = useFormikContext<AddFlashingFormValues>();
  const { values, handleSubmit, isValid,isSubmitting } = formik;
  return (
	      <Box px="m" flex={1} >
	        <Box my="m" flex={0.9}>
	          <FieldInput
	            name="name"
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
		        <FieldArray
		          name="flashingLengths"
		          render={(arrayHelpers)=> (
			          <>
				          <ScrollBox height="30%" showsVerticalScrollIndicator={false}>
					          {
						          values.flashingLengths?.map((_, index)=> (
							          <React.Fragment key={`row-length-${index}`} >
								          <Box flexDirection="row" mt="l"  justifyContent="space-around" mb="unset" >
									          <FieldInput
										          isRequired={index=== 0}
										          name={`flashingLengths.${index}.qty`}
										          label="Qty"
										          style={{width: index=== 0? 170: 150}}
										          keyboardType="numeric"
									          />
									          <FieldInput
										          isRequired={index=== 0}
										          name={`flashingLengths.${index}.length`}
										          label="Length"
										          style={{width: index=== 0? 170: 150}}
										          suffix="mm"
										          keyboardType="numeric"
									          />
									          {index > 0 && (
										          <IconButton icon={<Icon as={TrashIcon} />} onPress={()=> arrayHelpers.remove(index)} />
									          )}
								          </Box>
							          </React.Fragment>
						          ))
					          }
				          </ScrollBox>
									<Button
										variant="outlineWhite"
										mt="2xl"
										onPress={() =>
										arrayHelpers.push({
											qty: NaN,
											length: NaN
										})}>
									+ Add Length
									</Button>
			          </>
		          )}
		        />
	          </Box>
	          <Button
		          isDisabled={!isValid || isSubmitting}
	            onPress={handleSubmit.bind(null, undefined)}>
	            Start Drawing
	          </Button>
	      </Box>


  )
}

export default FormCreateFlashingComponent
