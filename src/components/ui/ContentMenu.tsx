import { Stack, styled } from "@mui/material";

const ContentMenu = styled(Stack)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.2)",
}));

export default ContentMenu;