import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import authService from "../appwrite/auth";
import { authLogin } from "../store/authSlice";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

function SignupComponent() {
  const navigate = useNavigate;
  const [error, setError] = useState("");
  const { handleSubmit, register } = useForm();
  const dispatch = useDispatch();

  const submit = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin({ userData }));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submit)}>
        <input type="text" {...register("name", { required: true })}>
          Name:
        </input>
        <input type="email" {...register("email", { required: true })}>
          Email:
        </input>
        <input type="password" {...register("password", { required: true })}>
          Password:
        </input>
        <Button type="submit" />
      </form>
    </div>
  );
}

export default SignupComponent;
