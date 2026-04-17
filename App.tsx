import NavigationRoutes from "@/routes";

import { Snackbar } from "@/components/Snackbar";

import { AuthContextProvider } from "@/context/authContext";
import { SnackBarContextProvider } from "@/context/snackbarContext";

import "@/styles/global.css";
import { BottomSheetProvider } from "@/context/bottomsheetContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { TransactionContextProvider } from "@/context/transactionContext";

export default function App() {
  return (
    <GestureHandlerRootView className="flex-1">
      <SnackBarContextProvider>
        <AuthContextProvider>
          <TransactionContextProvider>
            <BottomSheetProvider>
              <NavigationRoutes />
              <Snackbar />
            </BottomSheetProvider>
          </TransactionContextProvider>
        </AuthContextProvider>
      </SnackBarContextProvider>
    </GestureHandlerRootView>
  );
}
