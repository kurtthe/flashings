/* @ts-ignore */
import { FLASHINGS_DATA, JOB_DATA, STORE } from "@models";
import { OptionsType } from "@ui/components";

export const storesToOption = (data:STORE[]): OptionsType[] => {
	return data.map((store) => ({
		value: store.id,
		label: store.name,
		bgColor: '#fff',
		textColor: "black",
		bold: false,
		disabled: false,
	}));
};

export const getGirth = (data: FLASHINGS_DATA) =>{
	const sizeLines = data.dataLines.map((lineInfo)=> lineInfo.distance)
	let breaksAdd = 0
	if(data.startType !== "none"){
		breaksAdd += 15
	}
	if(data.endType !== "none"){
		breaksAdd += 15
	}
	return sizeLines.reduce((a, b) => a + b, 0) + breaksAdd
}

export const getBends = (data: FLASHINGS_DATA)=>{
	const pointers = data.dataLines.map((lineInfo)=> lineInfo.points)
	let addTo = 0
	if(data.startType !== "none"){
		addTo += 1
	}
	if(data.endType !== "none"){
		addTo += 1
	}

	const lengthPoint = (pointers.length -1) + addTo
	return lengthPoint ?? 0
}

const mapLengthsInputs = (data: FLASHINGS_DATA['flashingLengths'], numberFlashing: number) => {
	const dataMapped = {}
	data.forEach((dataLengths, index)=> {
		// @ts-ignore
		dataMapped[`flash_${numberFlashing}_${index}_qty`] = dataLengths.qty;
		// @ts-ignore
		dataMapped[`flash_${numberFlashing}_${index}_length`] = dataLengths.length;
	})

	return dataMapped
}

const mapDataFlashing = (flashings: FLASHINGS_DATA[]) => {
	let dataMapped = {}

	flashings.forEach((dataFlashing, index)=> {
		// @ts-ignore
		dataMapped[`flashing_name_${index + 1}`]= dataFlashing.name
		// @ts-ignore
		dataMapped[`material_name_${index + 1}`]= dataFlashing.colourMaterial
		// @ts-ignore
		dataMapped[`girth_${index + 1}`]= getBends(flashings[index])
		// @ts-ignore
		dataMapped[`folds_${index + 1}`]= getBends(flashings[index])
		// @ts-ignore
		dataMapped[`flash_${index + 1}_image`]= "base64imagedata"

		dataMapped = {...dataMapped, ...mapLengthsInputs(dataFlashing.flashingLengths, index)}
	})

	return dataMapped

}
export const mapDataJobToDataPetition = (dataJob:JOB_DATA, )=> {
	const restData = mapDataFlashing(dataJob.flashings)
	return {
		company_name: "Roman Plumbing",
		burdens_acount_no: "1234",
		job_name: dataJob.name,
		site_address: dataJob.address,
		job_number: dataJob.number,
		name: dataJob.contact.name,
		email: dataJob.contact.email,
		phone: dataJob.contact.number,
		...restData
	}
}
