import { Button, Grid2, IconButton, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import useProducts from "../../../hooks/useProducts";
import { useMemo } from "react";
import { fCurrency } from "../../../utils/formatNumber";
import { fDate } from "../../../utils/formatTime";
import { esES } from "@mui/x-data-grid/locales";
import { useNavigate } from "react-router-dom";
import { IoMdAddCircle } from "react-icons/io";
import Transition from "../../ui/Transition";
import { MdDeleteForever } from "react-icons/md";

type listProducts = {
  code: number;
  codeProducts?: string;
  name: string;
  presentation: string;
  category: string;
  lote: string;
  dateLote: string;
  price: number;
  stock: number;
};

export default function Products() {
  const { products, deleteProduct } = useProducts();
  const navigate = useNavigate();

  const nuevo = () => navigate("/system/formproducts");

  const handleEdit = (codigo: number | string) => {
    if (!codigo) return;
    navigate(`/system/formproducts/${codigo}`);
  };
  const formatRows = useMemo(() => {
    const list = [] as listProducts[];
    products.forEach((p) => {
      list.push({
        code: p.code,
        codeProducts: p.codeProducts,
        name: p.name,
        presentation: p.presentation,
        category: p.category,
        lote: "",
        dateLote: "",
        price: 0,
        stock: 0,
      });

      p.prices?.forEach((price) => {
        list.push({
          code: p.code,
          codeProducts: "",
          name: "",
          presentation: "",
          category: "",
          lote: price.lote,
          dateLote: price.dateLote,
          price: price.price,
          stock: price.stock,
        });
      });

      list.push({
        code: 0,
        name: "STOCK TOTAL",
        presentation: "",
        category: "",
        lote: "",
        dateLote: "",
        price: 0,
        stock: p.prices?.reduce((acc, item) => acc + item.stock, 0) || 0,
      });
    });

    return list.map((m: listProducts, i: number) => ({ ...m, id: i + 1 }));
  }, [products]);

  return (
    <Transition>
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12 }} display={"flex"} justifyContent={"center"}>
          <Typography variant="h4">Inventario</Typography>
        </Grid2>
        <Grid2 size={{ xs: 12 }} display={"flex"} justifyContent={"flex-end"}>
          <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => nuevo()}
              startIcon={<IoMdAddCircle />}
            >
              Nuevo Producto
            </Button>
          </Grid2>
        </Grid2>
        <Grid2 size={{ xs: 12 }}>
          <DataGrid
            sx={{
              height: 500,
              width: "100%",
              "& .totalFila": {
                fontWeight: "bold",
                fontSize: "1rem",
              },
              "& .isPrimary": {
                backgroundColor: "#F8BBD0",
              },
            }}
            rowHeight={28}
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            rows={formatRows}
            getRowId={(row) => row.id}
            onCellDoubleClick={(params) => handleEdit(params.row.code)}
            columns={[
              {
                field: "",
                headerName: "Eliminar",
                width: 80,
                renderCell: (params) => {
                  if (!params.row.codeProducts) {
                    return <></>;
                  }
                  return (
                    <IconButton
                      onClick={() => {
                        deleteProduct(params.row.code);
                      }}
                      color="error"
                      size="small"
                    >
                      <MdDeleteForever />
                    </IconButton>
                  );
                },
              },
              { field: "codeProducts", headerName: "Codigo", width: 150 },
              { field: "name", headerName: "Nombre", width: 300, flex: 0 },
              { field: "presentation", headerName: "Presentacion", width: 200 },
              { field: "category", headerName: "Categoria", width: 200 },
              {
                field: "lote",
                headerName: "Lote",
                width: 150,
                align: "center",
                headerAlign: "center",
                valueFormatter: (value) => (value ? value : "-"),
              },
              {
                field: "dateLote",
                headerName: "Fecha Lote",
                width: 150,
                align: "center",
                headerAlign: "center",
                valueFormatter: (value) => (value ? fDate(value) : "-"),
              },
              {
                field: "price",
                headerName: "Precio",
                width: 150,
                align: "center",
                headerAlign: "center",
                valueFormatter: (params) =>
                  params === 0 ? "-" : fCurrency(params),
              },
              {
                field: "stock",
                headerName: "Stock",
                width: 150,
                align: "center",
                headerAlign: "center",
                valueFormatter: (params) => (params === 0 ? "-" : params),
              },
            ]}
            getCellClassName={(params) => {
              if (params.row.name === "STOCK TOTAL") {
                return "totalFila";
              }
              if (params.row.name !== "") {
                return "isPrimary";
              }
              return "";
            }}
          />
        </Grid2>
      </Grid2>
    </Transition>
  );
}
