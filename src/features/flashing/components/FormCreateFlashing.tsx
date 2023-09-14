import React from 'react';
import { FieldInput, FieldSelect } from "@components/forms";
import { Button, Box } from "@ui/components";
import selectData from '../tempData/selectData.json'
import { useFormikContext } from "formik";
import { AddFlashingFormValues } from "@features/flashing/constants";
import { FlatList } from "react-native";

type SIZE_LENGTH_TYPE = {
	qty: number;
	length: number;
}

const FormCreateFlashingComponent = ()=> {
	const [sizesLength, setSizesLength] = React.useState<SIZE_LENGTH_TYPE[]>([{
		qty: 0,
		length: 0
	}])
  const formik = useFormikContext<AddFlashingFormValues>();
  const { handleSubmit, isValid,isSubmitting } = formik;


	const handleLength = () => {
		setSizesLength((prevState)=> [...prevState, {qty: 0, length: 0} ])
	}

	const renderItem = ({item})=> (
		<Box  flexDirection="row" justifyContent="space-between" mt="l" mb="unset" >
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
	)

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

		          <FlatList
			          data={sizesLength}
			          showsVerticalScrollIndicator={false}
			          keyExtractor={(_,index)=> `row-length${index}`}
			          renderItem={renderItem}
			          style={{flexGrow: 1, height: '40%'}}
		          />

	            <Button
	              variant="outlineWhite"
	              mt="2xl"
	              onPress={handleLength}
	              >
	              + Add Length
	            </Button>
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
