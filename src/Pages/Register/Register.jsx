import { useRef } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { API } from "../../Api/Api";
import { useDispatch } from "react-redux";
import { setUser } from "../../Store/Slices/AuthSlice";
import { errorHandler } from "../../Utils/ErrorHandler";

export const Register = () => {
  // Catching data
  const firstNameRef = useRef(),
    lastNameRef = useRef(),
    emailRef = useRef(),
    passwordRef = useRef();
  // Navigation
  const navigate = useNavigate();
  // Redux
  const dispatch = useDispatch();
  // Handling data
  async function handleSubmit(ev) {
    ev.preventDefault();
    const data = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      const response = await API.post("/users/add", data);
      toast.success("Signed up");
      const payload = response.data;
      dispatch(setUser(payload));
      //navigation
      navigate("/");
    } catch (error) {
      errorHandler(error, "Network error");
    }
  }
  return (
    <Row className="justify-content-center my-5 p-3">
      <Col md={6} lg={4}>
        <h3 className="text-center">Sign Up</h3>
        <Form onSubmit={handleSubmit} className="auth-form">
          <Form.Group className="mb-3">
            <Form.Label htmlFor="firstName">First Name</Form.Label>
            <Form.Control
              type="text"
              id="firstName"
              name="firstName"
              placeholder="First Name"
              required
              minLength={3}
              maxLength={32}
              ref={firstNameRef}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="lastName">last Name</Form.Label>
            <Form.Control
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              required
              minLength={3}
              maxLength={32}
              ref={lastNameRef}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="email">E-mail</Form.Label>
            <Form.Control
              type="email"
              id="email"
              name="email"
              placeholder="E-mail"
              required
              ref={emailRef}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control
              type="password"
              id="password"
              name="password"
              placeholder="password"
              required
              minLength={8}
              maxLength={32}
              ref={passwordRef}
            />
          </Form.Group>
          <Button type="submit">Sign Up</Button>
        </Form>
      </Col>
    </Row>
  );
};
