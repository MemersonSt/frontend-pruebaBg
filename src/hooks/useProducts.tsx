import { useEffect, useState } from "react";
import type { IProducts } from "../interface/IProducts";
import productsServices from "../services/products.services";
import useLoading from "./useLoading";
import useSnackbar from "./useSnackbar";
import logService from "../services/config/logServices";
import type { IProductsPrice } from "../interface/IProductsPrice";

export default function useProducts() {
  const { startLoading, stopLoading } = useLoading();
  const { showMessage } = useSnackbar();
  const [isSaved, setIsSaved] = useState(false);
  const [products, setProducts] = useState<IProducts[]>([]);
  const [form, setForm] = useState<IProducts>({
    code: 0,
    codeProducts: "",
    name: "",
    barcode: "",
    presentation: "",
    category: "",
    isService: false,
    isLote: false,
    stock: 0,
    lote: "",
    dateLote: null,
    price: 0,
    isActive: true,
    state: "",
    date: new Date().toISOString(),
    user: 1,
    createdAt: null,
    updatedAt: null,
    deletedAt: null,
    prices: [],
  });

  const clearForm = () => {
    setIsSaved(false);
    setForm({
      code: 0,
      codeProducts: "",
      name: "",
      barcode: "",
      presentation: "",
      category: "",
      isService: false,
      isLote: false,
      stock: 0,
      lote: "",
      dateLote: null,
      price: 0,
      isActive: true,
      state: "",
      date: new Date().toISOString(),
      user: 1,
      createdAt: null,
      updatedAt: null,
      deletedAt: null,
      prices: [],
    });
  };

  const isFormValid = () => {
    if (!form.codeProducts) {
      alert("El campo codigo es obligatorio");
      return false;
    }
    if (!form.name) {
      alert("El campo nombre es obligatorio");

      return false;
    }
    if (form.isActive === false && form.stock < 0) {
      alert("El campo stock no puede ser menor a 0");

      return false;
    }
    if (form.isLote && !form.lote) {
      alert("El campo lote es obligatorio");

      return false;
    }
    if (form.isLote && !form.dateLote) {
      alert("El campo fecha de lote es obligatorio");

      return false;
    }
    if (form.price < 0) {
      alert("El campo precio no puede ser menor a 0");

      return false;
    }

    return true;
  };

  const saveProduct = async () => {
    if (!isFormValid()) return;
    startLoading();
    await productsServices
      .saveProduct(form)
      .then(() => {
        showMessage("Producto guardado correctamente", "success");
        setIsSaved(true);
      })
      .catch((err) => {
        showMessage("Error al guardar el producto", "error");
        logService.error("Error al guardar el producto", err);
      })
      .finally(() => {
        stopLoading();
      });
  };

  const updateProduct = async () => {
    if (!isFormValid()) return;
    startLoading();
    await productsServices
      .updateProduct(form)
      .then(() => {
        showMessage("Producto actualizado correctamente", "success");
      })
      .catch((err) => {
        alert("Error al actualizar el producto");
        logService.error("Error al actualizar el producto", err);
      })
      .finally(() => {
        stopLoading();
      });
  };

  const deleteProduct = (codigo: number) => {
    if (window.confirm("¿Está seguro de eliminar el producto?")) {
      startLoading();
      productsServices
        .deleteProduct(codigo)
        .then(() => {
          showMessage("Producto eliminado correctamente", "success");
          setProducts((prev) => prev.filter((p) => p.code !== codigo));
          setIsSaved(true);
        })
        .catch((err) => {
          showMessage("Error al eliminar el producto", "error");
          logService.error("Error al eliminar un producto", err);
        })
        .finally(() => {
          stopLoading();
        });
    }
  };

  const deleteProductPrice = async (codigo: number) => {
    if (window.confirm("¿Está seguro de eliminar el precio?")) {
      startLoading();
      await productsServices
        .deleteProductPrice(codigo)
        .then(() => {
          showMessage("Precio eliminado correctamente", "success");
          setForm((prev) => ({
            ...prev,
            prices: prev.prices?.filter((p) => p.id !== codigo) || [],
          }));
        })
        .catch((err) => {
          showMessage("Error al eliminar el precio", "error");
          logService.error("Error al eliminar un precio", err);
        })
        .finally(() => {
          stopLoading();
        });
    }
  };

  const getProduct = async (codigo: number) => {
    await productsServices
      .getProduct(codigo)
      .then((res: IProducts) => {
        // setForm(res);
        setForm({
          code: res.code,
          codeProducts: res.codeProducts,
          name: res.name,
          barcode: res.barcode,
          presentation: res.presentation,
          category: res.category,
          isService: res.isService,
          isLote: res.isLote,
          stock: 0,
          lote: "",
          dateLote: null,
          price: 0,
          isActive: res.isActive,
          state: "",
          date: new Date().toISOString(),
          user: 1,
          createdAt: null,
          updatedAt: null,
          deletedAt: null,
          prices:
            res.prices?.map((p: IProductsPrice) => ({
              id: p.id,
              codeProducts: p.codeProducts,
              price: p.price,
              stock: p.stock,
              lote: p.lote,
              dateLote: p.dateLote?.split("T")[0],
            })) || [],
        });
        setIsSaved(false);
      })
      .catch((err) => {
        showMessage("Error al obtener el producto", "error");
        logService.error("Error al obtener el producto", err);
      });
  };

  const getAllProducts = async () => {
    startLoading();
    try {
      const res = await productsServices.listProducts();
      console.log(res);
      setProducts(res);
    } catch (err) {
      showMessage("Error al obtener los productos", "error");
      logService.error("Error al obtener todos los productos", err);
    } finally {
      stopLoading();
    }
  };

  useEffect(() => {
    getAllProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isSaved,
    products,
    setProducts,
    form,
    setForm,
    clearForm,
    saveProduct,
    updateProduct,
    deleteProduct,
    deleteProductPrice,
    getProduct,
  };
}
