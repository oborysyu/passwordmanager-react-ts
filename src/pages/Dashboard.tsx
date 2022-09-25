import "./Dashboard.css";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../components/Context";
import { PasswordsContextType } from "../models";
import { PasswordsList } from "../components/PasswordsList";

const Dashboard = () => {
  const { signOut, currentUser, funcs } = useContext(Context) as PasswordsContextType;
  const [resource, setResource] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    funcs.addPassword({ resource, password });
    setResource("");
    setPassword("");
  };

  function onSignOut() {
    signOut();
    navigate("/");
  }

  function handlePassInput(e: React.FormEvent<HTMLInputElement>) {
    setPassword(e.currentTarget.value);
  }

  function handleResInput(e: React.FormEvent<HTMLInputElement>) {
    setResource(e.currentTarget.value);
  }

  if (!currentUser) {
    return (
      <div>
        <p>Please log in!</p>
      </div>
    );
  } else {
    return (
      <div className="container">
        <div className="leftPanel">
          <div className="avatarCircle">
            {currentUser.username.charAt(0).toUpperCase()}
          </div>
          <p>{currentUser.username}</p>
          <button onClick={() => onSignOut()}>Sign out</button>
        </div>
        <div className="mainPanel">
          <p>My saved passwords</p>
          <hr />
          <div className="password-form">
            <h5>Enter the resource and password to save it</h5>
            <form onSubmit={handleSubmit}>
              <input
                placeholder="Resource"
                type="text"
                value={resource}
                onChange={handleResInput}
              />
              <input
                placeholder="Password"
                type="text"
                value={password}
                onChange={handlePassInput}
              />
              <input type="submit" hidden />
            </form>
          </div>
          {currentUser.passwordsBase.length ? (
            <PasswordsList passwords={currentUser.passwordsBase} />
          ) : (
            <h5 className="password-form">No passwords yet!</h5>
          )}
        </div>
      </div>
    );
  }
};
export default Dashboard;
