import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Styles/App.scss";
import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import { Home } from "./Pages/Home/Home";
import { Products } from "./Pages/Products/Products";
import { Cart } from "./Pages/Cart/Cart";
import { Navbar } from "./Components/Navbar/Navbar";
import { ProductDetails } from "./Pages/ProductDetails/ProductDetails";
import { Login } from "./Pages/Login/Login";
import { Register } from "./Pages/Register/Register";
import { API } from "./Api/Api";
import { Toaster } from "react-hot-toast";
import { clearUser, setUser } from "./Store/Slices/AuthSlice";
import { useDispatch } from "react-redux";
import { Loading } from "./Components/Loading/Loading";

export default function App() {
  const [loading, setloading] = useState(true);
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
      setloading(false);
    }
    getMe();
  }, []);
  if (loading) return <Loading />;
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
