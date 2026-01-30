import { useEffect, useState } from "react";
import { API } from "../../../Api/Api";
import { errorHandler } from "../../../Utils/ErrorHandler";
import { Table, Container, Pagination } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../../Components/Loading/Loading";
import { FaEye } from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";
import { MdDeleteForever } from "react-icons/md";

export const CartsList = () => {
  const [loading, setLoading] = useState(false);
  const [carts, setCarts] = useState([]);
  const navigate = useNavigate();
  const limit = 12;
  const [skip, setSkip] = useState(0);
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  function calSkip(page) {
    setSkip((page - 1) * limit);
    setCurrentPage(page);
  }
  useEffect(
    function () {
      async function getCarts() {
        try {
          setLoading(true);
          const response = await API.get(`/carts?limit=${limit}&skip=${skip}`);
          const { carts, total } = response.data;
          setCarts(carts);
          setPages(Math.ceil(total / limit));
        } catch (error) {
          console.log(error);
          errorHandler(error);
        } finally {
          setLoading(false);
        }
      }
      getCarts();
    },
    [skip],
  );

  async function handleDelete(cartId) {
    try {
      await API.delete(`/carts/${cartId}`);
      const modifiedCarts = (prev) => prev.filter((cart) => cart.id !== cartId);
      setCarts(modifiedCarts);
    } catch (error) {
      errorHandler(error);
    }
  }

  if (loading) return <Loading />;

  return (
    <Container>
      <h3 className="mb-4">All Carts</h3>
      <div className="table-responsive">
        {" "}
        <Table className="text-center">
          <thead>
            <tr>
              <th>Cart ID</th>
              <th>User ID</th>
              <th>Total Products</th>
              <th>Total Price</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {carts.map((cart) => (
              <tr key={cart.id}>
                <td>{cart.id}</td>
                <td>{cart.userId}</td>
                <td>{cart.products.length}</td>
                <td>{cart.total} $</td>
                <td>
                  <div className="d-flex justify-content-between align-items-center">
                    <FaEye
                      className="me-3 fs-4"
                      onClick={() => navigate(`/dashboard/carts/${cart.id}`)}
                    />
                    <HiPencilAlt
                      className="me-3 fs-4"
                      onClick={() =>
                        navigate(`/dashboard/carts/${cart.id}/edit`)
                      }
                    />
                    <MdDeleteForever
                      className="me-3 fs-4"
                      onClick={() => handleDelete(cart.id)}
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

      {carts.length === 0 && <p className="text-center">No carts found</p>}
    </Container>
  );
};
