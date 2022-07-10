import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import {useContext} from "react";
import UserContext from "../../contexts/UserContext.js";

export default function Login(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate=useNavigate();
    const { setToken } = useContext(UserContext);

    function login(e){
        e.preventDefault();

        const body = {
            email,
            password
        }
        const promise = axios.post("http://localhost:5000/login", body);

        promise.then((res)=>{
            setToken(res.data);
            navigate("/cart");
        })
        .catch((res)=>{
            alert(res.response.data);
        })
    }

    return(
        <Container>
            <h1>TechStore</h1>
            <form action="submit" onSubmit={login}>
                <input type="email" placeholder="E-mail" required value={email} onChange={(e)=> setEmail(e.target.value)} />
                <input type="password" placeholder="Senha" required value={password} onChange={(e)=> setPassword(e.target.value)} />
                <button type="submit">
                    <h3>
                        Entrar
                    </h3>
                </button>
            </form>
            <p onClick={()=> navigate("/register")}>Ainda não tem cadastro ? Registre-se!</p>
        </Container>
    )
}

const Container = styled.div`
    height: 100vh;
    background-color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    form {
        display: flex;
        flex-direction: column;
        width: calc(100% - 50px);
        margin-bottom: 18px;
    }
    h1 {
        font-family: 'Rubik Moonrocks';
        font-style: normal;
        font-size: 40px;
        margin-bottom: 15px;
    }
    input {
        border: none;
        margin-bottom: 10px;
        background: #E8E5E2;
        border-radius: 5px;
        height: 58px;
        padding-top: 18px;
        padding-bottom: 17px;
        padding-left: 15px;
        font-weight: 400;
        font-size: 20px;
        line-height: 23px;
        color: #000000;
        outline: none;
    }
    button {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: #E8E5E2;
    border-radius: 5px;
    height: 46px;
        h3 {
        font-weight: 600;
        font-size: 20px;
        line-height: 23px;
        color: #000000;
        }
    }
    p {
        font-weight: 600;
        font-size: 15px;
        line-height: 18px;
        color: #000000;
    }
`;