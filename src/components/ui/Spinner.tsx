import { Box, CircularProgress, Modal } from "@mui/material";
import useLoading from "../../hooks/useLoading";

export default function Spinner() {
  const { isLoading, stopLoading } = useLoading();
  if (!isLoading) return null;
  return (
    <Modal
      open={isLoading}
      onClose={stopLoading}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        mx="auto"
        style={{
          display: "flex",
          position: "absolute",
          margin: "auto",
          backgroundColor: "black",
          opacity: "50%",
          width: "100vw",
          height: "100vh",
          zIndex: "auto",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box mx="auto">
          <CircularProgress />
        </Box>
      </Box>
    </Modal>
  );
}
