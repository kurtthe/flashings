import React from 'react';
import { getItemStorage } from '@services/Storage';
import { PROPERTIES_STORE_TYPE } from '@services/Storage/types';

export const useUserAuthenticated = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [thereToken, setTokenAuth] = React.useState<boolean>();

  React.useEffect(() => {
    getToken();
  }, []);

  const getToken = () => {
    (async () => {
      !isLoading && setIsLoading(true);

      const tokenStorageExist = await getItemStorage(
        PROPERTIES_STORE_TYPE.DATA_USER,
      );
      setTokenAuth(!!tokenStorageExist);
      setIsLoading(false);
    })();
  };

  return { isLoading, thereToken, update: getToken };
};
