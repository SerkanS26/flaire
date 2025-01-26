import FormContainer from "../components/FormContainer";
import { Link } from "react-router-dom";
import { useState } from "react";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
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

        <button className="btn" type="submit">
          Sign In
        </button>
      </form>

      <p className=" text-gray-600 mt-3">
        New Customer?{" "}
        <Link
          className="text-primary underline font-semibold hover:text-primary-dark"
          to="/register"
        >
          Create an account
        </Link>
      </p>
    </FormContainer>
  );
};

export default LoginScreen;
