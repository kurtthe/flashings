import React from 'react';
import { deleteItemStorage } from '@services/Storage';
import { PROPERTIES_STORE_TYPE } from '@services/Storage/types';

export const useLogOut = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const removeToken = () => {
    (async () => {
      !isLoading && setIsLoading(true);
      await deleteItemStorage(PROPERTIES_STORE_TYPE.DATA_USER);
      setIsLoading(false);
    })();
  };

  return { removeToken, isLoading };
};
