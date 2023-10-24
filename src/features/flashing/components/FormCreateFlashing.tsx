import React from 'react';
import { FieldInput, FieldSelect } from "@components/forms";
import { Button, Box, ScrollBox, IconButton, Icon, OptionsType } from "@ui/components";
import { FieldArray, useFormikContext } from "formik";
import { AddFlashingFormValues } from "@features/flashing/constants";
import { TrashIcon } from "@assets/icons";
import { actions as flashingActions } from "@store/jobs/actions";
import { useAppDispatch } from "@hooks/useStore";
import { FLASHINGS_DATA } from "@models";
import { useNavigation } from "@react-navigation/native";
import { FlashingStackProps } from "@features/flashing/navigation/Stack.types";
import { dataMaterials } from "@store/jobs/mocks";

type Props = {
	labelButton: string;
	idJob?: number;
	dataFlashing?: FLASHINGS_DATA,
	showButtonUpdate?: boolean;
}
const FormCreateFlashingComponent: React.FC<Props> = ({labelButton, idJob, dataFlashing, showButtonUpdate=false})=> {
	const dispatch = useAppDispatch();
	const navigation = useNavigation<FlashingStackProps>()
  const formik = useFormikContext<AddFlashingFormValues>();
  const { values, handleSubmit, isValid,isSubmitting, errors } = formik;
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
	            options={dataMaterials as any as OptionsType[]}
	            my="l"
	          />
		        <FieldArray
		          name="flashingLengths"
		          render={(arrayHelpers)=> (
			          <>
				          <ScrollBox height="30%" showsVerticalScrollIndicator={false}>
					          {
						          values.flashingLengths?.map((_, index, arrayLengths)=> (
							          <React.Fragment key={`row-length-${index}`} >
								          <Box flexDirection="row" mt="l"  justifyContent="space-between" mb="unset" >
									          <FieldInput
										          name={`flashingLengths.${index}.qty`}
										          label="Qty"
										          style={{width:arrayLengths.length > 1? 150:170 }}
										          keyboardType="numeric"
									          />
									          <FieldInput
										          name={`flashingLengths.${index}.length`}
										          label="Length"
										          style={{width:arrayLengths.length > 1? 150:170 }}
										          suffix="mm"
										          keyboardType="numeric"
									          />
									          {arrayLengths.length > 1 && <IconButton mt="m" icon={<Icon as={TrashIcon}  />} onPress={()=> arrayHelpers.remove(index)} />}
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
		          isDisabled={!isValid || !values.material}
	            onPress={handleSubmit.bind(null, undefined)}
		          isLoading={isSubmitting}
	          >
		          {labelButton}
	          </Button>

		      {
			      showButtonUpdate && <Button
			      mt="s"
            isDisabled={!isValid || !values.material}
            isLoading={isSubmitting}
			      onPress={handleUpdateFlashing}>
			        Update Flashing
		        </Button>
					}
	      </Box>


  )
}

export default FormCreateFlashingComponent
