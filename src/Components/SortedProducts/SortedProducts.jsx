import React, { useEffect, useState } from "react";
import { errorHandler } from "../../Utils/ErrorHandler";
import { API } from "../../Api/Api";
import { Loading } from "../Loading/Loading";
import { ProductsPreview } from "../ProductsPreview/ProductsPreview";

export const SortedProducts = ({ sortBy, order }) => {
  const [loading, setloading] = useState(false);
  const [products, setProducts] = useState([]);
  useEffect(
    function () {
      async function getSortedProducts() {
        try {
          setloading(true);
          const response = await API.get(
            `/products?sortBy=${sortBy}&order=${order}`,
          );
          const { products } = response.data;
          setProducts(products);
        } catch (error) {
          console.log(error);
          errorHandler(error);
        } finally {
          setloading(false);
        }
      }
      getSortedProducts();
    },
    [sortBy, order],
  );
  if (loading) return <Loading />;
  return (
    <div>
      <ProductsPreview products={products} />
    </div>
  );
};
