import React, { useEffect, useState } from "react";
import { errorHandler } from "../../Utils/ErrorHandler";
import { API } from "../../Api/Api";
import { Loading } from "../Loading/Loading";
import { ProductsPreview } from "../ProductsPreview/ProductsPreview";

export const SortedProducts = ({ sortBy, order }) => {
  const [loading, setloading] = useState(false);
  const [products, setProducts] = useState([]);
  const [showAll, setShowAll] = useState(false);
  useEffect(
    function () {
      async function getSortedProducts() {
        try {
          setloading(true);
          const response = await API.get(
            `/products?sortBy=${sortBy}&order=${order}`,
          );
          const { products } = response.data;
          showAll ? setProducts(products) : setProducts(products.slice(0, 4));
        } catch (error) {
          console.log(error);
          errorHandler(error);
        } finally {
          setloading(false);
        }
      }
      getSortedProducts();
    },
    [sortBy, order, showAll],
  );
  if (loading) return <Loading />;
  return (
    <div>
      <ProductsPreview products={products} />
      {!showAll ? (
        <button className="btn btn-link" onClick={() => setShowAll(true)}>
          See more
        </button>
      ) : (
        <button className="btn btn-link" onClick={() => setShowAll(false)}>
          See less
        </button>
      )}
    </div>
  );
};
