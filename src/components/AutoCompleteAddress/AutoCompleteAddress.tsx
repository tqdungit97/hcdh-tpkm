/* eslint-disable react-hooks/exhaustive-deps */
import { ComponentProps, useCallback, useEffect, useRef } from "react";
import {
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { GoogleMap, StandaloneSearchBox } from "@react-google-maps/api";
import { useGeolocation } from "../../hooks";

import IconLocation from "../../assets/icon-location.png";
import Styles from "./AutoCompleteAddress.module.css";
import { getPlaceFromCoordinates } from "../../api/googleMap";

type AutoCompleteAddressProps = {
  useCurrentPosition?: boolean;
  onChange?: (placeResult?: google.maps.places.PlaceResult) => void;
} & Omit<ComponentProps<typeof InputGroup>, "onChange">;

export function AutoCompleteAddress({
  useCurrentPosition,
  onChange,
  ...props
}: AutoCompleteAddressProps) {
  const geoLocation = useGeolocation();

  const inputRef = useRef<HTMLInputElement>(null);
  const ref = useRef<StandaloneSearchBox>(null);

  const onPlacesChanged = () => {
    if (ref.current) {
      const places = ref?.current?.state?.searchBox?.getPlaces();
      if (places !== undefined) {
        onChange?.(places[0]);
      }
    }
  };

  const onClearPlace = () => {
    onChange?.(undefined);
    inputRef.current!.value = "";
  };

  const onInitialPlace = useCallback(
    async (geoLocation: GeolocationPosition) => {
      try {
        const place = await getPlaceFromCoordinates(geoLocation).then(
          (resp) => resp.results[0]
        );
        onChange?.(place);
        inputRef.current!.value = place.formatted_address;
      } catch (error) {
        console.log(error);
      }
    },
    [],
  );

  useEffect(() => {
    if (useCurrentPosition && geoLocation?.coords) {
      onInitialPlace(geoLocation);
    }
  }, [geoLocation, useCurrentPosition]);

  return (
    <GoogleMap mapContainerClassName={Styles.autoCompletePlacesContainer}>
      <StandaloneSearchBox ref={ref} onPlacesChanged={onPlacesChanged}>
        <InputGroup w="100%" {...props} bg="transparent">
          <InputLeftElement>
            <Image src={IconLocation} alt="icon location" w="16px" />
          </InputLeftElement>
          <Input bg="white" placeholder="Bạn muốn đi đâu ?" ref={inputRef} />
          <InputRightElement onClick={onClearPlace}>
            <CloseIcon w="8px" />
          </InputRightElement>
        </InputGroup>
      </StandaloneSearchBox>
    </GoogleMap>
  );
}

export default AutoCompleteAddress;
