import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API } from "../../../Api/Api";
import { errorHandler } from "../../../Utils/ErrorHandler";
import { Table, Button, Card, Container } from "react-bootstrap";
import { Loading } from "../../../Components/Loading/Loading";

export const CartDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState(null);

  useEffect(() => {
    async function getCartDetails() {
      try {
        setLoading(true);
        const response = await API.get(`/carts/${id}`);
        setCart(response.data);
      } catch (error) {
        errorHandler(error);
      } finally {
        setLoading(false);
      }
    }

    getCartDetails();
  }, [id]);

  if (loading) return <Loading />;
  if (!cart) return null;

  return (
    <Container>
      <Card className="mb-4">
        <Card.Body>
          <h4>Cart Details</h4>
          <p>
            <strong>Cart ID:</strong> {cart.id}
          </p>
          <p>
            <strong>User ID:</strong> {cart.userId}
          </p>
          <p>
            <strong>Total:</strong> {cart.total.toFixed(2)} $
          </p>
        </Card.Body>
      </Card>

      <Table className="text-center">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Product Title</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody>
          {cart.products.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.quantity}</td>
              <td>{item.total.toFixed(2)} $</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};
