import styled from "styled-components";
import Header from "../Header/Header.js";
import Footer from "../Footer/Footer.js";
import {useContext} from "react";
import UserContext from "../../contexts/UserContext.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function UserMenu() {

    const { setToken, token } = useContext(UserContext);
    const navigate = useNavigate();

    function leave(){
        const confirmLeave = window.confirm("Deseja realmente sair ?");
        if (confirmLeave){
            setToken('');
            navigate("/");
            sessionStorage.clear("cart");
        }
    }

    function purchaseHistory(){

        const config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        };

        const promise = axios.get("https://techstore-back.herokuapp.com/userbuys", null, config);

        promise.then(()=>{
            navigate("/purchasehist");
        })
        .catch((res)=>{
            console.log(res.response.data);
        })
    }

    return (
        <>
            <Header cart={[]} />
            <Container>
                <PageTitle>
                    Minha Conta
                </PageTitle>
                <Line />
                <UserContainer>
                    <div>
                        <p>Minhas info (WIP)</p>
                    </div>
                    <div>
                        <p onClick={purchaseHistory}>Minhas Compras (WIP)</p>
                    </div>
                    <div>
                        <p>Trocar senha (WIP)</p>
                    </div>
                    <div onClick={leave}>
                        <p>Sair</p>
                    </div>
                </UserContainer>
            </Container>
            <Footer />
        </>
    )
};

export const Container = styled.div`
    margin-top: 100px;
    height: calc(100% - 100px);
    display: flex;
    flex-direction: column;
    align-items: center;
`;
export const PageTitle = styled.h4`
    font-family: 'Raleway', sans-serif;
    font-style: italic;
    font-weight: 500;
    font-size: 35px;
    line-height: 48px;
    color: #000000;
`;
export const Line = styled.div`
    width: 100%;
    height: 1px;
    background-color: gray;
    margin-bottom: 23px;
`;
const UserContainer = styled.div`
    height: 300px;
    width: calc(100% - 50px);
    display: flex;
    flex-wrap: wrap;
    p {
        font-weight: 400;
        font-size: 24px;
        line-height: 29px;
        color: #000000;
        margin-bottom: 15px;
    }
    > div {
        width: 135px;
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #FFFFFF;
        border: 1px solid #000000;
        padding-top: 10px;
        margin-left: 12.5px;
        margin-right: 12.5px;
        > p {
            width: 60%;
            text-align: center;
        }
    }
`;