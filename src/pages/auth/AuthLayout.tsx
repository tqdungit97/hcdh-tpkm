import {
  Box,
  Center,
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from "@chakra-ui/react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Login, Register } from ".";
import { useAuthenticated } from "../../hooks";

import AppIcon from "../../assets/taxi.png";

const MapPathToTab = {
  0: "/auth/login",
  1: "/auth/register",
};

export function AuthLayout() {
  const auth = useAuthenticated();
  const location = useLocation();
  const navigate = useNavigate();

  if (auth) {
    return <Navigate to="/" />;
  }

  const tabIndex = location.pathname === "/auth/register" ? 1 : 0;
  return (
    <VStack spacing={0}>
      <Center h="30vh" w="full" bg="green.300">
        <Image src={AppIcon} maxWidth="120px" />
      </Center>
      <Box h="70vh" w="full">
        <Tabs
          marginTop="-24px"
          marginX="16px"
          borderRadius="8px"
          bg="white"
          boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px"
          defaultIndex={tabIndex}
          onChange={(tabIndex) =>
            navigate(MapPathToTab?.[`${tabIndex as keyof typeof MapPathToTab}`])
          }
        >
          <TabList>
            <Tab flex={1} border="none">
              Đăng nhập
            </Tab>
            <Tab flex={1} border="none">
              Đăng ký
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Register />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </VStack>
  );
}
