import React from "react";
import { useEffect, useState } from "react";
import { API } from "../../Api/Api";
import { errorHandler } from "../../Utils/ErrorHandler";
import { Loading } from "../../Components/Loading/Loading";
import { ProductsPreview } from "../../Components/ProductsPreview/ProductsPreview";
import { Pagination } from "react-bootstrap";

export const Products = () => {
  const [loading, setloading] = useState(false);
  const [products, setProducts] = useState([]);
  const limit = 12;
  const [skip, setSkip] = useState(0);
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  function calSkip(page) {
    setSkip((page - 1) * limit);
    setCurrentPage(page);
  }

  useEffect(
    function () {
      async function getProducts() {
        try {
          setloading(true);
          const response = await API.get(
            `/products?limit=${limit}&skip=${skip}`,
          );
          const { products, total } = response.data;
          setProducts(products);
          setPages(Math.ceil(total / limit));
        } catch (error) {
          console.log(error);
          errorHandler(error);
        } finally {
          setloading(false);
        }
      }
      getProducts();
    },
    [skip],
  );
  if (loading) return <Loading />;
  return (
    <div>
      <ProductsPreview products={products} />
      <Pagination className="justify-content-center flex-wrap">
        {currentPage != 1 && <Pagination.First onClick={() => calSkip(1)} />}
        <Pagination.Prev
          onClick={() => calSkip(currentPage - 1)}
          disabled={currentPage == 1}
        />
        {new Array(pages).fill(1).map((item, i) => (
          <Pagination.Item
            onClick={() => calSkip(i + 1)}
            active={currentPage == i + 1}
          >
            {i + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => calSkip(currentPage + 1)}
          disabled={currentPage == pages}
        />
        {currentPage != pages && (
          <Pagination.Last onClick={() => calSkip(pages)} />
        )}
      </Pagination>
    </div>
  );
};
