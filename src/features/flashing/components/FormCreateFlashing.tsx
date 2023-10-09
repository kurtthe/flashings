import React from 'react';
import { FieldInput, FieldSelect } from "@components/forms";
import { Button, Box, ScrollBox, IconButton, Icon } from "@ui/components";
import selectData from '../tempData/selectData.json'
import { FieldArray, useFormikContext } from "formik";
import { AddFlashingFormValues } from "@features/flashing/constants";
import { TrashIcon } from "@assets/icons";
import { actions as flashingActions } from "@store/jobs/actions";
import { useAppDispatch } from "@hooks/useStore";
import { FLASHINGS_DATA } from "@models";
import { useNavigation } from "@react-navigation/native";
import { FlashingStackProps } from "@features/flashing/navigation/Stack.types";

type Props = {
	labelButton: string;
	idJob?: number;
	dataFlashing?: FLASHINGS_DATA
}
const FormCreateFlashingComponent: React.FC<Props> = ({labelButton, idJob, dataFlashing})=> {
	const dispatch = useAppDispatch();
	const navigation = useNavigation<FlashingStackProps>()
  const formik = useFormikContext<AddFlashingFormValues>();
  const { values, handleSubmit, isValid,isSubmitting } = formik;

	const handleUpdateFlashing = ()=> {
		if(!idJob || !dataFlashing) return;

		const newDataFlashing = {...dataFlashing,
			name: values.name,
			colourMaterial: values.material,
			flashingLengths: values.flashingLengths ?? []
		}

		dispatch(flashingActions.addEditFlashing({idJob,  flashing: newDataFlashing}));
		navigation.goBack()

	}

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
								          <Box flexDirection="row" mt="l"  justifyContent="space-between" mb="unset" >
									          <FieldInput
										          name={`flashingLengths.${index}.qty`}
										          label="Qty"
										          style={{width: 150}}
										          keyboardType="numeric"
									          />
									          <FieldInput
										          name={`flashingLengths.${index}.length`}
										          label="Length"
										          style={{width:150 }}
										          suffix="mm"
										          keyboardType="numeric"
									          />
										          <IconButton mt="m" icon={<Icon as={TrashIcon}  />} onPress={()=> arrayHelpers.remove(index)} />
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
											qty: undefined,
											length: undefined
										})}>
									+ Add Length
									</Button>
			          </>
		          )}
		        />
	          </Box>
	          <Button
		          isDisabled={!isValid}
	            onPress={handleSubmit.bind(null, undefined)}
		          isLoading={isSubmitting}
	          >
		          {labelButton}
	          </Button>

		      {
			      idJob && <Button
			      mt="s"
            isLoading={isSubmitting}
			      onPress={handleUpdateFlashing}>
			        Update Flashing
		        </Button>
					}
	      </Box>


  )
}

export default FormCreateFlashingComponent
