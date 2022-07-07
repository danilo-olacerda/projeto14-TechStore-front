import { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import UserContext from "../../contexts/UserContext";

export default function Header (){
    const {token} = useContext(UserContext);
    const[isLogged, setIsLogged]= useState(false);
    

}