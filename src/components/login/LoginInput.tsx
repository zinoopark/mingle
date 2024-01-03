"use client";
import Divider from "../common/Divider/Divider";
import styles from "./LoginInput.module.css";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function LoginInput() {
  const emailRegex = /^\S+@\S+$/;
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const onValid = (data: any) => {
    console.log(data);
  };

  return (
    <div className={styles.form_wrapper}>
      <form onSubmit={handleSubmit(onValid)} className={styles.form}>
        <input
          {...register("email", {
            required: { value: true, message: "Email is required" },
            pattern: { value: emailRegex, message: "Invalid Email format" },
          })}
          name="email"
          type="email"
          className={styles.input}
          placeholder={"Email address"}
        />
        {errors.email && (
          <span className={styles.error_msg}>
            {errors.email.message as string}
          </span>
        )}
        <input
          {...register("password", {
            required: { value: true, message: "password is required" },
          })}
          name="password"
          type={showPassword ? "text" : "password"}
          className={styles.input}
          placeholder={"Password"}
        />
        {errors.password && (
          <span className={styles.error_msg}>
            {errors.password.message as string}
          </span>
        )}

        <div className={styles.remember_section}>
          <label>
            <input
              id="rememberInput"
              className={styles.checkbox}
              role="switch"
              type="checkbox"
            />
            <span>Remember me</span>
          </label>
          <span>Forgot password?</span>
        </div>

        <Divider gap="35px" />
        <button type={"submit"} className={styles.button}>
          <img src="/google_logo.svg" alt="google logo"></img>
          <span>Sign in with Google</span>
        </button>
      </form>
    </div>
  );
}
