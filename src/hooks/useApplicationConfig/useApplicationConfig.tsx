import { useContext } from 'react';

import { ApplicationConfig } from './config.context';
import { ApplicationConfigOptions } from './config.type';

export const useApplicationConfig = (): ApplicationConfigOptions => {
  const config = useContext(ApplicationConfig);

  if (!config) {
    throw new Error(
      'useApplicationConfig must be used inside a ApplicationConfigProvider',
    );
  }

  return config;
};

export default useApplicationConfig;
