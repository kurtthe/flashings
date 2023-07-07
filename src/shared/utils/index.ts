import {forms} from '../constants';

import type {InferType} from 'yup';
export type HelpEmailUsFormValues = InferType<
  typeof forms.helpEmailUsModal.schema
>;

export type EmailComposerFormValues = {
  subject: string;
  message: string;
};

export type FAQType = {
  id: number;
  date: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
};

export type KnowledgeType = {
  id: number;
  date: string;
  slug: string;
  status: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  link: string;
  yoast_head_json: {
    title: string;
    og_image: {
      width: number;
      height: number;
      url: string;
      size: string;
      id: number;
      alt: string;
      pixels: string;
      type: string;
    }[];
  };
};

export type KnowledgeDataState = {
  id: number;
  link: string;
  title: string;
  slug: string;
  imageUri: string;
};
