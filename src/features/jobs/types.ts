export type DATA_BUILD_MATERIAL_ORDER = {
  name: string;
  supplier: number;
  issued_on: string;
  description: string;
  notes: string;
  attachments: Array<{
    name: string;
    link: string;
  }>;
  delivery_instructions: {
    delivery: 'pickup' | 'delivery';
    location: string;
    contact_name: string;
    contact_number: string;
    date: string;
    time: string;
  };
};
