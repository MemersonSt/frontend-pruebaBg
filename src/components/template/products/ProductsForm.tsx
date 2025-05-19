import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useProducts from "../../../hooks/useProducts";
import {
  Autocomplete,
  Button,
  // Card,
  Checkbox,
  Chip,
  Divider,
  FormControlLabel,
  Grid2,
  TextField,
  Typography,
} from "@mui/material";
import { InputTextFieldRequired } from "../../ui/CustomInput";
import CustomCard from "../../ui/CustomCard";
import ContentMenu from "../../ui/ContentMenu";
import { IoSaveSharp } from "react-icons/io5";
import { FaFile } from "react-icons/fa";
import { FaCircleArrowLeft } from "react-icons/fa6";
import Transition from "../../ui/Transition";
import type { IProducts } from "../../../interface/IProducts";

export default function ProductsForm() {
  const {
    isSaved,
    products,
    form: product,
    setForm: setProduct,
    clearForm,
    getProduct,
    saveProduct,
    updateProduct,
    deleteProductPrice,
  } = useProducts();
  const { codigo } = useParams();
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSave = () => {
    if (codigo) {
      updateProduct();
    } else {
      saveProduct();
    }
  };

  const handleSelectProduct = (value: string) => {
    setProduct({ ...product, codeProducts: value });
    const found = products.find((p: IProducts) => p.codeProducts === value);
    if (found) {
      setProduct((prev) => ({
        ...prev,
        code: found.code,
        name: found.name,
        presentation: found.presentation,
        category: found.category,
        barcode: found.barcode,
        isActive: found.isActive,
        isService: found.isService,
        isLote: found.isLote,
        prices: found.prices,
      }));
    }
  };

  useEffect(() => {
    if (!codigo) return;
    getProduct(Number(codigo));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Transition>
      <Grid2 size={{ xs: 12 }} display={"flex"} justifyContent={"center"}>
        <Typography variant="h4">Ingreso de Productos</Typography>
      </Grid2>

      <ContentMenu>
        <Grid2
          container
          spacing={2}
          padding={2}
          display={"flex"}
          justifyContent={"center"}
        >
          <Grid2 size={{ xs: 12, sm: 6, md: 2.5 }}>
            <Button
              fullWidth
              disabled={isSaved}
              variant="contained"
              onClick={() => handleSave()}
              startIcon={<IoSaveSharp />}
            >
              Guardar
            </Button>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 2.5 }}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => clearForm()}
              startIcon={<FaFile />}
            >
              Nuevo
            </Button>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 2.5 }}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => navigate("/system/products")}
              startIcon={<FaCircleArrowLeft />}
            >
              Regresar
            </Button>
          </Grid2>
        </Grid2>
      </ContentMenu>

      <CustomCard>
        <Grid2 container spacing={2} padding={2}>
          <Grid2 size={{ xs: 12 }}>
            <Divider>
              <Chip label="Datos del Producto" />
            </Divider>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 2 }}>
            <Autocomplete
              freeSolo
              options={products.map((p: IProducts) => p.codeProducts)}
              value={product.codeProducts}
              onInputChange={(_, newInputValue) =>
                handleSelectProduct(newInputValue)
              }
              renderInput={(params) => (
                <InputTextFieldRequired
                  {...params}
                  size="small"
                  label="Cod. Producto"
                  name="codeProducts"
                  fullWidth
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <InputTextFieldRequired
              size="small"
              label="Nombre"
              name="name"
              value={product.name}
              onChange={handleChange}
              fullWidth
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <TextField
              size="small"
              label="Presentación"
              name="presentation"
              value={product.presentation}
              onChange={handleChange}
              fullWidth
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <TextField
              size="small"
              label="Categoria"
              name="category"
              value={product.category}
              onChange={handleChange}
              fullWidth
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <TextField
              size="small"
              label="Código de Barras"
              name="barcode"
              value={product.barcode}
              onChange={handleChange}
              fullWidth
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 2 }}>
            <TextField
              size="small"
              label="Precio"
              name="price"
              value={product.price}
              onChange={handleChange}
              fullWidth
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 2 }}>
            <TextField
              size="small"
              label="Stock"
              name="stock"
              value={product.stock}
              onChange={handleChange}
              fullWidth
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={product.isActive}
                  onChange={(e) =>
                    setProduct({ ...product, isActive: e.target.checked })
                  }
                />
              }
              label="Activo"
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={product.isService}
                  onChange={(e) =>
                    setProduct({ ...product, isService: e.target.checked })
                  }
                />
              }
              label="Es de Servicio"
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={product.isLote}
                  onChange={(e) =>
                    setProduct({ ...product, isLote: e.target.checked })
                  }
                />
              }
              label="Es Lote"
            />
          </Grid2>
          {product.isLote && (
            <>
              <Grid2 size={{ xs: 12, sm: 6, md: 2 }}>
                <TextField
                  size="small"
                  label="Lote"
                  name="lote"
                  value={product.lote}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 6, md: 2 }}>
                <TextField
                  size="small"
                  label="Fecha"
                  name="dateLote"
                  type="date"
                  value={product.dateLote}
                  onChange={handleChange}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid2>
            </>
          )}
        </Grid2>
      </CustomCard>

      {codigo && (
        <CustomCard sx={{ marginTop: 2 }}>
          {product.prices?.map((p, i) => (
            <Grid2
              key={i}
              container
              spacing={2}
              padding={2}
            >
              <Grid2 size={{ xs: 12 }}>
                <Divider>
                  <Chip label={`Precio ${i + 1}`} />
                </Divider>
              </Grid2>
              <Grid2 container spacing={2} display={"flex"} justifyContent={"center"}>
                <Grid2 size={{ xs: 12, sm: 2 }}>
                  <Button
                   fullWidth
                    variant="outlined"
                    color="error"
                    onClick={() => {
                      const newPrices = [...(product.prices || [])];
                      newPrices.splice(i, 1);
                      setProduct({ ...product, prices: newPrices });
                      deleteProductPrice(p.id);
                    }}
                  >
                    Eliminar
                  </Button>
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 6, md: 2 }}>
                  <TextField
                    size="small"
                    label="Precio"
                    name="price"
                    value={p.price}
                    onChange={(e) => {
                      const newPrices = [...(product.prices || [])];
                      newPrices[i].price = Number(e.target.value);
                      setProduct({ ...product, prices: newPrices });
                    }}
                    fullWidth
                  />
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 6, md: 2 }}>
                  <TextField
                    size="small"
                    label="Stock"
                    name="stock"
                    value={p.stock}
                    onChange={(e) => {
                      const newPrices = [...(product.prices || [])];
                      newPrices[i].stock = Number(e.target.value);
                      setProduct({ ...product, prices: newPrices });
                    }}
                    fullWidth
                  />
                </Grid2>
                {product.isLote && (
                  <>
                    <Grid2 size={{ xs: 12, sm: 6, md: 2 }}>
                      <TextField
                        size="small"
                        label="Lote"
                        name="lote"
                        value={p.lote}
                        onChange={(e) => {
                          const newPrices = [...(product.prices || [])];
                          newPrices[i].lote = e.target.value;
                          setProduct({ ...product, prices: newPrices });
                        }}
                        fullWidth
                      />
                    </Grid2>
                    <Grid2 size={{ xs: 12, sm: 6, md: 2 }}>
                      <TextField
                        size="small"
                        label="Fecha"
                        name="dateLote"
                        type="date"
                        value={p.dateLote}
                        onChange={(e) => {
                          const newPrices = [...(product.prices || [])];
                          newPrices[i].dateLote = e.target.value;
                          setProduct({ ...product, prices: newPrices });
                        }}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid2>
                  </>
                )}
              </Grid2>
            </Grid2>
          ))}
        </CustomCard>
      )}
    </Transition>
  );
}
