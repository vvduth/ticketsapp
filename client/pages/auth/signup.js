import React from "react";
import { useState } from "react";
import axios from "axios";
import useRequest from "../../hooks/use-request";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { doRequest, errors } = useRequest({
    url: "/api/users/signup",
    method: "post",
    body: { email, password },
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    doRequest();
  };
  return (
    <form onSubmit={onSubmit}>
      <h1>Sign up</h1>
      <div className="form-group" style={{ marginBottom: "15px" }}>
        <label htmlFor="email">Email address</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          className="form-control"
          id="email"
        />
      </div>
      <div className="form-group" style={{ marginBottom: "15px" }}>
        <label htmlFor="password">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="form-control"
          id="password"
        />
      </div>
      {errors}
      <button type="submit" className="btn btn-primary">
        Sign up
      </button>
    </form>
  );
};

export default Signup;
