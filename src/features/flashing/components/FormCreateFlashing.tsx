import React from 'react';
import { FieldInput, FieldSelect } from "@components/forms";
import { Button, Box, ScrollBox } from "@ui/components";
import selectData from '../tempData/selectData.json'
import { FieldArray, useFormikContext } from "formik";
import { AddFlashingFormValues } from "@features/flashing/constants";
import { FlatList } from "react-native";

type SIZE_LENGTH_TYPE = {
	qty: number;
	length: number;
}

const FormCreateFlashingComponent = ()=> {
  const formik = useFormikContext<AddFlashingFormValues>();
  const { values, handleSubmit, isValid,isSubmitting } = formik;

  return (
	      <Box px="m" flex={1} >
	        <Box my="m" flex={0.9}>
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
		        <FieldArray
		          name="flashingLengths"
		          render={(arrayHelpers)=> (
			          <>
				          <ScrollBox height="30%" showsVerticalScrollIndicator={false}>
					          {
						          values.flashingLengths?.map((_, index)=> (
							          <React.Fragment key={`row-length-${index}`}>
								          <Box flexDirection="row" justifyContent="space-between" mt="l" mb="unset" >
									          <FieldInput
										          isRequired
										          name={`flashingLength.${index}.qty`}
										          placeholder="qty"
										          label="Qty"
										          style={{width: 150}}
										          keyboardType="numeric"
									          />
									          <FieldInput
										          isRequired
										          name={`flashingLength.${index}.length`}
										          placeholder="length"
										          label="Length"
										          style={{width: 150}}
										          suffix="mm"
										          keyboardType="numeric"
									          />
									          <Button variant="outlineWhite" height={60} onPress={()=> arrayHelpers.remove(index)}>
										          -
									          </Button>
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
						          })}
				          >
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
