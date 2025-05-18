import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NotFoundTemplate() {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="60vh"
      textAlign="center"
    >
      <Typography variant="h2" color="error" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" gutterBottom>
        Página no encontrada
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={2}>
        Lo sentimos, la página que buscas no existe.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/system/home")}
      >
        Ir al inicio
      </Button>
    </Box>
  );
}
