import { Flex } from "@chakra-ui/react";
import { AppDrawer } from "../AppDrawer";

type AppHeaderProps = {
    children?: React.ReactElement | React.ReactElement[];
}
export function AppHeader({ children }: AppHeaderProps) {
  return (
    <Flex
      w="full"
      h="40px"
      alignItems="center"
      justifyContent="space-between"
      px="8px"
    >
      <AppDrawer />
      {children}
    </Flex>
  );
}

export default AppHeader;
