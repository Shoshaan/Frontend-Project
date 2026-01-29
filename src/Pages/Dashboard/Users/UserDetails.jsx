import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API } from "../../../Api/Api";
import { errorHandler } from "../../../Utils/ErrorHandler";
import { Card, Container } from "react-bootstrap";
import { Loading } from "../../../Components/Loading/Loading";

export const UserDetails = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

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

  if (loading) return <Loading />;
  if (!user) return null;

  return (
    <Container>
      <Card className="mx-auto" style={{ width: "fit-content" }}>
        <Card.Img
          src={user.image}
          className="mx-auto"
          style={{ width: "150px", height: "150px" }}
        />
        <Card.Body>
          <p>
            <strong>ID:</strong> {user.id}
          </p>

          <p>
            <strong>Username:</strong> {user.username}
          </p>

          <p>
            <strong>Email:</strong> {user.email}
          </p>

          <p>
            <strong>First Name:</strong> {user.firstName}
          </p>

          <p>
            <strong>Last Name:</strong> {user.lastName}
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
};
