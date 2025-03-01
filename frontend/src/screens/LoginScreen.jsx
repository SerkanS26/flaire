// react
import { useState, useEffect } from "react";

// components
import FormContainer from "../components/FormContainer";
import Spinner from "../components/Spinner";

import { Link, useNavigate, useLocation } from "react-router-dom";

//redux
import { useDispatch, useSelector } from "react-redux";

// slices
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";

// toast
import { toast } from "react-toastify";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

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
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <FormContainer>
      <h1 className="text-3xl md:text-4xl font-semibold text-gray-600 mb-10 ">
        Sign In
      </h1>
      <form className="flex flex-col gap-4" onSubmit={submitHandler}>
        <label className=" text-gray-600 " htmlFor="email">
          Email Address
        </label>
        <input
          className="border border-primary rounded-md p-2 focus:outline-primary-dark focus:bg-slate-100"
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        />

        <button className="btn" type="submit" disabled={isLoading}>
          Sign In
        </button>

        {isLoading && <Spinner loading={isLoading} />}
      </form>

      <p className=" text-gray-600 mt-3">
        New Customer?{" "}
        <Link
          className="text-[#daa520] underline font-semibold hover:text-primary-dark"
          to={redirect ? `/register?redirect=${redirect}` : "/register"}
        >
          Create an account
        </Link>
      </p>
    </FormContainer>
  );
};

export default LoginScreen;
