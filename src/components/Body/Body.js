import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

export default function Body(){
    const color = true;
    const[itens, setItens]= useState([]);
    const[qtd, setQtd]= useState([]);
    const[enableAdd, setEnableAdd]=useState([]);
    const[enableRemove, setEnableRemove]= useState([]);

    function addCart(index, quantity){
        const arr = qtd;
        const arrRemove = enableRemove;
        const arrAdd = enableAdd;
        arr[index]= 1 +arr[index];
        setQtd([...arr]);
        if(qtd[index] >= quantity){
            arrAdd[index] = false;
            setEnableAdd([...arrAdd]);
        }else if(!enableRemove[index]){
            arrRemove[index]= true;
            setEnableRemove([...arrRemove]);
        }
    }
    
    function removeCart(index,quantity){
        const arr = qtd;
        const arrRemove = enableRemove;
        const arrAdd = enableAdd;
        if(enableRemove[index]){
            if(arr[index]>= 1){
                arr[index]= arr[index]- 1;
                setQtd([...arr]);
                arrAdd[index] = true;
                setEnableAdd([...arrAdd]);
                if(qtd[index] ===0){
                    arrRemove[index] = false;
                    setEnableRemove([...arrRemove]);
                }
            }else{
                arrRemove[index] = false;
                setEnableRemove([...arrRemove]);
            }
            
        }
    }

    useEffect(()=>{
        const listItens = async ()=>{
            try{
                const response = await axios.get("http://localhost:5000/inventory");
                setItens(response.data);
                setQtd(new Array(response.data.length).fill(0));
                setEnableAdd(new Array(response.data.length).fill(true));
                setEnableRemove(new Array(response.data.length).fill(false));
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
                            <CartDiv>
                                <ButtonItem 
                                    color = {!color} 
                                    enable={enableRemove[index]} 
                                    disabled={!enableRemove[index]}
                                    onClick={()=> removeCart(index)}>
                                    -
                                </ButtonItem>
                                <h2>
                                    {qtd[index]}
                                </h2>
                                <ButtonItem 
                                    color ={color} 
                                    enable={enableAdd[index]} 
                                    disabled={!enableAdd[index]} 
                                    onClick={()=>addCart(index,quantity)}>
                                    +
                                </ButtonItem>
                            </CartDiv>
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
    height: 90px;
    width: 120px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    margin-bottom: 40px;
    h1{

    }
`;

const CartDiv = styled.div`
    width: 100%;
    height: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    h2{

    }
`;
const ButtonItem = styled.button`
    border: none;
    height: 20px;
    width: 20px;
    background-color: ${props => props.enable? props.color ? 'green': '#F00000': 'grey'};
    color: black;
    h3{
            
    }
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