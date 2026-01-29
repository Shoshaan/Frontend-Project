import { useEffect, useState } from "react";
import { API } from "../../../Api/Api";
import { errorHandler } from "../../../Utils/ErrorHandler";
import { Container, Table, Button, Card, Form } from "react-bootstrap";
import { Loading } from "../../../Components/Loading/Loading";
import { FaEye } from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";
import { MdDeleteForever } from "react-icons/md";
import { useParams, useNavigate } from "react-router-dom";

export const UsersList = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const [isAdd, setIsAdd] = useState(false);

  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    image: "",
  });
  function handleAddChange(ev) {
    setNewUser({
      ...newUser,
      [ev.target.name]: ev.target.value,
    });
  }
  async function handleAddUser() {
    try {
      const payload = {
        username: newUser.username,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        image: newUser.image,
      };

      const response = await API.post("/users/add", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setUsers((prev) => [response.data, ...prev]);

      setIsAdd(false);
      setNewUser({
        username: "",
        email: "",
        firstName: "",
        lastName: "",
        image: "",
      });

      toast.success("User added successfully");
    } catch (error) {
      errorHandler(error);
    }
  }
  useEffect(() => {
    async function getUsers() {
      try {
        setLoading(true);
        const response = await API.get("/users");
        setUsers(response.data.users);
      } catch (error) {
        errorHandler(error);
      } finally {
        setLoading(false);
      }
    }
    getUsers();
  }, []);
  async function handleDelete(userId) {
    try {
      await API.delete(`/users/${userId}`);
      const modifiedUsers = (prev) => prev.filter((user) => user.id !== userId);
      setUsers(modifiedUsers);
    } catch (error) {
      errorHandler(error);
    }
  }
  if (loading) return <Loading />;

  return (
    <Container>
      <div className="d-flex justify-content-end mb-3">
        <Button onClick={() => setIsAdd(true)}>Add User</Button>
      </div>
      {isAdd && (
        <Card className="mb-4 text-center mx-auto" style={{ width: "400px" }}>
          <Card.Body>
            <h5>Add User</h5>

            {newUser.image && (
              <img
                src={newUser.image}
                alt="preview"
                className="img-fluid mb-2"
                style={{ maxHeight: "150px", objectFit: "contain" }}
              />
            )}

            <Form.Group className="mb-2">
              <Form.Label>Username</Form.Label>
              <Form.Control
                name="username"
                value={newUser.username}
                onChange={handleAddChange}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={newUser.email}
                onChange={handleAddChange}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                name="firstName"
                value={newUser.firstName}
                onChange={handleAddChange}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                name="lastName"
                value={newUser.lastName}
                onChange={handleAddChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                name="image"
                value={newUser.image}
                onChange={handleAddChange}
                placeholder="https://example.com/user.jpg"
              />
            </Form.Group>

            <div className="d-flex justify-content-between">
              <Button variant="secondary" onClick={() => setIsAdd(false)}>
                Cancel
              </Button>
              <Button variant="success" onClick={handleAddUser}>
                Save
              </Button>
            </div>
          </Card.Body>
        </Card>
      )}
      <h3 className="mb-4">All Users</h3>
      <div className="table-responsive">
        <Table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>User Image</th>
              <th>Username</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                  <img src={user.image} />
                </td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <div className="d-flex flex-column gap-4">
                    <FaEye
                      className="me-3 fs-4"
                      onClick={() => navigate(`/dashboard/users/${user.id}`)}
                    />
                    <HiPencilAlt
                      className="me-3 fs-4"
                      onClick={() =>
                        navigate(`/dashboard/users/${user.id}/edit`)
                      }
                    />
                    <MdDeleteForever
                      className="me-3 fs-4"
                      onClick={() => handleDelete(user.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {users.length === 0 && <p className="text-center">No users found</p>}
    </Container>
  );
};
