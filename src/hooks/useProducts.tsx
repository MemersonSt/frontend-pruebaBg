import { useEffect, useState } from "react";
import type { IProducts } from "../interface/IProducts";
import productsServices from "../services/products.services";

export default function useProducts() {
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

    await productsServices
      .saveProduct(form)
      .then(() => {
        alert("Producto guardado correctamente");
        setIsSaved(true);
      })
      .catch((err) => {
        alert("Error al guardar el producto");
        console.log(err);
      });
  };

  const updateProduct = async () => {
    if (!isFormValid()) return;

    await productsServices
      .updateProduct(form)
      .then(() => {
        alert("Producto actualizado correctamente");
      })
      .catch((err) => {
        alert("Error al actualizar el producto");
        console.log(err);
      });
  };

  const deleteProduct = (codigo: number) => {
    if (window.confirm("¿Está seguro de eliminar el producto?")) {
      productsServices
        .deleteProduct(codigo)
        .then(() => {
          alert("Producto eliminado correctamente");
          setIsSaved(true);
        })
        .catch((err) => {
          alert("Error al eliminar el producto");
          console.log(err);
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
          prices: res.prices,
        });
        setIsSaved(false);
      })
      .catch((err) => {
        alert("Error al obtener el producto");
        console.log(err);
      });
  };

  const getAllProducts = async () => {
    const res = await productsServices.listProducts();
    console.log(res);
    setProducts(res);
  };

  useEffect(() => {
    getAllProducts();
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
    getProduct,
  };
}
