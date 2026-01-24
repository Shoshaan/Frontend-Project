import React from "react";
import { Container, Spinner } from "react-bootstrap";

export const Loading = () => {
  return (
    <Container className="vh-100 d-flex justify-content-center align-items-center">
        <Spinner animation="border"></Spinner>
    </Container>
  );
};
