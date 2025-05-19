import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function UnauthorizedTemplate() {
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
      <Typography variant="h2" color="warning.main" gutterBottom>
        401
      </Typography>
      <Typography variant="h5" gutterBottom>
        No autorizado
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={2}>
        No tienes permisos para acceder a esta página.
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate("/")}>
        Volver
      </Button>
    </Box>
  );
}
