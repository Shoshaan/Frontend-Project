import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API } from "../../../Api/Api";
import { errorHandler } from "../../../Utils/ErrorHandler";
import { Card, Button, Form, Container } from "react-bootstrap";
import { Loading } from "../../../Components/Loading/Loading";
import toast from "react-hot-toast";

export const AProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

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

  function handleChange(ev) {
    setProduct({
      ...product,
      [ev.target.name]: ev.target.value,
    });
  }

  async function handleSave() {
    try {
      const payload = {
        title: product.title,
        description: product.description,
        price: product.price,
        category: product.category,
      };

      const response = await API.put(`/products/${id}`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setProduct(response.data);
      toast.success("Product updated successfully");
      setIsEdit(false);
    } catch (error) {
      errorHandler(error);
    }
  }

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
          {!isEdit ? (
            <>
              <h5>{product.title}</h5>

              <p className="text-muted">{product.description}</p>

              <p>
                <strong>Price:</strong> ${product.price}
              </p>

              <p>
                <strong>Category:</strong> {product.category}
              </p>

              <div className="d-flex justify-content-between mt-3">
                <Button
                  variant="secondary"
                  onClick={() => navigate("/dashboard/products")}
                >
                  Back
                </Button>

                <Button variant="primary" onClick={() => setIsEdit(true)}>
                  Edit
                </Button>
              </div>
            </>
          ) : (
            <>
              <Form.Group className="mb-2">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  name="title"
                  value={product.title}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                />
              </Form.Group>

              <div className="d-flex justify-content-between">
                <Button variant="secondary" onClick={() => setIsEdit(false)}>
                  Cancel
                </Button>

                <Button variant="success" onClick={handleSave}>
                  Save
                </Button>
              </div>
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};
