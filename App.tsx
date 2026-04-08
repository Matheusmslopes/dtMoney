import NavigationRoutes from "@/routes";

import { Snackbar } from "@/components/Snackbar";

import { AuthContextProvider } from "@/context/authContext";
import { SnackBarContextProvider } from "@/context/snackbarContext";

import "@/styles/global.css";

export default function App() {
  return (
    <SnackBarContextProvider>
      <AuthContextProvider>
        <NavigationRoutes />
        <Snackbar />
      </AuthContextProvider>
    </SnackBarContextProvider>
  );
}
