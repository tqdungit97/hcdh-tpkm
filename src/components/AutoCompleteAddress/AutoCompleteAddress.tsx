import { ComponentProps, useRef } from "react";
import {
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { GoogleMap, StandaloneSearchBox } from "@react-google-maps/api";

import IconLocation from "../../assets/icon-location.png";
import Styles from "./AutoCompleteAddress.module.css";

type AutoCompleteAddressProps = {
  defaultPlace?: google.maps.places.PlaceResult;
  onChange?: (placeResult?: google.maps.places.PlaceResult) => void;
} & Omit<ComponentProps<typeof InputGroup>, "onChange">;

export function AutoCompleteAddress({
  defaultPlace,
  onChange,
  ...props
}: AutoCompleteAddressProps) {
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

  return (
    <GoogleMap mapContainerClassName={Styles.autoCompletePlacesContainer}>
      <StandaloneSearchBox
        ref={ref}
        onPlacesChanged={onPlacesChanged}
        onLoad={() => {
          ref.current?.containerElement.current?.classList.add(
            Styles.inputContainer
          );
        }}
      >
        <InputGroup w="full" {...props} bg="transparent">
          <InputLeftElement>
            <Image src={IconLocation} alt="icon location" w="16px" />
          </InputLeftElement>
          <Input
            bg="white"
            placeholder="Bạn muốn đi đâu ?"
            ref={inputRef}
            defaultValue={defaultPlace?.formatted_address}
          />
          <InputRightElement onClick={onClearPlace}>
            <CloseIcon w="8px" />
          </InputRightElement>
        </InputGroup>
      </StandaloneSearchBox>
    </GoogleMap>
  );
}

export default AutoCompleteAddress;
