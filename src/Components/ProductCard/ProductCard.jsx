import React from "react";
import { Button, Card } from "react-bootstrap";

export const ProductCard = ({ product }) => {
  return (
    <Card className="h-100">
      <Card.Img src={product.thumbnail} />
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <div>{product.price}</div>
      </Card.Body>
      <Card.Footer>
        <Button>Add to Cart</Button>
      </Card.Footer>
    </Card>
  );
};
