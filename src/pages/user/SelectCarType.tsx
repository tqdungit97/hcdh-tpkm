import {
  Box,
  BoxProps,
  Flex,
  Image,
  Text,
  useRadio,
  useRadioGroup,
  UseRadioProps,
} from '@chakra-ui/react';

import Car4 from '../../assets/sedan-car.svg';
import Car5 from '../../assets/minivan-car.svg';
import Car7 from '../../assets/car-limousine.svg';
import { VehicleType } from '../../types/booking';

function RadioCard({
  radioProps,
  ...boxProps
}: { radioProps: UseRadioProps } & BoxProps) {
  const { getInputProps, getRadioProps } = useRadio(radioProps);

  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: 'green.50',
          borderColor: 'green.300',
        }}
        p="8px"
        {...boxProps}
      ></Box>
    </Box>
  );
}

type SelectCarTypeProps = {
  vehicleType: VehicleType;
  setVehicleType: (vehicleType: VehicleType) => void;
}
export function SelectCarType({ vehicleType, setVehicleType }: SelectCarTypeProps) {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'framework',
    value: vehicleType,
    onChange: (value) => setVehicleType(value as VehicleType),
  });

  const group = getRootProps();

  return (
    <Box {...group}>
      <RadioCard
        radioProps={getRadioProps({ value: VehicleType.FOUR_SEAT })}
        marginBottom="8px"
      >
        <Flex alignItems="center">
          <Image src={Car4} w="50px" h="50px" flexShrink="0" mr="16px" />
          <Text fontWeight="bold">Xe 4 chỗ</Text>
        </Flex>
      </RadioCard>
      <RadioCard
        radioProps={getRadioProps({ value: VehicleType.FIVE_SEAT })}
        marginBottom="8px"
      >
        <Flex alignItems="center">
          <Image src={Car5} w="50px" h="50px" flexShrink="0" mr="16px" />
          <Text fontWeight="bold">Xe 5 chỗ</Text>
        </Flex>
      </RadioCard>
      <RadioCard
        radioProps={getRadioProps({ value: VehicleType.SEVEN_SEAT })}
        marginBottom="16px"
      >
        <Flex alignItems="center">
          <Image src={Car7} w="50px" h="50px" flexShrink="0" mr="16px" />
          <Text fontWeight="bold">Xe 7 chỗ</Text>
        </Flex>
      </RadioCard>
    </Box>
  );
}
