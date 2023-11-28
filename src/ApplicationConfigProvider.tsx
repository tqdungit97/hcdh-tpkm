import { ReactNode, useMemo } from "react";
import { ApplicationConfig, ApplicationConfigOptions } from "./hooks/useApplicationConfig";
import { environment } from "./environment";

declare global {
  interface Window {
    env?: { [key: string]: string };
  }
}

export function ApplicationConfigProvider({
  children,
}: {
  children: ReactNode;
}) {
  const applicationConfig = useMemo<ApplicationConfigOptions>(
    () => ({
      apiUrl: environment.apiUrl,
      production: environment.production
    }),
    []
  );

  return (
    <ApplicationConfig.Provider value={applicationConfig}>
      {children}
    </ApplicationConfig.Provider>
  );
}

export default ApplicationConfigProvider;
