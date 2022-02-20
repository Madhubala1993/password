import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import * as yup from "yup";

const formValidationSchema = yup.object({
  username: yup.string().required("Required"),
});

export function ForgotPassword({ auth, setAuth }) {
  const history = useHistory();
  const { handleBlur, handleChange, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: {
        username: "",
      },
      validationSchema: formValidationSchema,
      onSubmit: (userdata) => {
        forgotpwd(userdata);
      },
    });
  const forgotpwd = (userdata) => {
    // console.log(userdata);
    fetch(`http://localhost:9000/users/forgotPassword`, {
      method: "POST",
      body: JSON.stringify(userdata),
      headers: { "Content-Type": "application/json" },
    })
      .then((data) => data.json())
      .then((data) =>
        data.message === "User doesnot exists"
          ? setAuth("error")
          : history.push(`/forgotPassword/${userdata.username}`)
      );
  };
  return (
    <div className="forgotpassword-container">
      <form onSubmit={handleSubmit}>
        <div className="details">
          {auth === "error" ? (
            <p className="error-message">Invalid user</p>
          ) : (
            " "
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
        </div>
        <br />
        <br />
        <Button variant="outlined" type="submit">
          Verify
        </Button>
      </form>
      {auth === "mail" ? (
        <div>
          <p>Password reset link is send to your mail id</p>
        </div>
      ) : (
        " "
      )}
    </div>
  );
}
