export * from './auth';
export * from './jobs';
export * from './flashings';
export * from './order';
export * from './files';

export type DATA_HOOK = {
  onSuccess?: (data: unknown) => void;
  onSettled?: (data: unknown) => void;
  onError?: (error: unknown) => void;
};

export type RESPONSE_TYPE_VERSION_APP = {
  latestVersion: string;
};
