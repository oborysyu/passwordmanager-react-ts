import { useEffect, useState } from "react";
import { IUser, IPassword } from "../models";

/* I decided to use the browser's local storage to accomplish this task. 
Of course we could use for example indexedDB or something else to store data. */
const LOCAL_STORAGE_NAME = "usersAndPasswords";

export function useUsersAndTheirPasswords() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);

  useEffect(() => {
    let usersAndPasswords = getUsers(LOCAL_STORAGE_NAME, []);
    setUsers(usersAndPasswords);
  }, []);

  const getUsers = (keyName: string, defaultValue: any) => {
    try {
      const value = window.localStorage.getItem(keyName);
      if (value) {
        return JSON.parse(value);
      } else {
        window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      return defaultValue;
    }
  };

  const addUser = (user: IUser) => {
    setUsers([...users, user])
    window.localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify([...users, user]));
    logInUser(user);
  };

  const logInUser = (user: IUser) => {
    setCurrentUser(user);
  };

  const signOut = () => {
    setCurrentUser(null);
  };

  const saveDataInLocalStorage = (data: IUser[]) => {
    try {
      window.localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(data));
    } catch (err) {
      console.log("ERROR:", err);
    }
  };

  const funcs = {
    addPassword: function (item: { resource: string; password: string }) {
      if (!currentUser) return;
      let clonedData = users.concat();
      const updatedPasswords = currentUser.passwordsBase.concat();
      updatedPasswords.push({
        id: Date.now(),
        login: item.resource,
        password: item.password,
      });
      const ind = users.findIndex(
        (obj) => obj.username === currentUser.username
      );
      clonedData[ind].passwordsBase = updatedPasswords;
      setUsers(clonedData);
      saveDataInLocalStorage(clonedData);
    },

    removePassword: function (id: number) {
      if (!currentUser) return;
      let clonedData = users.concat();
      let updatedPasswords = currentUser.passwordsBase.concat();
      updatedPasswords = updatedPasswords.filter((pass) => pass.id !== id);
      const ind = users.findIndex(
        (obj) => obj.username === currentUser.username
      );
      clonedData[ind].passwordsBase = updatedPasswords;
      setUsers(clonedData);
      saveDataInLocalStorage(clonedData);
    },

    updatePassword: function (item: IPassword) {
      if (!currentUser) return;
      let clonedData = users.concat();
      const updatedPasswords = currentUser.passwordsBase.map((pass) => {
        if (pass.id === item.id) {
          pass.login = item.login;
          pass.password = item.password;
        }
        return pass;
      });
      const ind = users.findIndex(
        (obj) => obj.username === currentUser.username
      );
      clonedData[ind].passwordsBase = updatedPasswords;
      setUsers(clonedData);
      saveDataInLocalStorage(clonedData);
    },
  };
  return { users, addUser, getUsers, logInUser, signOut, currentUser, funcs };
}
