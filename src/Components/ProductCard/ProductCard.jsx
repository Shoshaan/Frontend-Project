import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../Store/Slices/CartSlice";
import toast from "react-hot-toast";

export const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  function handleAddToCart() {
    dispatch(addToCart(product));
    toast.success("Added to cart");
  }
  return (
    <Card className="h-100">
      <Card.Img src={product.thumbnail} />
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <p>⭐ Rating: {product?.rating}</p>
        <div>{product.price}</div>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-around">
        <Button as={Link} to={`/products/${product.id}`}>
          Learn more
        </Button>
        <Button onClick={handleAddToCart}>Add to Cart</Button>
      </Card.Footer>
    </Card>
  );
};
