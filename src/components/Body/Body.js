import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

export default function Body(){
    const[itens, setItens]= useState([]);

    useEffect(()=>{
        const listItens = async ()=>{
            try{
                const response = await axios.get("http://localhost:5000/inventory");
                console.log(response.data);
                setItens(response.data);
            }catch(error){
                alert(error);
            }
        }
        listItens();
    },[]);
    console.log(itens);
    return(
        <BodyDiv>
            {(itens.map((item, index)=>{
                const {quantity, value, name, image}= item;
                return(
                    <>
                        <ItemDiv key={index}>
                            <ImgDiv key={index}>
                                <img src={image} alt= "nao tem" />
                            </ImgDiv>
                            <h1>{name}</h1>
                            <h1>Qtd Disponivel {quantity}</h1>
                            <h1>Valor:{value}R$</h1>
                        </ItemDiv>
                    </>
                );
            }))}
        </BodyDiv>
    );
}

const BodyDiv = styled.div `
    height: auto;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-evenly;
    margin-top: 200px;
`;
const ItemDiv = styled.div`
    height: 60px;
    width: 120px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    margin-bottom: 40px;
`;

const ImgDiv = styled.div`
    height: 43px;
    width: 43px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    border: 1px solid ;
    img{
        height: 40px;
        width: 40px;
        border-radius: 10px;
        border: none;
    }
`;