import React,{ useState } from "react";
import styled from "styled-components";
import logo from "../../assets/logo.png";
import near_logo from "../../assets/near-logo.png"
import { RiCloseFill } from "react-icons/ri" 


interface Props {
    modal: any,
    wallet: any
}

const LoginModal = ({modal, wallet}: Props) => {
   
    return(
                
                <Wrapper
                aria-labelledby='modal-title'
                role='dialog'
                aria-modal='true'
            >
                <Container>
                <Container2>
                <Container3>
                    <Container4>
                        <Modal>
                        <Close  onClick={()=> modal(false)}/>
                        <Img>
                        <img src={logo} alt="logo" />
                        </Img>
                        <h3>Log in to Gamebloc with</h3>
                        <Button onClick={()=> wallet.signIn()}>
                          Near
                          <Logo src={near_logo} alt="" />
                        </Button>
                        </Modal>
                    </Container4>
                </Container3>
                </Container2>
                </Container>

                </Wrapper>
      
        
    )
}

const Wrapper = styled.div`
 position: relative;
 z-index: 10;
`;

const Img = styled.div`
 img{
  margin: 0 16px 8px 0;
  @media (max-width: 400px){
    width: 90px;
    height: 40px;
    }
 }
 `;

const Logo = styled.img`
width: 25px;
height: 25px;
`;

const Container = styled.div`
 position: fixed;
inset: 0;
background-color: 	rgba(128,128,128, 0.2);
`;

const Container2 = styled.div`
position: fixed;
z-index: 10;
inset: 0;
overflow-y: auto;
`;

const Container3 = styled.div`
display: flex;
align-items: center;
justify-content: center;
min-height: 100%;
`;

const Container4 = styled.div`
position: relative;
background-color: white;
width: 50%;
border-radius: 10px;
overflow: hidden;

`;

const Modal = styled.div`
position: relative;
background-color: #35356b;
padding: 1rem;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
h3{
    color: white;
    margin: 1rem 0;
}

`;

const Button = styled.div`
 background-color: #41417c;
 border-radius: 8px;
 display: flex;
 justify-content: space-between;
 align-items: center;
 padding: 1rem 2rem;
 color: white;
 font-size: 16px;
 border: none;
 width: 80%;
 margin: 1rem ;
 cursor: pointer;

 &:hover{
     scale: 1.03;
     background-color: #6365bf;
 }
`;

const Close = styled(RiCloseFill)`
position: absolute;
color: white;
left: 1rem;
top: 1rem;
cursor: pointer;
`; 


export default LoginModal;

