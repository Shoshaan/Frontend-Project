import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API } from "../../../Api/Api";
import { errorHandler } from "../../../Utils/ErrorHandler";
import { Card, Button, Form, Container } from "react-bootstrap";
import { Loading } from "../../../Components/Loading/Loading";
import toast from "react-hot-toast";

export const UserEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    async function getUser() {
      try {
        setLoading(true);
        const response = await API.get(`/users/${id}`);
        setUser(response.data);
      } catch (error) {
        errorHandler(error);
      } finally {
        setLoading(false);
      }
    }

    getUser();
  }, [id]);

  function handleChange(ev) {
    setUser({
      ...user,
      [ev.target.name]: ev.target.value,
    });
  }

  async function handleSave() {
    try {
      const payload = {
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      };
      const response = await API.put(`/users/${id}`, payload, {
        headers: { "Content-Type": "application/json" },
      });
      setUser(response.data);
      toast.success("User updated successfully");
      setIsEdit(false);
    } catch (error) {
      errorHandler(error);
    }
  }

  if (loading) return <Loading />;
  if (!user) return null;

  return (
    <Container>
      <Card className="text-center mx-auto" style={{ width: "fit-content" }}>
        <Card.Img
          src={user.image}
          className="mx-auto mt-3"
          style={{
            width: "150px",
            height: "150px",
            objectFit: "cover",
            borderRadius: "50%",
          }}
        />

        <Card.Body className="d-flex flex-column align-items-center gap-2">
          <p>
            <strong>ID:</strong> {user.id}
          </p>

          {isEdit ? (
            <Form.Control
              name="username"
              value={user.username}
              onChange={handleChange}
            />
          ) : (
            <p>
              <strong>Username:</strong> {user.username}
            </p>
          )}

          {isEdit ? (
            <Form.Control
              name="email"
              value={user.email}
              onChange={handleChange}
            />
          ) : (
            <p>
              <strong>Email:</strong> {user.email}
            </p>
          )}

          {isEdit ? (
            <Form.Control
              name="firstName"
              value={user.firstName}
              onChange={handleChange}
            />
          ) : (
            <p>
              <strong>First Name:</strong> {user.firstName}
            </p>
          )}

          {isEdit ? (
            <Form.Control
              name="lastName"
              value={user.lastName}
              onChange={handleChange}
            />
          ) : (
            <p>
              <strong>Last Name:</strong> {user.lastName}
            </p>
          )}

          {!isEdit ? (
            <Button onClick={() => setIsEdit(true)}>Edit</Button>
          ) : (
            <div className="d-flex gap-2">
              <Button variant="success" onClick={handleSave}>
                Save
              </Button>
              <Button variant="secondary" onClick={() => setIsEdit(false)}>
                Cancel
              </Button>
            </div>
          )}

          <Button variant="link" onClick={() => navigate("/dashboard/users")}>
            Back
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};
