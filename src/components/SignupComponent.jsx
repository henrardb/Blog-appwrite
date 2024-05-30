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
      console.log("SignupComponent :: submit :: ", error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submit)}>
        <input
          type="text"
          label="Name:"
          placeholder="Name"
          {...register("name", { required: true })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-1"
        />
        <input
          type="email"
          label="Email: "
          placeholder="Email"
          {...register("email", { required: true })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-1"
        />
        <input
          type="password"
          label="Password: "
          placeholder="Password"
          {...register("password", { required: true })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-1"
        />
        <Button type="submit" label="Submit">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default SignupComponent;
