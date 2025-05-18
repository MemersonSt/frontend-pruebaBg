import { useNavigate, useParams } from "react-router-dom";
import useProducts from "../../../hooks/useProducts";
import {
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
import { useEffect } from "react";
// import VisuallyHiddenInput from "../../ui/VisuallyHiddenInput";
import { InputTextFieldRequired } from "../../ui/CustomInput";
import CustomCard from "../../ui/CustomCard";
import ContentMenu from "../../ui/ContentMenu";

export default function ProductsForm() {
  const {
    isSaved,
    form: product,
    setForm: setProduct,
    clearForm,
    getProduct,
    saveProduct,
    updateProduct,
  } = useProducts();
  const { codigo } = useParams();
  const navigate = useNavigate();
  // const [image, setImage] = useState<File | null>(null);
  // const [preview, setPreview] = useState<string | null>(null);

  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files[0]) {
  //     setImage(e.target.files[0]);
  //     setPreview(URL.createObjectURL(e.target.files[0]));
  //   }
  // };
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

  useEffect(() => {
    if (!codigo) return;
    getProduct(Number(codigo));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
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
            >
              Guardar
            </Button>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 2.5 }}>
            <Button fullWidth variant="contained" onClick={() => clearForm()}>
              Nuevo
            </Button>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 2.5 }}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => navigate("/system/products")}
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
            <InputTextFieldRequired
              size="small"
              label="Cod. Producto"
              name="codeProducts"
              value={product.codeProducts}
              onChange={handleChange}
              fullWidth
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
                />
              </Grid2>
            </>
          )}
        </Grid2>
      </CustomCard>

      {/* <Card sx={{ mt: 2 }}>
        <Grid2 container spacing={2} padding={2}>
          <Grid2 size={{ xs: 12 }}>
            <Divider>
              <Chip label="Imagen Producto" />
            </Divider>
          </Grid2>
          <Grid2 size={{ xs: 12 }} display={"flex"} justifyContent={"center"}>
            {preview && (
              <img
                src={preview}
                alt="Vista previa"
                style={{ marginTop: 16, maxWidth: "100%", maxHeight: 200 }}
              />
            )}
          </Grid2>
          <Grid2 size={{ xs: 12 }} display={"flex"} justifyContent={"center"}>
            <Grid2 size={{ xs: 12, sm: 6, md: 2 }}>
              <Button
                fullWidth
                component="label"
                role={undefined}
                variant="outlined"
                tabIndex={-1}
                // startIcon={<CloudUploadIcon />}
              >
                Cargar Imagen
                <VisuallyHiddenInput
                  type="file"
                  accept={"image/jpeg, image/png"}
                  onChange={handleImageChange}
                />
              </Button>
            </Grid2>
          </Grid2>
        </Grid2>
      </Card> */}
    </>
  );
}
