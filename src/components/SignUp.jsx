import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import authService from "../appwrite/auth";
import { login } from "../store/authSlice";

function Signup() {
  const navigate = useNavigate;
  const [error, setError] = useState("");

  return (
    <div>
      <input></input>
      <input></input>
      <input></input>
      <Button />
    </div>
  );
}

export default Signup;
