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
      <h1 className="text-3xl md:text-4xl font-semibold text-gray-600 mb-10 ">
        Sign Up
      </h1>
      <form className="flex flex-col gap-4" onSubmit={submitHandler}>
        <label className=" text-gray-600 " htmlFor="name">
          Name
        </label>
        <input
          className="border border-primary rounded-md p-2 focus:outline-primary-dark focus:bg-slate-100"
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="name"
        />
        <label className=" text-gray-600 " htmlFor="email">
          Email Address
        </label>
        <input
          className="border border-primary rounded-md p-2 focus:outline-primary-dark focus:bg-slate-100"
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
        />

        <label className=" text-gray-600 " htmlFor="password">
          Password
        </label>
        <input
          className="border border-primary rounded-md p-2 focus:outline-primary-dark focus:bg-slate-100 "
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
        />

        <label className=" text-gray-600 " htmlFor="ConfirmPassword">
          Confirm Password
        </label>
        <input
          className="border border-primary rounded-md p-2 focus:outline-primary-dark focus:bg-slate-100 "
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          id="ConfirmPassword"
        />

        <button className="btn" type="submit" disabled={isLoading}>
          Register
        </button>

        {isLoading && <Spinner loading={isLoading} />}
      </form>

      <p className=" text-gray-600 mt-3">
        Already have an account?{" "}
        <Link
          className="text-[#daa520] underline font-semibold hover:text-primary-dark"
          to={redirect ? `/login?redirect=${redirect}` : "/login"}
        >
          Login
        </Link>
      </p>
    </FormContainer>
  );
};

export default RegisterScreen;
