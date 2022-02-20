import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export function PasswordChange() {
  const history = useHistory();
  return (
    <div className="passwordChange-container">
      <div className="details">
        <p>Password</p>
        <TextField
          className="textfield"
          id="outlined-password-input"
          label="Enter Password"
          variant="outlined"
          type="password" />
        <p>Confirm Password</p>
        <TextField
          className="textfield"
          id="outlined-password-input"
          label="Enter Password"
          variant="outlined"
          type="password" />
      </div>
      <br />
      <br />
      <br />
      <Button variant="outlined">Submit</Button>
    </div>
  );
}
