import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./Form.css";

export default function App() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [field, setField] = useState();
  const [submitted, setSubmit] = useState(false);
  const [showPassword, setShowPassword] = useState(false); 

  const onSubmit = (data) => {
    setField(data);
    setSubmit(true);
  };

  const password = watch("password", ""); 

  return (
    <div className="form-container">
      <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
        {submitted ? (
          <div className="success-message">Registration successful!</div>
        ) : null}

        <input
          id="first-name"
          className="form-field"
          type="text"
          placeholder="First Name"
          {...register("firstName", { required: "First Name is required!" })}
        />
        <span>{errors.firstName?.message}</span>

        <input
          id="last-name"
          className="form-field"
          type="text"
          placeholder="Last Name"
          {...register("lastName", { required: "Last Name is required!" })}
        />
        <span>{errors.lastName?.message}</span>

        <input
          id="email"
          className="form-field"
          type="email"
          placeholder="Email"
          {...register("email", {
            required: "Email is required!",
            pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
          })}
        />
        <span>{errors.email?.message}</span>

        <div className="password-container">
          <input
            id="password"
            className="form-field"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            {...register("password", {
              required: "Password is required!",
              minLength: { value: 10, message: "Password must be more than 10 characters" },
              maxLength: { value: 20, message: "Password cannot be more than 20 characters" },
            })}
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)} 
          >
            {showPassword ? "Hide" : "Show"} Password
          </button>
        </div>
        <span>{errors.password?.message}</span>

        <input
          id="repeat-password"
          className="form-field"
          type="password"
          placeholder="Repeat Password"
          {...register("repeatPassword", {
            validate: (value) => value === password || "The passwords do not match",
          })}
        />
        <span>{errors.repeatPassword?.message}</span>

        <button className="form-field" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}
