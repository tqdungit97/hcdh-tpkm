import { Button } from "@chakra-ui/react";
import { useApplicationStore } from "../../store/useApplicationStore";

export function Home() {
  const { clearTokens } = useApplicationStore();
  return (
    <>
      <h1>Home</h1>
      <Button onClick={clearTokens}>Logout</Button>
    </>
  );
}

export default Home;
