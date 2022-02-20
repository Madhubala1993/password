import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

const formValidationSchema = yup.object({
  username: yup.string().required("Required"),
  password: yup.string().required("Required"),
});

export function Login() {
  const [auth, setAuth] = useState(" ");
  const history = useHistory();

  const { handleBlur, handleChange, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: {
        username: "",
        password: "",
      },
      validationSchema: formValidationSchema,
      onSubmit: (loginDatas) => {
        addLogin(loginDatas);
      },
    });

  const addLogin = (loginDatas) => {
    fetch(`http://localhost:9000/users/login`, {
      method: "POST",
      body: JSON.stringify(loginDatas),
      headers: { "Content-Type": "application/json" },
    })
      .then((data) => data.json())
      .then((data) =>
        data.message === "Invalid credentials"
          ? setAuth("error")
          : history.push("/")
      );
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="login-container">
        <div className="details">
          {auth === " " ? (
            " "
          ) : (
            <p className="error-message">Invalid credentials</p>
          )}
          <p>Username</p>
          <TextField
            className="textfield"
            id="username"
            name="username"
            label="Enter Username"
            variant="outlined"
            onBlur={handleBlur}
            value={values.username}
            onChange={handleChange}
            error={touched.description && errors.description}
            helperText={touched.description && errors.description}
          />

          {touched.username && errors.username ? errors.username : ""}

          <p>Password</p>
          <TextField
            className="textfield"
            id="password"
            name="password"
            label="Enter Password"
            variant="outlined"
            type="password"
            onBlur={handleBlur}
            value={values.password}
            onChange={handleChange}
            error={touched.description && errors.description}
            helperText={touched.description && errors.description}
          />
          {touched.password && errors.password ? errors.password : ""}
          <p
            className="forgot"
            onClick={() => history.push("/forgot-password")}
          >
            <u>Forgot Password?</u>
          </p>
        </div>
        <Button variant="outlined" type="submit">
          Login
        </Button>
        <p>OR</p>
        <Button variant="outlined" onClick={() => history.push("/signup")}>
          Sign Up
        </Button>
      </div>
    </form>
  );
}
