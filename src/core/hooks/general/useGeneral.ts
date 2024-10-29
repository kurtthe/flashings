import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {getVersionApp} from '@hooks/general/services';
import {config} from '@env/config';

export const useGetVersionApp = (): UseQueryResult<string, any> =>
  useQuery({
    queryFn: () => getVersionApp(),
    queryKey: ['get_version_app'],
    refetchInterval: config.intervalForGettingVersionApp,
  });
