import { Card, styled } from "@mui/material";

const CustomCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,
}));

export default CustomCard;
