import styled from "styled-components";
import { useState, useEffect } from "react";
import CartItem from "./CartItem.js";

export default function Cart(){

    let cartItems = sessionStorage.getItem('cart');
    cartItems = JSON.parse(cartItems);

    const [cart, setCart] = useState([]);
    const [totalValue, setTotalValue] = useState(calcTotalValue());

    useEffect(()=>{
        if (cartItems){
            setCart(cartItems);
        }
    },[])
    
    async function finalize(){
        if(totalValue!==0){
            console.log("Checkout");
            return;
        }
        alert("Adicione pelo menos um item ao carrinho!");
    }

    function calcTotalValue(){

        cartItems = sessionStorage.getItem('cart');
        if (cartItems===null)
        return;
        let total = 0;
        cartItems = JSON.parse(cartItems);
    
        for (let i = 0; i<cartItems.length; i++){
            total+=(cartItems[i].value*cartItems[i].itemQuantity);
        }
        return total;
    }

    return(
        <Container>
            Header
            <Line/>
            <PageTitle>
                Carrinho
            </PageTitle>
            <Line/>
            <CartContainer>
                <p>Resumo da compra</p>
                <CartItems>
                    {cart.length!==0 ? cart.map((e, i)=> <CartItem setTotalValue={setTotalValue} calcTotalValue={calcTotalValue} value={e.value} itemQuantity={e.quantity} name={e.name} key={i} index={i} cart={cart} image={e.image} setCart={setCart}/>): "Você ainda não tem itens no carrinho!"}
                </CartItems>
                <span>
                    <div>
                        <p>Valor Total: </p>
                        <p>R$ {totalValue ? totalValue.toFixed(2).replace(".", ",") : "0,00"}</p>
                    </div>
                    <button onClick={finalize}>
                        Finalizar Compra
                    </button>
                </span>
            </CartContainer>
            <Line/>
            Footer
        </Container>
    )
};

const Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const PageTitle = styled.h4`
    margin-bottom: 23px;
    font-weight: 400;
    font-size: 40px;
    line-height: 48px;
    color: #000000;
`;
const Line = styled.div`
    width: 100%;
    height: 1px;
    background-color: gray;
    margin-bottom: 23px;
`;
const CartContainer = styled.div`
    height: 100%;
    width: calc(100% - 50px);
    display: flex;
    flex-direction: column;
    p {
        font-weight: 400;
        font-size: 24px;
        line-height: 29px;
        color: #000000;
        margin-bottom: 15px;
    }
    > span {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 100%;
        > div {
            display: flex;
            justify-content: space-between;
            width: 100%;
        }
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
`;
const CartItems = styled.div`
    padding: 10px;
    border: 1px solid #000000;
    min-height: 250px;
    max-height: 250px;
    overflow-y: scroll;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
`