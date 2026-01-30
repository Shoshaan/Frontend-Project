import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Button, Row, Col, Container } from "react-bootstrap";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../../Store/Slices/CartSlice";

export const Cart = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((store) => store.cart);

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  if (items.length === 0) {
    return (
      <Container className="py-3">
        <h4>Your cart is empty</h4>
      </Container>
    );
  }

  return (
    <Container className="py-3">
      <h3 className="mb-4">Your Cart</h3>
      {items.map(({ product, quantity }) => (
        <Card key={product.id} className="mb-3">
          <Row className="g-0 align-items-center">
            <Col md={3}>
              <Card.Img
                src={product.thumbnail}
                alt={product.title}
                className="h-100"
              />
            </Col>
            <Col md={9}>
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>Price: ${product.price}</Card.Text>
                <div className="d-flex align-items-center gap-2 mb-3">
                  <Button
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          productId: product.id,
                          quantity: quantity - 1,
                        }),
                      )
                    }
                    disabled={quantity === 1}
                  >
                    -
                  </Button>
                  <span style={{ minWidth: "30px", textAlign: "center" }}>
                    {quantity}
                  </span>
                  <Button
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          productId: product.id,
                          quantity: quantity + 1,
                        }),
                      )
                    }
                  >
                    +
                  </Button>
                </div>
                <Button onClick={() => dispatch(removeFromCart(product.id))}>
                  Remove
                </Button>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      ))}
      <hr />
      <div className="d-flex justify-content-between align-items-center">
        <h4>Total: ${total}</h4>
        <Button onClick={() => dispatch(clearCart())}>Clear Cart</Button>
      </div>
    </Container>
  );
};
