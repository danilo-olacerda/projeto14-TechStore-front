import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import UserContext from "./contexts/UserContext";
import Register from "./components/Register/Register.js";
import Login from "./components/Login/Login.js";
import Body from "./components/Body/Body";

function App() {

  const [token, setToken] = useState();

  return (
    <BrowserRouter>
      <UserContext.Provider value={{token, setToken}}>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path = "/" element ={<Body/>}/>
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
