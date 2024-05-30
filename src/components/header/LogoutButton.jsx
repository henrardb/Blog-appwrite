import React from "react";
import authService from "../../appwrite/auth";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";

function LogoutButton() {
  const dispatch = useDispatch();
  function handleLogout() {
    authService.logout().then(() => dispatch(logout()));
  }

  return <button onClick={handleLogout}>Logout</button>;
}

export default LogoutButton;
