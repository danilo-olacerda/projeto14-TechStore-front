import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Register() {

    const navigate=useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [addressNum, setAddressNum] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setCofirmPassword] = useState("");

    async function register(e){
        e.preventDefault();

        const body = {
            name,
            email,
            address,
            addressNumber: addressNum,
            password,
            confirmPassword
        };

        if(password!==confirmPassword){
            alert("As senhas devem ser iguais!");
            return;
        };

        await axios.post("https://techstore-back.herokuapp.com/register", body);
        navigate("/");
    }

    return (
        <Container>
            <Link to ={"/"} style ={{textDecoration:'none'}}>
                <h1>TechStore</h1>
            </Link>
            <form action="submit" onSubmit={register}>
                <input type="name" placeholder="Nome" required value={name} onChange={(e)=> setName(e.target.value)} />
                <input type="email" placeholder="E-mail" required value={email} onChange={(e)=> setEmail(e.target.value)} />
                <input type="address" placeholder="Endereço" required value={address} onChange={(e)=> setAddress(e.target.value)} />
                <input type="number" min="1" step="1" placeholder="Nº da casa" required value={addressNum} onChange={(e)=> setAddressNum(e.target.value)} />
                <input type="password" placeholder="Senha" required value={password} onChange={(e)=> setPassword(e.target.value)} />
                <input type="password" placeholder="Confirme a senha" required value={confirmPassword} onChange={(e)=> setCofirmPassword(e.target.value)} />
                <button type="submit">
                    <h3>
                        Registrar
                    </h3>
                </button>
            </form>
            <p onClick={()=> navigate("/login")}>Já tem cadastro ? Faça login!</p>
        </Container>
    )
};

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
        color: #000000;
    }
    input {
        border: 1px solid black;
        border-radius: 8px;
        margin-bottom: 10px;
        background: #FFFFFF;
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
        font-weight: 400;
        font-size: 24px;
        line-height: 29px;
        color: #FFFFFF;
        width: 100%;
        background: #0000FF;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border: none;
        border-radius: 5px;
        padding: 10px;
    }
    p {
        font-weight: 600;
        font-size: 15px;
        line-height: 18px;
        color: #000000;
    }
`;