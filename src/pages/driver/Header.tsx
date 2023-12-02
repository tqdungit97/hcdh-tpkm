import { Text, Switch, useDisclosure } from "@chakra-ui/react";
import { AppHeader } from "../../components";

export function Header() {
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: false });

  return (
    <AppHeader>
      <Text fontSize="small" fontWeight="bold">
        {isOpen ? "Online" : "Offline"}
      </Text>
      <Switch checked={isOpen} onChange={onToggle} />
    </AppHeader>
  );
}

export default Header;
