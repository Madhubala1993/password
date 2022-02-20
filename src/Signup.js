import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

const formValidationSchema = yup.object({
  username: yup.string().required("Required"),
  mailid: yup.string().required("Required"),
  password: yup.string().required("Required"),
});

export function Signup() {
  const [auth, setAuth] = useState(" ");
  const history = useHistory();

  const { handleBlur, handleChange, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: {
        username: "",
        mailid: "",
        password: "",
      },
      validationSchema: formValidationSchema,
      onSubmit: (signupDatas) => {
        addSignup(signupDatas);
      },
    });
  const addSignup = (signupDatas) => {
    fetch(`http://localhost:9000/users/signup`, {
      method: "POST",
      body: JSON.stringify(signupDatas),
      headers: { "Content-Type": "application/json" },
    })
      .then((data) => data.json())
      .then((data) =>
        data.message === "User already exists"
          ? setAuth("error")
          : history.push("/")
      );
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="signup-container">
        <div className="details">
          {auth === " " ? (
            " "
          ) : (
            <p className="error-message">User already exist. Click on Login</p>
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
            error={touched.username && errors.username}
            helperText={touched.username && errors.username}
          />
          {touched.username && errors.username ? errors.username : ""}
          <p>Mail ID</p>
          <TextField
            className="textfield"
            id="mailid"
            name="mailid"
            label="Enter e-mail id"
            variant="outlined"
            onBlur={handleBlur}
            value={values.mailid}
            onChange={handleChange}
            error={touched.mailid && errors.mailid}
            helperText={touched.mailid && errors.mailid}
          />
          {touched.mailid && errors.mailid ? errors.mailid : ""}
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
          <p>Confirm Password</p>
          <TextField
            className="textfield"
            id="confirmpassword"
            name="confirmpassword"
            label="Confirm password"
            variant="outlined"
            type="confirmpassword"
            onBlur={handleBlur}
            value={values.confirmpassword}
            onChange={handleChange}
            error={touched.confirmpassword && errors.confirmpassword}
            helperText={touched.confirmpassword && errors.confirmpassword}
          />
          {touched.confirmpassword && errors.confirmpassword
            ? errors.confirmpassword
            : ""}
        </div>
        <br />
        <br />
        <br />
        <Button variant="outlined" type="submit">
          Sign Up
        </Button>
        <p>OR</p>
        <Button variant="outlined" onClick={() => history.push("/login")}>
          Login
        </Button>
      </div>
    </form>
  );
}
