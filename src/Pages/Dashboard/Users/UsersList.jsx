import { useEffect, useState } from "react";
import { API } from "../../../Api/Api";
import { errorHandler } from "../../../Utils/ErrorHandler";
import { Container, Table } from "react-bootstrap";
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
      <h3 className="mb-4">All Users</h3>

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
                <FaEye
                  className="me-3 fs-4"
                  onClick={() => navigate(`/dashboard/users/${user.id}`)}
                />
                <HiPencilAlt
                  className="me-3 fs-4"
                  onClick={() => navigate(`/dashboard/users/${user.id}/edit`)}
                />
                <MdDeleteForever
                  className="me-3 fs-4"
                  onClick={() => handleDelete(user.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {users.length === 0 && <p className="text-center">No users found</p>}
    </Container>
  );
};
