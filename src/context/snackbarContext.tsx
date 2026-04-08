import { createContext, FC, PropsWithChildren, useContext, useState } from "react";

export type SnackBarMessageType = "ERROR" | "SUCESS";

interface NotifyMessageParams {
  message: string;
  messageType: SnackBarMessageType;
}

export type SnackBarContextType = {
  message: string | null;
  type: SnackBarMessageType | null;
  notify: (params: NotifyMessageParams) => void;
};

const SnackBarContext = createContext({} as SnackBarContextType);

export const SnackBarContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [message, setMessage] = useState<string | null>(null);
  const [type, setType] = useState<SnackBarMessageType | null>(null);

  const notify = ({ message, messageType }: NotifyMessageParams) => {
    setMessage(message);
    setType(messageType);
    setTimeout(() => {
      setMessage(null);
      setType(null);
    }, 3000);
  };

  return (
    <SnackBarContext.Provider value={{ message, type, notify }}>
      {children}
    </SnackBarContext.Provider>
  );
};

export const useSnackbarContext = () => {
  const context = useContext(SnackBarContext);

  return context;
};
