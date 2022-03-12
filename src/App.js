import "./App.css";
import { Switch, Route, useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import { Login } from "./Login";
import { Signup } from "./Signup";
import { ForgotPassword } from "./ForgotPassword";
import { OTP } from "./OTP";
import { PasswordChange } from "./PasswordChange";
import { useState } from "react";

export default function App() {
  return (
    <div className="container">
      <Routers />
    </div>
  );
}

function Routers() {
  const [auth, setAuth] = useState(" ");
  return (
    <div className="router-container">
      <section className="router-container">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/success">
            <LoginSuccess />
          </Route>
          <Route path="/signSuccess">
            <SignUpSuccess />
          </Route>
          <Route path="/resetSuccess">
            <ResetSuccess />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>

          <Route path="/forgot-password">
            <ForgotPassword />
          </Route>
          <Route path="/forgotPassword/:username">
            <OTP />
          </Route>
          <Route path="/passwordchange">
            <PasswordChange />
          </Route>
        </Switch>
      </section>
    </div>
  );
}

function Home() {
  const history = useHistory();
  return (
    <div className="routes">
      <Button onClick={() => history.push("/")} variant="outlined">
        Home
      </Button>
      <Button onClick={() => history.push("/login")} variant="outlined">
        Login
      </Button>
      <Button onClick={() => history.push("/signup")} variant="outlined">
        signup
      </Button>
      <Button
        onClick={() => history.push("/forgot-password")}
        variant="outlined"
      >
        ForgotPassword
      </Button>
    </div>
  );
}

function LoginSuccess() {
  const history = useHistory();

  return (
    <div>
      <h1 className="success">Login success</h1>
      <Button variant="outlined" onClick={() => history.push("/")}>
        Back to Home
      </Button>
    </div>
  );
}
function SignUpSuccess() {
  const history = useHistory();

  return (
    <div>
      <h1 className="success">Registered successfully</h1>
      <Button variant="outlined" onClick={() => history.push("/")}>
        Back to Home
      </Button>
    </div>
  );
}

function ResetSuccess() {
  const history = useHistory();

  return (
    <div>
      <h1 className="success">Password changed successfully</h1>
      <Button variant="outlined" onClick={() => history.push("/login")}>
        Click to Login
      </Button>
      <br />
      <br />
      <br />
      <Button variant="outlined" onClick={() => history.push("/")}>
        Back to Home
      </Button>
    </div>
  );
}
