// react
import { useState, useEffect } from "react";

// components
import FormContainer from "../components/FormContainer";
import Spinner from "../components/Spinner";

import { Link, useNavigate, useLocation } from "react-router-dom";

//redux
import { useDispatch, useSelector } from "react-redux";

// slices
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";

// toast
import { toast } from "react-toastify";

// framer-motion
import { motion } from "framer-motion";

const inputClass =
  "w-full rounded-xl border border-ink-100 bg-ink-50 p-3 text-ink-700 placeholder:text-ink-300 transition-colors focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold-400";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();

  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  return (
    <FormContainer>
      <h1 className="mb-8 font-display text-3xl font-semibold text-ink-800">
        Sign Up
      </h1>
      <form className="flex flex-col gap-4" onSubmit={submitHandler}>
        <label className="-mb-2 text-sm font-medium text-ink-500" htmlFor="name">
          Name
        </label>
        <input
          className={inputClass}
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="name"
        />
        <label className="-mb-2 text-sm font-medium text-ink-500" htmlFor="email">
          Email Address
        </label>
        <input
          className={inputClass}
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
        />

        <label className="-mb-2 text-sm font-medium text-ink-500" htmlFor="password">
          Password
        </label>
        <input
          className={inputClass}
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
        />

        <label className="-mb-2 text-sm font-medium text-ink-500" htmlFor="ConfirmPassword">
          Confirm Password
        </label>
        <input
          className={inputClass}
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          id="ConfirmPassword"
        />

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="btn mt-2"
          type="submit"
          disabled={isLoading}
        >
          Register
        </motion.button>

        {isLoading && <Spinner loading={isLoading} />}
      </form>

      <p className="mt-6 text-center text-ink-500">
        Already have an account?{" "}
        <Link
          className="font-semibold text-gold-600 underline underline-offset-2 hover:text-gold-700"
          to={redirect ? `/login?redirect=${redirect}` : "/login"}
        >
          Login
        </Link>
      </p>
    </FormContainer>
  );
};

export default RegisterScreen;
