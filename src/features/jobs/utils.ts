/* @ts-ignore */
import { FLASHINGS_DATA, JOB_DATA, MATERIALS, RESPONSE_COMPANY_ACCOUNT, STORE } from "@models";
import { OptionsType } from "@ui/components";
import { dataMaterials } from "@store/jobs/mocks";
import { imageToBase64 } from "@shared/utils";

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
		dataMapped[`flash_${numberFlashing}_${index+1}_qty`] = dataLengths.qty;
		// @ts-ignore
		dataMapped[`flash_${numberFlashing}_${index+1}_length`] = dataLengths.length;
	})

	return dataMapped
}

const mapDataFlashing = async (flashings: FLASHINGS_DATA[]) => {
	let dataMapped = {}

	for (const [index, dataFlashing] of flashings.entries()) {
		const dataB64Preview =  await imageToBase64(dataFlashing.imgPreview)
		// @ts-ignore
		dataMapped[`flashing_name_${index + 1}`]= dataFlashing.name=== "" ? `Flashing ${index + 1}`: dataFlashing.name
		// @ts-ignore
		dataMapped[`material_${index + 1}`]= `0.55 Colorbond ${getMaterial(dataFlashing.colourMaterial).value}`
		// @ts-ignore
		dataMapped[`girth_${index + 1}`]= `${getGirth(flashings[index])} mm`
		// @ts-ignore
		dataMapped[`folds_${index + 1}`]= getBends(flashings[index])
		// @ts-ignore
		dataMapped[`flash_${index + 1}_image`]=`data:image/jpeg;base64,${dataB64Preview}`

		dataMapped = {...dataMapped, ...mapLengthsInputs(dataFlashing.flashingLengths, index + 1)}
	}
	return dataMapped
}
export const mapDataJobToDataPetition = (dataJob:JOB_DATA, dataAccountCompany: RESPONSE_COMPANY_ACCOUNT )=> {
	return new Promise(async (resolve)=> {
		const restData = await mapDataFlashing(dataJob.flashings)
		resolve({
			company_name: dataAccountCompany.company,
			burdens_acount_no: dataAccountCompany.account,
			job_name: dataJob.name,
			site_address: dataJob.address,
			job_number: dataJob.number,
			name: dataJob.contact.name,
			email: dataJob.contact.email,
			phone: dataJob.contact.number,
			...restData
		})
	})
}


export const getMaterial = (idMaterial: number): MATERIALS => {

	const material = dataMaterials.find((item)=> item.id === idMaterial)
	if(!material) {
		return {
			id: 1,
			value: 'galvanised',
			label: 'Galvanised',
			bgColor: '#a7aaaf',
			textColor: 'black',
			bold: false,
			disabled: false,
		};
	}
	return material
}
