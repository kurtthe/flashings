import { createMigrate, PersistConfig } from 'redux-persist';
import { SecureStorage, Storage } from '@services';

const migrate = createMigrate({ 3: () => undefined, 4: () => undefined });

export const persistConfigAuth: PersistConfig<any> = {
  key: 'auth',
  storage: SecureStorage,
  version: 4.02,
  migrate,
};

export const persistConfigFlashings: PersistConfig<any> = {
  key: 'flashings',
  storage: Storage,
  version: 4,
  migrate,
};

export const persistConfigRoot: PersistConfig<any> = {
  key: 'root',
  storage: Storage,
  version: 4.02,
  migrate,
};
