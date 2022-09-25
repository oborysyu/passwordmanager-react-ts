import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../components/Context";
import { IUser, PasswordsContextType } from "../models";

const Register = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [logInFormIsIncorrect, setLogInFormIsIncorrect] = useState(false);

  const { users, addUser, currentUser } = useContext(Context) as PasswordsContextType;
  const navigate = useNavigate()

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (users.find((user: IUser) => { return user.username === username })) {
      //login already exists
      setLogInFormIsIncorrect(true);
      setErrorMessage("This login already exists!");
    }
    else if (username.trim() === "" || password.trim() === "") {
      //login or password field is empty
      setLogInFormIsIncorrect(true);
      setErrorMessage("Wrong Credentials!");
    }
    else {
      //new user
      setLogInFormIsIncorrect(false);
      addUser({ username: username, password: password, passwordsBase: [] });
      navigate("/dashboard", { state: { currentUser } });
    }
  };
  return (
    <div className="loginForm">
      <p><b>Sign Up</b></p>
      <div>Already registered? <a href="/">Sign In</a></div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="Username"
          placeholder="Login"
          value={username}
          onChange={(e) => { setLogInFormIsIncorrect(false); setUserName(e.target.value) }}
        />
        <br />
        <input
          type="password"
          name="Password"
          placeholder="Password"
          onChange={(e) => { setLogInFormIsIncorrect(false); setPassword(e.target.value) }}
        />
        <br />
        {!logInFormIsIncorrect ? null : (
          <div className="formIsIncorrect">{errorMessage}</div>
        )}
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
};
export default Register;