import React from "react";
import { PasswordsContextType } from "../models";

const Context = React.createContext<PasswordsContextType | null>(null);

export default Context;
