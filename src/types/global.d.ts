/// <reference path="types/MicrosoftMaps/CustomMapStyles.d.ts" />
/// <reference path="types/MicrosoftMaps/Microsoft.Maps.d.ts" />

declare global {
  interface Window {
    map: Microsoft.Maps.Map;
  }
}

export {};
