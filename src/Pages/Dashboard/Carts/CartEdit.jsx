import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API } from "../../../Api/Api";
import { errorHandler } from "../../../Utils/ErrorHandler";
import { Table, Button, Card, Container } from "react-bootstrap";
import { Loading } from "../../../Components/Loading/Loading";
import toast from "react-hot-toast";

export const CartEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState(null);

  useEffect(() => {
    async function getCart() {
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
    getCart();
  }, [id]);

  function handleQuantityChange(productId, newQuantity) {
    if (newQuantity < 1) return;
    setCart((prev) => ({
      ...prev,
      products: prev.products.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item,
      ),
    }));
  }

  async function handleSave() {
    try {
      setLoading(true);
      const payload = {
        merge: true,
        products: cart.products.map((item) => ({
          id: item.id,
          quantity: item.quantity,
        })),
      };
      const response = await API.put(`/carts/${id}`, payload);
      console.log(response.data);
      toast.success("Cart updated successfully");
      navigate("/dashboard/carts");
    } catch (error) {
      errorHandler(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <Loading />;
  if (!cart) return null;

  return (
    <Container>
      <Card>
        <Card.Body>
          <h4>Edit Cart #{cart.id}</h4>
          <p>User ID: {cart.userId}</p>
          <p>Total: {cart.total.toFixed(2)} $</p>

          <Table>
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Product Unit Price</th>
                <th>Quantity</th>
                <th>Product Total</th>
              </tr>
            </thead>

            <tbody>
              {cart.products.map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>{item.price} $</td>
                  <td style={{ width: "150px" }}>
                    <div className="d-flex align-items-center gap-2">
                      <Button
                        size="sm"
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                      >
                        -
                      </Button>

                      <span>{item.quantity}</span>

                      <Button
                        size="sm"
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </Button>
                    </div>
                  </td>
                  <td>{item.total.toFixed(2)} $</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="d-flex justify-content-end gap-2">
            <Button onClick={() => navigate("/dashboard/carts")}>Cancel</Button>

            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};
