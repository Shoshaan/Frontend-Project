import React from "react";
import { ProductsPreview } from "../../Components/ProductsPreview/ProductsPreview";
import { SearchBar } from "../../Components/SearchBar/SearchBar";
import { Container } from "react-bootstrap";

export const SearchPage = () => {
  return (
    <Container className="my-4">
      <SearchBar/>
    </Container>
  );
};
