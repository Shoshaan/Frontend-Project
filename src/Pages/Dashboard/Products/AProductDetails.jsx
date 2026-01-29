import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API } from "../../../Api/Api";
import { errorHandler } from "../../../Utils/ErrorHandler";
import { Card, Button, Container } from "react-bootstrap";
import { Loading } from "../../../Components/Loading/Loading";

export const AProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function getProduct() {
      try {
        setLoading(true);
        const response = await API.get(`/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        errorHandler(error);
      } finally {
        setLoading(false);
      }
    }

    getProduct();
  }, [id]);

  if (loading) return <Loading />;
  if (!product) return null;

  return (
    <Container className="d-flex justify-content-center">
      <Card className="text-center" style={{ width: "350px" }}>
        <Card.Img
          variant="top"
          src={product.thumbnail}
          style={{
            objectFit: "cover",
          }}
        />

        <Card.Body>
          <h5>{product.title}</h5>

          <p className="text-muted">{product.description}</p>

          <p>
            <strong>Price:</strong> ${product.price}
          </p>

          <p>
            <strong>Category:</strong> {product.category}
          </p>

          <p>
            <strong>Rating:</strong> ⭐ {product.rating}
          </p>

          <div className="d-flex justify-content-between mt-3">
            <Button
              variant="secondary"
              onClick={() => navigate("/dashboard/products")}
            >
              Back
            </Button>

            <Button
              variant="primary"
              onClick={() => navigate(`/dashboard/products/${product.id}/edit`)}
            >
              Edit
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};
