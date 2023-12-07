import { Text, Switch } from "@chakra-ui/react";
import { AppHeader } from "../../components";
import { useOnlineStatus } from "../../hooks/useOnlineStatus";

export function Header() {
  const { isOnline, isLoading, toggleOnlineStatus } = useOnlineStatus();

  return (
    <AppHeader>
      <Text fontSize="small" fontWeight="bold">
        {isOnline ? "Online" : "Offline"}
      </Text>
      <Switch isDisabled={isLoading} isChecked={isOnline} onChange={toggleOnlineStatus} />
    </AppHeader>
  );
}

export default Header;
