import styled from "styled-components";

export default function Footer(){
    return(
        <FooterDiv>
            <h1>Footer</h1>
        </FooterDiv>
    );
}

const FooterDiv = styled.div`
    background-color: #FFFFFF;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60px;
    border-top: 1px solid black;
    h1{
        font-family: 'Rubik Moonrocks';
        font-style: normal;
        font-size: 30px;
    }
`;