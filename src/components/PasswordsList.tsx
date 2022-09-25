import { IPassword } from "../models";
import { PasswordItem } from "./PasswordItem";

export function PasswordsList(props:any) {
  return (
    <ul>
      {props.passwords.map((password:IPassword) => {
        return <PasswordItem pass={password} key={password.id} />;
      })}
    </ul>
  );
}
