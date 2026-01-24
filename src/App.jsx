import React, { useEffect } from "react";
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
import { API } from "./Api/Api";
import { Toaster } from "react-hot-toast";
import { errorHandler } from "./Utils/ErrorHandler";
import { clearUser, setUser } from "./Store/Slices/AuthSlice";
import { useDispatch } from "react-redux";

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    async function getMe() {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        try {
          const response = await API.get("/auth/me", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          const payload = response.data;
          dispatch(setUser(payload));
          console.log(response.data);
        } catch (error) {
          dispatch(clearUser());
          localStorage.removeItem("accessToken");
        }
      }
    }
    getMe();
  }, []);
  return (
    <div>
      <Navbar />
      <Toaster position="top-right" />
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
