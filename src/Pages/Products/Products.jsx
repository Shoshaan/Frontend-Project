import { useEffect, useState } from "react";
import { API } from "../../Api/Api";
import { errorHandler } from "../../Utils/ErrorHandler";
import { Loading } from "../../Components/Loading/Loading";
import { ProductsPreview } from "../../Components/ProductsPreview/ProductsPreview";
import { Container, Pagination } from "react-bootstrap";
import { PriceSort } from "../../Components/PriceSort/PriceSort";

export const Products = () => {
  const [loading, setloading] = useState(false);
  const [products, setProducts] = useState([]);
  const limit = 12;
  const [skip, setSkip] = useState(0);
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState(null);

  function sortAsc() {
    if (sortOrder === "asc") {
      setSortOrder(null);
    } else {
      setSkip(0);
      setCurrentPage(1);
      setSortOrder("asc");
    }
  }

  function sortDesc() {
    if (sortOrder === "desc") {
      setSortOrder(null);
    } else {
      setSkip(0);
      setCurrentPage(1);
      setSortOrder("desc");
    }
  }

  function calSkip(page) {
    setSkip((page - 1) * limit);
    setCurrentPage(page);
  }

  useEffect(
    function () {
      async function getProducts() {
        try {
          setloading(true);
          let url = `/products?limit=${limit}&skip=${skip}`;

          if (sortOrder) {
            url += `&sortBy=price&order=${sortOrder}`;
          }
          const response = await API.get(url);
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
    [skip, sortOrder],
  );
  if (loading) return <Loading />;
  return (
    <Container className="my-4">
      <div className="d-flex justify-content-end mb-3">
        <PriceSort onAsc={sortAsc} onDesc={sortDesc} active={sortOrder} />
      </div>
      <ProductsPreview products={products} />
      <Pagination className="justify-content-center flex-wrap my-3">
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
    </Container>
  );
};
