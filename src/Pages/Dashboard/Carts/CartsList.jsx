import { useEffect, useState } from "react";
import { API } from "../../../Api/Api";
import { errorHandler } from "../../../Utils/ErrorHandler";
import { Table, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../../Components/Loading/Loading";

export const CartsList = () => {
  const [loading, setLoading] = useState(false);
  const [carts, setCarts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getCarts() {
      try {
        setLoading(true);
        const response = await API.get("/carts");
        setCarts(response.data.carts);
      } catch (error) {
        errorHandler(error);
      } finally {
        setLoading(false);
      }
    }
    getCarts();
  }, []);

  if (loading) return <Loading />;

  return (
    <Container>
      <h3 className="mb-4">All Carts</h3>

      <Table>
        <thead>
          <tr>
            <th>Cart ID</th>
            <th>User ID</th>
            <th>Total Products</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {carts.map((cart) => (
            <tr key={cart.id}>
              <td>{cart.id}</td>
              <td>{cart.userId}</td>
              <td>{cart.products.length}</td>
              <td>
                <Button
                  size="sm"
                  onClick={() => navigate(`/dashboard/carts/${cart.id}`)}
                >
                  View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {carts.length === 0 && <p className="text-center">No carts found</p>}
    </Container>
  );
};
