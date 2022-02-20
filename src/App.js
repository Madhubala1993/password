import "./App.css";
import { Switch, Route, useHistory } from "react-router-dom";
import Button from "@mui/material/Button";

import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
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
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/forgot-password">
            <ForgotPassword auth={auth} setAuth={setAuth} />
          </Route>
          <Route path="/forgotPassword/:username">
            <OTP auth={auth} setAuth={setAuth} />
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
