import { NavigationContainer } from "@react-navigation/native";
import { useCallback, useState } from "react";

import { PublicRoutes } from "./PublicRoutes";
import { PrivateRoutes } from "./PrivateRoutes";

const NavigationRoutes = () => {
  const [user, setUser] = useState(undefined);

  const Routes = useCallback(() => {
    if (!user) {
      return <PublicRoutes />;
    } else {
      return <PrivateRoutes />;
    }
  }, [user]);

  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
};

export default NavigationRoutes;
