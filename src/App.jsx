import { useEffect, useState } from "react";
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
import { SearchPage } from "./Pages/SearchPage/SearchPage";
import { CartsList } from "./Pages/Dashboard/Carts/CartsList";
import { CartDetails } from "./Pages/Dashboard/Carts/CartDetails";
import { UsersList } from "./Pages/Dashboard/Users/UsersList";
import { useSelector } from "react-redux";
import { CartEdit } from "./Pages/Dashboard/Carts/CartEdit";
import { UserEdit } from "./Pages/Dashboard/Users/UserEdit";
import { UserDetails } from "./Pages/Dashboard/Users/UserDetails";
import { AProductsList } from "./Pages/Dashboard/Products/AProductsList";
import { AProductDetails } from "./Pages/Dashboard/Products/AProductDetails";
import { AProductEdit } from "./Pages/Dashboard/Products/AProductEdit";
import { CategoriesList } from "./Pages/CategoriesList/CategoriesList";
import { CategoryProducts } from "./Pages/CategoryProducts/CategoryProducts";

export default function App() {
  const [loading, setloading] = useState(true);
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((store) => store.auth);
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
      <div className="flex-grow-1">
        <Navbar />
        <Toaster position="top-right" />
        <Container fluid className="p-0">
          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/products" Component={Products} />
            <Route path="/cart" Component={Cart} />
            <Route path="products/:id" Component={ProductDetails} />
            <Route path="/search" Component={SearchPage} />
            <Route path="/login" Component={Login} />
            <Route path="/register" Component={Register} />
            <Route
              path="/dashboard/carts"
              Component={isLoggedIn ? CartsList : Login}
            />
            <Route
              path="/dashboard/carts/:id"
              Component={isLoggedIn ? CartDetails : Login}
            />
            <Route
              path="/dashboard/carts/:id/edit"
              Component={isLoggedIn ? CartEdit : Login}
            />
            <Route
              path="/dashboard/users"
              Component={isLoggedIn ? UsersList : Login}
            />
            <Route
              path="/dashboard/users/:id"
              Component={isLoggedIn ? UserDetails : Login}
            />
            <Route
              path="/dashboard/users/:id/edit"
              Component={isLoggedIn ? UserEdit : Login}
            />
            <Route
              path="/dashboard/products"
              Component={isLoggedIn ? AProductsList : Login}
            />
            <Route
              path="/dashboard/products/:id"
              Component={isLoggedIn ? AProductDetails : Login}
            />
            <Route
              path="/dashboard/products/:id/edit"
              Component={isLoggedIn ? AProductEdit : Login}
            />
            <Route path="/categories" Component={CategoriesList} />
            <Route
              path="/products/category/:slug"
              Component={CategoryProducts}
            />
          </Routes>
        </Container>
      </div>
  );
}
