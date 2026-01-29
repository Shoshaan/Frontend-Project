import React from "react";
import { Col, Row } from "react-bootstrap";
import { ProductCard } from "../ProductCard/ProductCard";

export const ProductsPreview = ({ products = [] }) => {
  return (
    <Row className="g-3">
      {products.map((product) => (
        <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
          <ProductCard product={product} />
        </Col>
      ))}
    </Row>
  );
};
