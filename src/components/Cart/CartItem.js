import styled from "styled-components"
import { useState, useEffect } from "react";

export default function CartItem({image, cart, setCart, index, name, value, itemQuantity, calcTotalValue, setTotalValue}){

    const [quantity, setQuatity] = useState(itemQuantity);

    useEffect(()=>{
        setQuatity(itemQuantity);
    },[itemQuantity])

    function add(){
        setQuatity(quantity + 1);
        cart[index].itemQuantity++;
        const newCart = JSON.stringify(cart);
        sessionStorage.setItem('cart', newCart);
        const cartAtt = [...cart];
        setCart(cartAtt);
        setTotalValue(calcTotalValue());
    }
    function remove(){
        if (quantity===1){
            const confirmDelete = window.confirm("Deseja retirar o item do carrinho ?");
            if (confirmDelete) {
                cart.splice(index, 1);
                const newCart = JSON.stringify(cart);
                sessionStorage.setItem('cart', newCart);
                setTotalValue(calcTotalValue());
            }
            const cartAtt = [...cart];
            setCart(cartAtt);
            return;
        }
        cart[index].itemQuantity--;
        const newCart = JSON.stringify(cart);
        sessionStorage.setItem('cart', newCart);
        setQuatity(quantity - 1);
        const cartAtt = [...cart];
        setCart(cartAtt);
        setTotalValue(calcTotalValue());
    }

    return(
        <Container>
            <img src={image} alt="" />
            
            <div>
                <h3>{name}</h3>
                <h3>R$ {value.toFixed(2).replace(".",",")}</h3>
                <h3>This is a good product</h3>
            </div>
            <Quantity>
                <h5>
                    {quantity}
                </h5>
            </Quantity>
            <div>
                <ButtonAdd onClick={add}>
                    +
                </ButtonAdd>
                <ButtonRemove onClick={remove}>
                    -
                </ButtonRemove>
            </div>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    height: 80px;
    margin-bottom: 8px;
    display: flex;
    img {
        height: 80px;
        width: 80px;
        object-fit: cover;
        border-radius: 8px;
        margin-right: 5px;
    }
    h3 {
        margin-bottom: 8px;
        margin-right: 10px;
    }
    div {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
`;
const ButtonAdd = styled.div`
    width: 25px;
    height: 25px;
    background-color: green;
    margin-bottom: 5px;
    border-radius: 5px;
    align-items: center;
`;
const ButtonRemove = styled.div`
    width: 25px;
    height: 25px;
    background-color: red;
    border-radius: 5px;
    align-items: center;
`;
const Quantity = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    padding: 0 3px;
    h5 {
        border: 1px solid #000000;
    }
`;