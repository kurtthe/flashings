export type DATA_BUILD_MATERIAL_ORDER = {
	name: string;
	supplier: number;
	issued_on: string;
	description: string;
	attachments: Array<{
		name: string;
		link: string;
	}>
}
