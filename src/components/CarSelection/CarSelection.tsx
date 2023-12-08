import { Radio, RadioGroup } from "@chakra-ui/react";
import { VehicleType } from "../../types/booking";

export function CarSelection() {
  return (
    <RadioGroup >
      <Radio value={VehicleType.FOUR_SEAT}>Xe 4 chỗ</Radio>
      <Radio value={VehicleType.FIVE_SEAT}>Xe 5 chỗ</Radio>
      <Radio value={VehicleType.SEVEN_SEAT}>Xe 7 chỗ</Radio>
    </RadioGroup>
  );
}
