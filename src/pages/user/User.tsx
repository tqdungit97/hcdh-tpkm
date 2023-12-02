import { useState } from "react";
import { Box, VStack } from "@chakra-ui/react";
import { AppHeader } from "../../components";
import {
  BingMap,
  AutoCompleteAddress,
  BingMapProvider,
  Directions,
  BingMapDirections,
} from "../../components/BingMap";
import { BookingButton } from "./BookingButton";
import { useBooking } from "../../hooks";


export function User() {
  const { bookingData } = useBooking();
  const [directions, setDirections] = useState<Directions>({
    from: {
      subtitle: "Phường Tân Thuận Tây, Ho Chi Minh City 72910, Vietnam",
      location: {
        latitude: 10.75474,
        longitude: 106.726303,
        altitude: 0,
        altitudeReference: -1,
      },
      entityType: "PostalAddress",
      entitySubType: "Address",
      title: "164 Huỳnh Tấn Phát",
      entityId:
        'local_geoid:"QWRkcmVzcy84NDM4MjM2NDY5MTc2MzAzNjQ0JTdjMTY0P2FsdFF1ZXJ5PWFsJTVlMTY0K0h1JWUxJWJiJWIzbmgrVCVlMSViYSVhNW4rUGglYzMlYTF0JTdjbGMlNWVQaCVjNiViMCVlMSViYiU5ZG5nK1QlYzMlYTJuK1RodSVlMSViYSVhZG4rVCVjMyVhMnklN2NhMiU1ZURpc3RyaWN0KzclN2NhMSU1ZUhvK0NoaStNaW5oK0NpdHklN2NjciU1ZVZpZXRuYW0lN2Npc28lNWVWTg=="',
      address: {
        countryRegionISO2: "VN",
        adminDistrict: "Ho Chi Minh City",
        district: "District 7",
        addressLine: "164 Huỳnh Tấn Phát",
        countryRegion: "Vietnam",
        locality: "Phường Tân Thuận Tây",
        postalCode: "72910",
        formattedAddress:
          "164 Huỳnh Tấn Phát, Phường Tân Thuận Tây, Ho Chi Minh City 72910, Vietnam",
      },
      formattedSuggestion:
        "164 Huỳnh Tấn Phát, Phường Tân Thuận Tây, Ho Chi Minh City 72910, Vietnam",
      bestView: {
        center: {
          latitude: 10.75474,
          longitude: 106.726303,
          altitude: 0,
          altitudeReference: -1,
        },
        width: 0.010484610890983959,
        height: 0.007725435141352932,
        crs: {
          id: "LatLon",
          bounds: [90, 180, -90, -180],
        },
        bounds: [
          10.758602717570676, 106.7315453054455, 10.750877282429324,
          106.72106069455451,
        ],
      },
    },
    to: {
      subtitle: "Ward 4, Ho Chi Minh City 72711, Vietnam",
      location: {
        latitude: 10.762679,
        longitude: 106.682586,
        altitude: 0,
        altitudeReference: -1,
      },
      entityType: "PostalAddress",
      entitySubType: "Address",
      title: "227 Nguyễn Văn Cừ",
      entityId:
        'local_geoid:"QWRkcmVzcy84NDM4MjM5NDk5NDA5OTQ4ODAyJTdjMjI3P2FsdFF1ZXJ5PWFsJTVlMjI3K05ndXklZTElYmIlODVuK1YlYzQlODNuK0MlZTElYmIlYWIlN2NsYyU1ZVdhcmQrNCU3Y2EyJTVlRGlzdHJpY3QrNSU3Y2ExJTVlSG8rQ2hpK01pbmgrQ2l0eSU3Y2NyJTVlVmlldG5hbSU3Y2lzbyU1ZVZO"',
      address: {
        countryRegionISO2: "VN",
        adminDistrict: "Ho Chi Minh City",
        district: "District 5",
        addressLine: "227 Nguyễn Văn Cừ",
        countryRegion: "Vietnam",
        locality: "Ward 4",
        postalCode: "72711",
        formattedAddress:
          "227 Nguyễn Văn Cừ, Ward 4, Ho Chi Minh City 72711, Vietnam",
      },
      formattedSuggestion:
        "227 Nguyễn Văn Cừ, Ward 4, Ho Chi Minh City 72711, Vietnam",
      bestView: {
        center: {
          latitude: 10.762679,
          longitude: 106.682586,
          altitude: 0,
          altitudeReference: -1,
        },
        width: 0.010484886838071361,
        height: 0.007725435141352932,
        crs: {
          id: "LatLon",
          bounds: [90, 180, -90, -180],
        },
        bounds: [
          10.766541717570677, 106.68782844341904, 10.758816282429324,
          106.67734355658096,
        ],
      },
    },
  } as unknown as Directions);

  return (
    <BingMapProvider>
      <VStack spacing="0">
        <AppHeader />
        <Box w="full" h="calc(60vh - 40px)">
          <BingMap />
          <BingMapDirections directions={directions} />
        </Box>
        <Box w="full" h="40%" p="16px">
          <AutoCompleteAddress
            disabled={!!bookingData}
            id="autoSuggestFrom"
            mb="8px"
            onChange={(from) => setDirections((prev) => ({ ...prev, from }))}
          />
          <AutoCompleteAddress
            disabled={!!bookingData}
            id="autoSuggestTo"
            mb="8px"
            onChange={(to) => setDirections((prev) => ({ ...prev, to }))}
          />
          <BookingButton directions={directions} />
        </Box>
      </VStack>
    </BingMapProvider>
  );
}

export default User;
