import React from "react";
import { Navbar as BNavbar, Button, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LogoutButton } from "../LogoutButton/LogoutButton";
import { useSelector } from "react-redux";
import { SearchBar } from "../SearchBar/SearchBar";

export const Navbar = () => {
  const { isLoggedIn } = useSelector((store) => store.auth);
  return (
    <BNavbar expand="md">
      <Container>
        <BNavbar.Brand>
          <span>LOGO</span>
        </BNavbar.Brand>
        <BNavbar.Toggle></BNavbar.Toggle>
        <BNavbar.Collapse>
          <Nav>
            <Nav.Item>
              <Nav.Link to="/" as={Link}>
                Home
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link to="/products" as={Link}>
                Products
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link to="/cart" as={Link}>
                Cart
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link to="/search" as={Link}>
                Search
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <div className="d-flex gap-2 ms-auto">
            {isLoggedIn ? (
              <LogoutButton />
            ) : (
              <>
                <Button as={Link} to="/login">
                  Login
                </Button>
                <Button as={Link} to="/register">
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </BNavbar.Collapse>
      </Container>
    </BNavbar>
  );
};
