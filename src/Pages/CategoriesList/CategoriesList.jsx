import React from "react";
import { Row, Col, Card, Container } from "react-bootstrap";
import "./CategoriesList.scss"
import { useNavigate } from "react-router-dom";

export const CategoriesList = ({ categories }) => {
    const navigate=useNavigate()
  return (
    <Container className="my-4">
      <h1 className="mb-3">Categories</h1>
      <Row className="g-3">
        {categories.map((category) => (
          <Col md={3} sm={6} xs={12} key={category.slug}>
            <Card className="text-center h-100 category-card"
            onClick={()=>navigate(`/products/category/${category.slug}`)}>
              <Card.Body className="d-flex align-items-center justify-content-center">
                <h5 className="mb-0">{category.name}</h5>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};
