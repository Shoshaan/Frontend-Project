import { NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const AdminNav = () => {
  const navigate = useNavigate();

  return (
    <NavDropdown title="Dashboard" id="admin-nav-dropdown">
      <NavDropdown.Item onClick={() => navigate("/dashboard/products")}>
        Products
      </NavDropdown.Item>

      <NavDropdown.Item onClick={() => navigate("/dashboard/users")}>
        Users
      </NavDropdown.Item>

      <NavDropdown.Item onClick={() => navigate("/dashboard/carts")}>
        Carts
      </NavDropdown.Item>
    </NavDropdown>
  );
};
