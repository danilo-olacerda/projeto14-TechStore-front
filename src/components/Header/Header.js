import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import UserContext from "../../contexts/UserContext";

export default function Header ({cart}){
    const {token} = useContext(UserContext);
    const[isLogged, setIsLogged]= useState(false)
    const[CartValue, setCartValue]= useState(0);;

    useEffect(()=>{
        let sum = 0;
        console.log(cart);
        cart.map((item)=>{
            if(item.quantity >0){
                sum += item.quantity;
            }
            return "ok";
        });
        setCartValue(sum);
    },[cart]);

    // useEffect(()=>{


    // },[]);

    return(
        <>
            {(isLogged)?
                <HeaderDiv>
                    <h1>
                        TechStore
                    </h1>
                </HeaderDiv>
                :
                <HeaderDiv>
                    <h1>
                        Techstore
                    </h1>
                        <CartDiv>
                            <ion-icon name="cart-outline"></ion-icon>
                            <CartNumber>
                                {CartValue}
                            </CartNumber>
                        </CartDiv>
                        <Link to ={"/register"} style ={{textDecoration:'none'}}>
                            <ion-icon name="create-outline"></ion-icon>
                        </Link>
                        <Link to ={"/login"} style ={{textDecoration:'none'}}>
                            <ion-icon name="people-sharp"></ion-icon>
                        </Link>
                        
                </HeaderDiv>
            }
        </>
    );

}

export const HeaderDiv = styled.div`
    position: fixed;
    width: 100%;
    height: 100px;
    top: 0;
    left: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    border-bottom: 1px solid black;
    border-top: 1px solid black;
    h1{
        font-family: 'Rubik Moonrocks';
        font-style: normal;
        font-size: 30px;
        margin-right: 30px;
    }
    ion-icon{
        width: 50px;
        height: 50px;
        color: #000000;
        cursor: pointer;
    }
`;

export const CartDiv = styled.div `
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    position: relative;
    
`;

export const CartNumber = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 3px;
    right: 0;
    width: 12px;
    height: 12px;
    background-color: red;
    color: white;
`;