import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import * as yup from "yup";

const formValidationSchema = yup.object({
  otp: yup.number().required("Required"),
  new_pwd: yup.string().required("Required"),
});

export function OTP({ auth, setAuth }) {
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
    fetch(`http://localhost:9000/users/forgotPassword/${username}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
      .then((data) => data.json())
      .then((data) =>
        // console.log(data)
        data.message === "Otp doesnot match"
          ? setAuth("otpError")
          : history.push(`/login`)
      );
  };

  return (
    <div className="forgotpassword-container">
      <form onSubmit={handleSubmit}>
        {auth === "otpError" ? (
          <p className="error-message">OTP doesnot match</p>
        ) : (
          " "
        )}
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
