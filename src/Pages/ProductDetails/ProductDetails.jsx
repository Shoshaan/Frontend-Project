import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API } from "../../Api/Api";
import { errorHandler } from "../../Utils/ErrorHandler";
import { Card, Row, Col, Button } from "react-bootstrap";
import { Loading } from "../../Components/Loading/Loading";
export const ProductDetails = () => {
  const [loading, setloading] = useState(false);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  useEffect(
    function () {
      async function getSingleProduct() {
        try {
          setloading(true);
          const response = await API.get(`/products/${id}`);
          console.log(response.data);
          const product = response.data;
          setProduct(product);
        } catch (error) {
          console.log(error);
          errorHandler(error);
        } finally {
          setloading(false);
        }
      }
      getSingleProduct();
    },
    [id],
  );
  if (loading) return <Loading />;
  return (
    <div>
      <Card>
        <Row>
          <Col md={5}>
            <Card.Img
              src={product?.thumbnail}
              alt={product?.title}
              className="h-100 w-100"
            />
          </Col>
          <Col md={7}>
            <Card.Body>
              <Card.Title>{product?.title}</Card.Title>

              <Card.Text>{product?.description}</Card.Text>

              <h4>${product?.price}</h4>

              <p>⭐ Rating: {product?.rating}</p>
              <Button>Add to Cart</Button>
              <Button>Back</Button>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </div>
  );
};
