import { useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { API } from "../Api/Api";

export const Login = () => {
  // Catching data
  const userNameRef = useRef(),
    passwordRef = useRef();
  const navigate = useNavigate();
  // Handling data
  async function handleLogin(ev) {
    ev.preventDefault();
    const data = {
      username: userNameRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      const response = await API.post("/auth/login", data);
      console.log(response.data);
      // handling store is needed
      //navigation
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <div>
      <h3>Sign Up</h3>
      <Form onSubmit={handleLogin}>
        <Form.Label htmlFor="text">User Name</Form.Label>
        <Form.Control
          type="text"
          id="userName"
          name="userName"
          placeholder="userName"
          required
          ref={userNameRef}
        />
        <Form.Label htmlFor="firstName">Password</Form.Label>
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
        <Button type="submit">Log In</Button>
      </Form>
    </div>
  );
};
