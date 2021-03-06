import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import UserContext from "./contexts/UserContext";
import Register from "./components/Register/Register.js";
import Login from "./components/Login/Login.js";
import Body from "./components/Body/Body.js";
import Cart from "./components/Cart/Cart.js";
import Sucess from "./components/Sucess/Sucess";
import UserMenu from "./components/UserMenu/UserMenu.js";

function App() {

  const [token, setToken] = useState('');

  return (
    <BrowserRouter>
      <UserContext.Provider value={{token, setToken}}>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path = "/" element ={<Body/>}/>
          <Route path = "/cart" element ={<Cart/>}/>
          <Route path = "/sucess" element ={<Sucess/>}/>
          <Route path = "/usermenu" element ={<UserMenu />}/>
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
