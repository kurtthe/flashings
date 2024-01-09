/* @ts-ignore */
import { DATA_MATERIAL_ORDER, FLASHINGS_DATA, JOB_DATA, MATERIALS, RESPONSE_COMPANY_ACCOUNT, STORE } from "@models";
import { OptionsType } from "@ui/components";
import { dataMaterials } from "@store/jobs/mocks";
import { DATA_BUILD_MATERIAL_ORDER } from "@features/jobs/types";
import { formatDate } from "@shared/utils/formatDate";

export const storesToOption = (data:STORE[]): OptionsType[] => {
	return data.map((store) => ({
		value: store.id,
		label: store.name,
		bgColor: '#fff',
		textColor: "black",
		bold: false,
		disabled: false,
	})).sort(sortByNameAsc)
};

const sortByNameAsc = (x: OptionsType, y: OptionsType)=> {
	return x.label.localeCompare(y.label)
}

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
		dataMapped[`flash_${numberFlashing}_${index+1}_length`] = `${dataLengths.length} mm`;
	})

	return dataMapped
}

const mapDataFlashing = (flashings: FLASHINGS_DATA[]) => {
	let dataMapped = {}

	for (const [index, dataFlashing] of flashings.entries()) {
		// @ts-ignore
		dataMapped[`flashing_name_${index + 1}`]= dataFlashing.name=== "" ? `Flashing ${index + 1}`: dataFlashing.name
		// @ts-ignore
		dataMapped[`material_${index + 1}`]= `0.55 Colorbond ${getMaterial(dataFlashing.colourMaterial).value}`
		// @ts-ignore
		dataMapped[`girth_${index + 1}`]= `${getGirth(flashings[index])} mm`
		// @ts-ignore
		dataMapped[`folds_${index + 1}`]= getBends(flashings[index])
		// @ts-ignore
		dataMapped[`flash_${index + 1}_image`]= dataFlashing.imgPreview
		dataMapped = {...dataMapped, ...mapLengthsInputs(dataFlashing.flashingLengths, index + 1)}
	}
	return dataMapped
}
export const mapDataJobToDataPetition = (dataJob:JOB_DATA, dataAccountCompany: RESPONSE_COMPANY_ACCOUNT )=> {
	const restData = mapDataFlashing(dataJob.flashings)

	return {
		company_name: dataAccountCompany.company,
		burdens_acount_no: dataAccountCompany.account,
		job_name: dataJob.name,
		site_address: dataJob.address,
		job_number: dataJob.number,
		name: dataJob.contact.name,
		email: dataJob.contact.email,
		phone: dataJob.contact.number,
		order_date: formatDate(new Date(), "YYYY-MM-DD"),
		...restData
	}
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

export const buildDataMaterialOrder = (data: DATA_BUILD_MATERIAL_ORDER): DATA_MATERIAL_ORDER=> ({
	...data,
	status: "Draft",
	tax_exclusive: true,
	sections: [
		{
			items: [
				{
					description: "Flashing Order Per Attached Drawing Price TBD",
					quantity: "0.01",
					units: "ea",
					cost: "0.01",
					tax: [
						{
							name: "GST",
							rate: 10
						}
					]
				}
			]
		}
	],
})
