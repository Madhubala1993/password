import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import * as yup from "yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { API } from "./global";

const formValidationSchema = yup.object({
  otp: yup.number().required("Required"),
  new_pwd: yup.string().required("Required"),
});

export function OTP() {
  const [auth, setAuth] = useState(" ");
  console.log(auth);
  const { username } = useParams();
  console.log(username);
  const history = useHistory();
  const { handleBlur, handleChange, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: {
        otp: "",
        new_pwd: "",
      },
      validationSchema: formValidationSchema,
      onSubmit: (data) => {
        otpPwd(data);
      },
    });
  const otpPwd = (data) => {
    console.log(data);
    fetch(`${API}/users/forgotPassword/${username}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
      .then((data) => data.json())
      .then((data) =>
        data.message === "password Updated"
          ? history.push(`/resetSuccess`)
          : setAuth(data.message)
      );
  };
  const [showPwd, setShowPwd] = useState(false);
  return (
    <div className="forgotpassword-container">
      <form onSubmit={handleSubmit}>
        {auth === " " ? " " : <p className="error-message">{auth}</p>}
        <div className="details">
          <p>Password reset link is send to your mail id</p>
          <div className="details">
            <p>Enter OTP</p>
            <TextField
              className="textfield"
              id="otp"
              name="otp"
              label="Enter otp"
              variant="outlined"
              onBlur={handleBlur}
              value={values.otp}
              onChange={handleChange}
              error={touched.otp && errors.otp}
              helperText={touched.otp && errors.otp}
            />
            {touched.otp && errors.otp ? errors.otp : ""}
          </div>
          <br />
          <br />

          <p>Password</p>
          {showPwd ? (
            <div className="password-container">
              <TextField
                className="textfield"
                id="new_pwd"
                name="new_pwd"
                label="Enter Password"
                variant="outlined"
                onBlur={handleBlur}
                value={values.new_pwd}
                onChange={handleChange}
                error={touched.new_pwd && errors.new_pwd}
                helperText={touched.new_pwd && errors.new_pwd}
              />
              {touched.new_pwd && errors.new_pwd ? errors.new_pwd : ""}
              <Button variant="outlined" onClick={() => setShowPwd(false)}>
                <VisibilityOff />
              </Button>
            </div>
          ) : (
            <div className="password-container">
              <TextField
                className="textfield"
                id="new_pwd"
                name="new_pwd"
                label="Enter Password"
                variant="outlined"
                type="password"
                onBlur={handleBlur}
                value={values.new_pwd}
                onChange={handleChange}
                error={touched.new_pwd && errors.new_pwd}
                helperText={touched.new_pwd && errors.new_pwd}
              />
              {touched.new_pwd && errors.new_pwd ? errors.new_pwd : ""}
              <Button variant="outlined" onClick={() => setShowPwd(true)}>
                <Visibility />
              </Button>
            </div>
          )}
        </div>
        <br />
        <br />
        <Button variant="outlined" type="submit">
          Verify
        </Button>
      </form>
    </div>
  );
}
