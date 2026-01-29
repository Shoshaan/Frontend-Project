import { useEffect, useState } from "react";
import { API } from "../../../Api/Api";
import { errorHandler } from "../../../Utils/ErrorHandler";
import { Container, Table } from "react-bootstrap";
import { Loading } from "../../../Components/Loading/Loading";

export const UsersList = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

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
            </tr>
          ))}
        </tbody>
      </Table>

      {users.length === 0 && <p className="text-center">No users found</p>}
    </Container>
  );
};
