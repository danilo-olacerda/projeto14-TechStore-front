import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Container, Line, PageTitle} from "../Cart/Cart";
import { RelativeBody } from "../Sucess/Sucess";

export default function Body(){
    const color = true;
    const unidades = "und(s)";
    const[itens, setItens]= useState([]);
    const[qtd, setQtd]= useState([]);
    const[enableAdd, setEnableAdd]=useState([]);
    const[enableRemove, setEnableRemove]= useState([]);
    const[cart, setCart]= useState(JSON.parse(sessionStorage.getItem("cart")|| "[]"));

    function refreshCart(index, name, value, image, method){
        const cartStorage = cart;
        sessionStorage.removeItem("cart");
        const newCart ={
            index: index,
            name: name,
            value: value,
            image: image,
            quantity: qtd[index]
        };
        const findIndex = cartStorage.find(item => item.index === newCart.index);
        if(method){
            if(findIndex){
                cartStorage.splice(findIndex,1);
                cartStorage.push(newCart);
            }else{
                cartStorage.push(newCart);
            }
            setCart([...cartStorage]);
            sessionStorage.setItem("cart",JSON.stringify(cartStorage));

        }else{
            if(newCart.quantity>0){
                cartStorage.splice(findIndex,1);
                cartStorage.push(newCart);
            }else{
                cartStorage.splice(findIndex,1);
            }
            setCart([...cartStorage]);
            sessionStorage.setItem("cart",JSON.stringify(cartStorage));
        }
    }

    function addCart(index, quantity, name, value, image){
        const arr = qtd;
        const arrRemove = enableRemove;
        const arrAdd = enableAdd;
        const method = true;
        arr[index]= 1 +arr[index];
        setQtd([...arr]);
        if(qtd[index] >= quantity){
            arrAdd[index] = false;
            setEnableAdd([...arrAdd]);
        }else if(!enableRemove[index]){
            arrRemove[index]= true;
            setEnableRemove([...arrRemove]);
        }
        refreshCart(index, name, value, image, method);
    }
    
    function removeCart(index, name, value, image){
        const arr = qtd;
        const arrRemove = enableRemove;
        const arrAdd = enableAdd;
        const method = false;
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
        refreshCart(index, name, value, image, method);
    }

    useEffect(()=>{
        const listItens = async ()=>{
            try{
                const response = await axios.get("http://localhost:5000/inventory");
                setItens(response.data);
                setQtd(new Array(response.data.length).fill(0));
                setEnableAdd(new Array(response.data.length).fill(true));
                setEnableRemove(new Array(response.data.length).fill(false));
                if(cart.length> 0){
                    cart.map((item) => {
                        const arrQtd = new Array(response.data.length).fill(0);
                        const arrAdd = new Array(response.data.length).fill(true);
                        const arrRemove = new Array(response.data.length).fill(false);
                        if(item.quantity > 0){
                            arrQtd[item.index]= item.quantity;
                            arrRemove[item.index]= true;
                            setEnableRemove([...arrRemove]);
                            if(item.quantity === response.data.quantity){
                                arrAdd[item.index] = false;
                                setEnableRemove([...arrAdd]);
                            }
                        }else{
                            arrQtd[item.index]= '0';
                        }
                        setQtd([...arrQtd]);
                        return true;
                    })
                }
            }catch(error){
                alert(error);
            }
        }
        listItens();
    },[]);

    return(
        <>
            <Header cart ={cart}/>
            <Container>
                <PageTitle>
                    Página Principal
                </PageTitle>
                <Line/>
                <RelativeBody>
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
                                        <h1>Disponivel:{quantity}{unidades}</h1>
                                        <h1>Valor:R${value}</h1>
                                        <CartDiv>
                                            <ButtonItem 
                                                color = {!color} 
                                                enable={enableRemove[index]} 
                                                disabled={!enableRemove[index]}
                                                onClick={()=> removeCart(index, name, value, image)}>
                                                -
                                            </ButtonItem>
                                            <h2>
                                                {qtd[index]}
                                            </h2>
                                            <ButtonItem 
                                                color ={color} 
                                                enable={enableAdd[index]} 
                                                disabled={!enableAdd[index]} 
                                                onClick={()=>addCart(index, quantity, name, value, image)}>
                                                +
                                            </ButtonItem>
                                        </CartDiv>
                                    </ItemDiv>
                                </>
                            );
                        }))}
                    </BodyDiv>
                </RelativeBody>
            </Container>
            <Footer/>
            </>
    );
}

const MainContainer = styled.div`
    max-height: 100vh;
    max-width: 100vw;
    overflow-y: hidden;
`;

export const BodyDiv = styled.div `
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: center;
    overflow-y: scroll;
    margin-top: 0;
    border: 1px solid black;
    background-color: rgb(0,0,0,0);
    border-radius: 8px;
`;
export const ItemDiv = styled.div`
    box-sizing: border-box;
    padding: 5px;
    height: auto;
    width: 145px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-right: 10px;
    border-radius: 10px;
    border: 1px solid ;
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
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.enable? props.color ? 'green': '#F00000': 'grey'};
    color: black;
    border-radius: 5px;
    h3{
            
    }
`;

export const ImgDiv = styled.div`
    height: 43px;
    width: 43px;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    border-radius: 10px;
    border: 1px solid ;
    margin-left: 0px;
    img{
        height: 40px;
        width: 40px;
        border-radius: 10px;
        border: none;
    }
`;