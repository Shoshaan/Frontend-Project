import { useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { API } from "../Api/Api";

export const Register = () => {
  // Catching data
  const firstNameRef = useRef(),
    lastNameRef = useRef(),
    emailRef = useRef(),
    passwordRef = useRef();
  const navigate = useNavigate();
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
      <Form onSubmit={handleSubmit}>
        <Form.Group>
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
          <Form.Label htmlFor="email">E-mail</Form.Label>
          <Form.Control
            type="email"
            id="email"
            name="email"
            placeholder="E-mail"
            required
            ref={emailRef}
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
          <Button type="submit">Sign Up</Button>
        </Form.Group>
      </Form>
    </div>
  );
};
