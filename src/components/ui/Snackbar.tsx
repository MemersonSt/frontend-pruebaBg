import { Snackbar, Alert } from "@mui/material";
import useSnackbar from "../../hooks/useSnackbar";

export default function CustomSnackbar() {
  const { open, message, severity, handleClose } = useSnackbar();
  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
