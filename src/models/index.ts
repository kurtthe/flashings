export * from './auth';
export * from './jobs';

export type DATA_HOOK = {
  onSuccess?: (data: unknown) => void;
  onSettled?: (data: unknown) => void;
  onError?: (error: unknown) => void;
};
