import { Card, CardContent, Grid2, Typography } from "@mui/material";
import useProducts from "../../hooks/useProducts";
import useAuth from "../../hooks/useAuth";
import Transition from "../ui/Transition";
import { useMemo } from "react";
// import type { IProductsPrice } from "../../interface/IProductsPrice";

export default function HomeTemplate() {
  const { products } = useProducts();
  const { user } = useAuth();

  const productsList = useMemo(() => {
    const data = products.map((m) => {
      let totalPrice: number = 0;
      m.prices?.forEach((f) => {
        totalPrice = totalPrice + f.price;
      });

      const prom = totalPrice / (m.prices?.length ?? 0);

      return {
        ...m,
        price: prom,
      };
    });

    return data;
  }, [products]);

  return (
    <Transition>
      <h1>Bienvenido {user?.name}</h1>
      <p>Estos son los productos disponibles:</p>
      <Grid2 container spacing={2}>
        {productsList.map((product) => (
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
                <Typography variant="body2" color="text.secondary">
                  Precio: {product.price}
                </Typography>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </Transition>
  );
}
