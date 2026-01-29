import { Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./AdminSideNav.scss";

export const AdminSideNav = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-sidenav">
      <h5 className="mb-4 text-center">Dashboard</h5>

      <Nav className="flex-column gap-2">
        <Nav.Link onClick={() => navigate("/dashboard/products")}>
          Products
        </Nav.Link>

        <Nav.Link onClick={() => navigate("/dashboard/users")}>Users</Nav.Link>

        <Nav.Link onClick={() => navigate("/dashboard/carts")}>Carts</Nav.Link>
      </Nav>
    </div>
  );
};
