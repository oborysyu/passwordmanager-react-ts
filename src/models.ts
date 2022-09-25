export interface IUser {
    username: string
    password: string
    passwordsBase: Array<IPassword>
};

export interface IPassword {
    id: number
    login: string
    password: string
};

export type PasswordsContextType = {
    users: Array<IUser>;
    addUser: (user:IUser) => void;
    getUsers: (keyName:string, defaultValue:any) => void;
    logInUser: (user:IUser) => void;
    signOut: () => void;
    currentUser: IUser | null;
    funcs: {
        addPassword:(item:{resource:string, password:string})=>void;
        removePassword:(id:number)=>void;
        updatePassword:(item:IPassword)=>void;
    };
  };