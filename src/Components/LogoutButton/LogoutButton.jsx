import React from "react";
import { Button } from "react-bootstrap";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { clearUser } from "../../Store/Slices/AuthSlice";

export const LogoutButton = () => {
  const dispatch = useDispatch();
  function handleLogout() {
    dispatch(clearUser());
    localStorage.removeItem("accessToken");
  }
  return (
    <Button variant="danger" onClick={handleLogout}>
      <RiLogoutBoxRLine />
    </Button>
  );
};
