import { useContext, useEffect, useState } from "react";
import { IPassword, PasswordsContextType } from "../models";
import Context from "./Context";
import "./PasswordItem.css";

interface PasswordProps {
  pass: IPassword
}

export function PasswordItem({ pass }: PasswordProps) {
  const { funcs } = useContext(Context) as PasswordsContextType;
  const [passwordShown, setPasswordShown] = useState(false);
  // const [buttonLabel, setButtonLabel] = useState("Show"); //in the case of button usage
  const [loginText, setLoginText] = useState("");
  const [passText, setPassText] = useState("");
  const { login, password } = pass;
  const INPUTS_TOOLTIP = "You can change this value; press enter to save your changes";

  const togglePassword = () => {
    //here we can make toggle between show and hide
    //setPasswordShown(!passwordShown);
    // setButtonLabel(buttonLabel==="Show" ? "Hide" : "Show");

    //but here we only show passwords by click
    setPasswordShown(true);
  };

  const handleLoginInput = (e: React.FormEvent<HTMLInputElement>) => {
    setLoginText(e.currentTarget.value);
  };

  const handlePassInput = (e: React.FormEvent<HTMLInputElement>) => {
    setPassText(e.currentTarget.value);
  };

  const handleUpdate = (e: React.SyntheticEvent) => {
    e.preventDefault();
    funcs.updatePassword({ id: pass.id, login: loginText, password: passText });
  };

  useEffect(() => {
    setLoginText(login);
  }, [login]);

  useEffect(() => {
    setPassText(password);
  }, [password]);

  return (
    <div className="password-item">
      <form onSubmit={handleUpdate} className="password-item">
        <div
          title="Delete"
          onClick={() => {
            funcs.removePassword(pass.id);
          }}
          className="password-item-delete"
        >
          &times;
        </div>
        <input
          type="text"
          value={loginText}
          onChange={handleLoginInput}
          title={INPUTS_TOOLTIP}
        />
        <input
          type={passwordShown ? "text" : "password"}
          value={passText}
          onClick={togglePassword}
          onChange={handlePassInput}
          title={INPUTS_TOOLTIP}
        />
        <input type="submit" hidden />
      </form>
      {/* Button is better choice to show/hide password, imho. */}
      {/* <button onClick={togglePassword}>{buttonLabel} Password</button> */}
    </div>
  );
}
