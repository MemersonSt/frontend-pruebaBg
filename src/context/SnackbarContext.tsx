import { createContext, useState } from "react";
import type { AlertColor } from "@mui/material";

const SnackbarContext = createContext<{
  open: boolean;
  message: string;
  severity: AlertColor;
  showMessage: (msg: string, severity?: AlertColor) => void;
  handleClose: () => void;
}>(
  {
    open: false,
    message: "",
    severity: "info",
    showMessage: () => {},
    handleClose: () => {},
  }
);

function SnackbarProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<AlertColor>("info");

  const showMessage = (msg: string, sev: AlertColor = "info") => {
    setMessage(msg);
    setSeverity(sev);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <SnackbarContext.Provider value={{ open, message, severity, showMessage, handleClose }}>
      {children}
    </SnackbarContext.Provider>
  );
}

export { SnackbarContext, SnackbarProvider };
