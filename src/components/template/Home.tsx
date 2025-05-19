import { Card, CardContent, Grid2, Typography } from "@mui/material";
import useProducts from "../../hooks/useProducts";
import useAuth from "../../hooks/useAuth";
import Transition from "../ui/Transition";

export default function HomeTemplate() {
  const { products } = useProducts();
  const { user } = useAuth();

  return (
    <Transition>
      <h1>Bienvenido {user?.name}</h1>
      <p>Estos son los productos disponibles:</p>
      <Grid2 container spacing={2}>
        {products.map((product) => (
          <Grid2 key={product.code} size={{ xs: 6, md: 3 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Presentación: {product.presentation}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Categoría: {product.category}
                </Typography>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </Transition>
  );
}
