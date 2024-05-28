import React from "react";
import authService, { logout } from "../../appwrite/auth";
import { useDispatch } from "react-redux";

function LogoutButton() {
  function handleLogout() {
    authService.logout().then(() => {
      useDispatch(logout());
    });
  }

  return <button onClick={handleLogout}>Logout</button>;
}

export default LogoutButton;
