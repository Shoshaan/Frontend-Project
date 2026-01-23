import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Styles/App.scss";
import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import { Home } from "./Components/Home/Home";
import { Products } from "./Components/Products/Products";
import { Cart } from "./Components/Cart/Cart";
import { Navbar } from "./Components/Navbar/Navbar";
import { ProductDetails } from "./Components/ProductDetails/ProductDetails";
import { Login } from "./Pages/Login";
import { Register } from "./Pages/Register";

export default function App() {
  return (
    <div>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/products" Component={Products} />
          <Route path="/cart" Component={Cart} />
          <Route path="products/:id" Component={ProductDetails} />
          <Route path="/login" Component={Login} />
          <Route path="/register" Component={Register} />
        </Routes>
      </Container>
    </div>
  );
}
