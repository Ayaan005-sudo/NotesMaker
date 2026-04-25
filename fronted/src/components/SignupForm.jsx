import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../ReduxStore/AuthSlice';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
function SignupForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const [errorMsg, SetErrorMsg] = useState("");

  const loginHandler = async (data) => {
    try {
      const res = await fetch("http://localhost:3000/signup", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
        credentials: "include"
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result || "Something went wrong");
      }

      dispatch(login({
        userData: result.user,
        accessToken: result.accessToken
      }));
      navigate("/");
    } catch (error) {
      SetErrorMsg(error.message);
    }
  };

  const userDetail = useSelector((state) => state.auth.userData);

  return (
    <div className="p-6 max-w-md mx-auto border rounded-md shadow-md bg-white">
      {errorMsg && (
        <p className="text-red-500 mb-4">{errorMsg}</p>
      )}

     <h1 style={{paddingBottom:"10px", textAlign:"center" }}><b>Signup Form</b></h1>

      <form onSubmit={handleSubmit(loginHandler)} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">Username</label>
          <input
            type="text"
            placeholder="username"
            id="name"
            className="w-full border px-2 py-1 rounded"
            {...register("name", { required: true })}
          />
          {errors.name && <span className="text-red-500 text-sm">Username is required</span>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            placeholder="email"
            id="email"
            className="w-full border px-2 py-1 rounded"
            {...register("email", { required: true })}
          />
          {errors.email && <span className="text-red-500 text-sm">Email is required</span>}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            placeholder="password"
            id="password"
            className="w-full border px-2 py-1 rounded"
            {...register("password", { required: true })}
          />
          {errors.password && <span className="text-red-500 text-sm">Password is required</span>}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
        >
          Submit
        </button>

        
      </form>
      <Link to="/loginForm" style={{color:"blue", paddingTop:"5px",textAlign:"center"}}>Back to login</Link>
    </div>
  );
}

export default SignupForm;
