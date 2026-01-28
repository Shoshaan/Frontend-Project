import React, { useState } from "react";
import { useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { errorHandler } from "../../Utils/ErrorHandler";
import { API } from "../../Api/Api";
import { ProductsPreview } from "../ProductsPreview/ProductsPreview";
import { useNavigate } from "react-router-dom";

export const SearchBar = () => {
  const searchRef = useRef();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  async function handleSearch(ev) {
    ev.preventDefault();
    try {
      const response = await API.get(
        `/products/search?q=${searchRef.current.value}`,
      );
      console.log(response.data);
      const { products } = response.data;
      setProducts(products);
    } catch (error) {
      errorHandler(error);
    }
  }
  return (
    <div>
      <Form onSubmit={handleSearch} className="d-flex">
        <Form.Control
          placeholder="Search"
          ref={searchRef}
          onFocus={() => navigate("/search")}
        />
        <Button type="submit">Search</Button>
      </Form>
      {products.length == 0 ? (
        <p>No Results</p>
      ) : (
        <ProductsPreview products={products} />
      )}
    </div>
  );
};
