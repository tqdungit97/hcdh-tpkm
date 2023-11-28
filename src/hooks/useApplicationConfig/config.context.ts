import { createContext } from 'react';
import type { ApplicationConfigOptions } from './config.type';

export const ApplicationConfig = createContext<
  ApplicationConfigOptions | undefined
>(undefined);

export default ApplicationConfig;
