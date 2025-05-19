import type { IProducts } from "../interface/IProducts";
import services from "./config/services";

const listProducts = () => {
  const url = '/Products';
  return services.get(url).then((res) => res.data);
};

const getProduct = (id: number) => {
  const url = `/Products/bycode/${id}`;
  return services.get(url).then((res) => res.data);
};

const saveProduct = (data: IProducts) => {
  const url = '/Products';
  return services.post(url, data).then((res) => res.data);
};

const updateProduct = (data: IProducts) => {
  const url = `/Products`;
  return services.put(url, data).then((res) => res.data);
};

const deleteProduct = (id: number) => {
  const url = `/Products/delete/${id}`;
  return services.delete(url).then((res) => res.data);
};

const deleteProductPrice = (id: number) => {
  const url = `/Products/deleteprice/${id}`;
  return services.delete(url).then((res) => res.data);
}

const productsServices = {
  listProducts,
  getProduct,
  saveProduct,
  updateProduct,
  deleteProduct,
  deleteProductPrice,
};

export default productsServices;

