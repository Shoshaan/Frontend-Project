import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../../Api/Api";
import { errorHandler } from "../../../Utils/ErrorHandler";
import {
  Card,
  Row,
  Col,
  Container,
  Pagination,
  Button,
  Form,
} from "react-bootstrap";
import { Loading } from "../../../Components/Loading/Loading";
import { FaEye } from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";
import { MdDeleteForever } from "react-icons/md";

export const AProductsList = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const limit = 12;
  const [skip, setSkip] = useState(0);
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAdd, setIsAdd] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    thumbnail: "",
  });
  function handleAddChange(ev) {
    setNewProduct({
      ...newProduct,
      [ev.target.name]: ev.target.value,
    });
  }

  async function handleAddProduct() {
    try {
      const payload = {
        title: newProduct.title,
        description: newProduct.description,
        price: Number(newProduct.price),
        category: newProduct.category,
        thumbnail: newProduct.thumbnail,
      };

      const response = await API.post("/products/add", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setProducts((prev) => [response.data, ...prev]);

      setIsAdd(false);
      setNewProduct({
        title: "",
        description: "",
        price: "",
        category: "",
      });
    } catch (error) {
      errorHandler(error);
    }
  }
  function calSkip(page) {
    setSkip((page - 1) * limit);
    setCurrentPage(page);
  }

  useEffect(() => {
    async function getProducts() {
      try {
        setLoading(true);
        const response = await API.get(`/products?limit=${limit}&skip=${skip}`);
        const { products, total } = response.data;
        setProducts(products);
        setPages(Math.ceil(total / limit));
      } catch (error) {
        errorHandler(error);
      } finally {
        setLoading(false);
      }
    }

    getProducts();
  }, [skip]);

  async function handleDelete(id) {
    try {
      await API.delete(`/products/${id}`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      errorHandler(error);
    }
  }

  if (loading) return <Loading />;

  return (
    <Container className="my-3">
      <div className="d-flex justify-content-end mb-3">
        <Button onClick={() => setIsAdd(true)}>Add Product</Button>
      </div>
      <Row className="g-3">
        {isAdd && (
          <Card className="mb-4 text-center mx-auto" style={{ width: "350px" }}>
            <Card.Body>
              <h5>Add Product</h5>

              <Form.Group className="mb-2">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  name="title"
                  value={newProduct.title}
                  onChange={handleAddChange}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Image URL</Form.Label>
                <Form.Control
                  name="thumbnail"
                  value={newProduct.thumbnail}
                  onChange={handleAddChange}
                  placeholder="https://example.com/image.jpg"
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  name="description"
                  value={newProduct.description}
                  onChange={handleAddChange}
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={newProduct.price}
                  onChange={handleAddChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  name="category"
                  value={newProduct.category}
                  onChange={handleAddChange}
                />
              </Form.Group>

              <div className="d-flex justify-content-between">
                <Button variant="secondary" onClick={() => setIsAdd(false)}>
                  Cancel
                </Button>

                <Button variant="success" onClick={handleAddProduct}>
                  Save
                </Button>
              </div>
            </Card.Body>
          </Card>
        )}
        {products.map((product, index) => (
          <Col md={4} key={index}>
            <Card className="h-100 text-center">
              <Card.Img
                variant="top"
                src={product.thumbnail}
                style={{
                  objectFit: "cover",
                }}
              />

              <Card.Body className="d-flex flex-column justify-content-between">
                <div>
                  <h6>{product.title}</h6>
                  <p className="text-muted mb-1">${product.price}</p>
                </div>

                <div className="d-flex justify-content-between align-items-center mt-3">
                  <FaEye
                    className="fs-1"
                    onClick={() =>
                      navigate(`/dashboard/products/${product.id}`)
                    }
                  />

                  <HiPencilAlt
                    className="fs-1"
                    onClick={() =>
                      navigate(`/dashboard/products/${product.id}/edit`)
                    }
                  />
                  <MdDeleteForever
                    className="fs-1"
                    variant="outline-danger"
                    onClick={() => handleDelete(product.id)}
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Pagination className="justify-content-center flex-wrap my-3">
        {currentPage != 1 && <Pagination.First onClick={() => calSkip(1)} />}
        <Pagination.Prev
          onClick={() => calSkip(currentPage - 1)}
          disabled={currentPage == 1}
        />
        {new Array(pages).fill(1).map((item, i) => (
          <Pagination.Item
            key={i}
            onClick={() => calSkip(i + 1)}
            active={currentPage == i + 1}
          >
            {i + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => calSkip(currentPage + 1)}
          disabled={currentPage == pages}
        />
        {currentPage != pages && (
          <Pagination.Last onClick={() => calSkip(pages)} />
        )}
      </Pagination>
    </Container>
  );
};
