import { useEffect, useState } from "react";
import { API } from "../../../Api/Api";
import { errorHandler } from "../../../Utils/ErrorHandler";
import {
  Container,
  Table,
  Button,
  Card,
  Form,
  Pagination,
} from "react-bootstrap";
import { FaEye } from "react-icons/fa";
import { Loading } from "../../../Components/Loading/Loading";
import { HiPencilAlt } from "react-icons/hi";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "./UserList.scss";

export const UsersList = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [isAdd, setIsAdd] = useState(false);
  const limit = 12;
  const [skip, setSkip] = useState(0);
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    image: "",
  });
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const displayedUsers = isSearching ? searchedUsers : users;

  function handleSearchFocus() {
    setIsSearching(true);
    setSearchedUsers([]);
  }

  function handleSearchChange(ev) {
    setSearch(ev.target.value);
  }

  async function handleSearch() {
    try {
      if (!search.trim()) return;

      setLoading(true);

      const response = await API.get(`/users/search?q=${search}`);
      setSearchedUsers(response.data.users);
    } catch (error) {
      errorHandler(error);
    } finally {
      setLoading(false);
    }
  }

  function handleSearchBlur() {
    if (!search.trim()) {
      setIsSearching(false);
      setSearch("");
    }
  }

  function calSkip(page) {
    setSkip((page - 1) * limit);
    setCurrentPage(page);
  }

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
  useEffect(
    function () {
      async function getUsers() {
        try {
          setLoading(true);
          const response = await API.get(`/users?limit=${limit}&skip=${skip}`);
          const { users, total } = response.data;
          setUsers(users);
          setPages(Math.ceil(total / limit));
        } catch (error) {
          console.log(error);
          errorHandler(error);
        } finally {
          setLoading(false);
        }
      }
      getUsers();
    },
    [skip],
  );

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
    <Container className="my-5">
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
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Form.Control
          type="text"
          placeholder="Search"
          style={{ maxWidth: "300px" }}
          value={search}
          onFocus={handleSearchFocus}
          onChange={handleSearchChange}
          onBlur={handleSearchBlur}
        />

        <Button variant="primary" onClick={handleSearch}>
          Search
        </Button>
      </div>
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
            {displayedUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                  <img src={user.image} />
                </td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <div className="fs-4 d-flex justify-content-around">
                    <FaEye
                      onClick={() => navigate(`/dashboard/users/${user.id}`)}
                      style={{ cursor: "pointer" }}
                    />
                    <HiPencilAlt
                      onClick={() =>
                        navigate(`/dashboard/users/${user.id}/edit`)
                      }
                      style={{ cursor: "pointer" }}
                    />
                    <MdDeleteForever
                      onClick={() => handleDelete(user.id)}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <Pagination className="justify-content-center flex-wrap my-3">
        {currentPage != 1 && <Pagination.First onClick={() => calSkip(1)} />}
        <Pagination.Prev
          onClick={() => calSkip(currentPage - 1)}
          disabled={currentPage == 1}
        />
        {new Array(pages).fill(1).map((item, i) => (
          <Pagination.Item
            key={i}
            onClick={() => calSkip(i + 1)}
            active={currentPage == i + 1}
          >
            {i + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => calSkip(currentPage + 1)}
          disabled={currentPage == pages}
        />
        {currentPage != pages && (
          <Pagination.Last onClick={() => calSkip(pages)} />
        )}
      </Pagination>

      {users.length === 0 && <p className="text-center">No users found</p>}
    </Container>
  );
};
