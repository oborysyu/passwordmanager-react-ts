import { Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Context from './components/Context';
import { useUsersAndTheirPasswords } from './hooks/useUsersAndTheirPasswords';

export default function App() {
  const { users, addUser, getUsers, logInUser, signOut, currentUser, funcs } = useUsersAndTheirPasswords();
  return (
    <Context.Provider value={{users, addUser, getUsers, logInUser, signOut, currentUser, funcs}}>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />}></Route>
      </Routes> 
    </Context.Provider>
  );
}
