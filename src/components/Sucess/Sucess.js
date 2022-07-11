import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { Container,PageTitle,Line } from "../Cart/Cart";
import { BodyDiv, ItemDiv, ImgDiv } from "../Body/Body";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useEffect, useState } from "react";

export default function Sucess(){
    const location = useLocation();
    const sucess = location.state;
    const [cart, setCart]= useState([...sucess.cart]);

    useEffect (()=>{
        sessionStorage.removeItem("cart");
        setCart([]);
    },[])
    return(
        <>
            <Header cart ={cart}/>
            <Container>
                <PageTitle>
                    Sucesso!!
                </PageTitle>
                <Line/>
                <RelativeBody>
                    <BodyDiv width ={false}>
                        {(sucess)?
                            sucess.cart.map((item, index)=>{
                                const {quantity, value, name, image}= item;
                                return(
                                    <SucessItem key ={index}>
                                        <ImgDiv key={index}>
                                            <img src={image} alt= "nao tem" />
                                        </ImgDiv>
                                        <h1>Nome:{name}</h1>
                                        <h1>Valor:R${value}</h1>
                                        <h1> Quantidade:{quantity}</h1>
                                    </SucessItem>
                                );
                            }) 
                        :
                            <h2>Carrinho Estava Vazio</h2>
                        }
                        <TotalDiv>
                            Total = R${sucess? sucess.total.toFixed(2).replace(".",","):"0:00"}
                        </TotalDiv>
                    </BodyDiv>
                </RelativeBody>
            </Container>
            <Footer/>
        </>
    )
}

export const RelativeBody = styled.div `
    box-sizing: border-box;
    position: relative;
    height: 60vh;
    width: 80%;
    border: 1px solid black;
    border-radius: 8px;
`;

const TotalDiv = styled.div`
    position: absolute;
    box-sizing: border-box;
    width: 100%;
    height: auto;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 10px 10px;
    border-top: 1px solid black;
    h3{
        font-family: 'Roboto', sans-serif;
        font-style: bold;
        font-weight: 700;
        font-size: 13px;
        line-height: 16px;
        color: #000000;
        word-break: break-word;
    }
`;

const SucessItem = styled.div `
    box-sizing: border-box;
    width: 90%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding-top: 20px;
    h1{
        font-style: normal;
        font-size: 30px;
        margin-right: 30px;
        color: #000000;
    }
`;