import React, { useState } from "react";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authLogin } from "../store/authSlice";

function LoginComponent() {
  const [error, setError] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const submit = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const user = await authService.getCurrentUser();
        if (user) dispatch(authLogin({ user }));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit(submit)}>
        <input type="text" {...register("name", { required: true })}>
          Name:
        </input>
        <input type="password" {...register("password", { required: true })}>
          Password:
        </input>
        <Button type="button">Login</Button>
      </form>
    </div>
  );
}

export default LoginComponent;
