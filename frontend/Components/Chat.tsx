import React from "react";
import styled from "styled-components";
import logo from "../assets/logo.png";
import { RiSendPlaneFill } from "react-icons/ri";

const Chat = () => {
  return (
    <Container>
      <Chatheader>
        {/* <Avatar>
                   <Image> <img src={u1} alt=""/> </Image>
                   <Image> <img src={u2} alt=""/> </Image>
                   <Image> <img src={u3} alt=""/> </Image>
                   <Image> <img src={u4} alt=""/> </Image>

                </Avatar> */}

        <Heading>
          <Img>
            <img src={logo} alt="logo" />
          </Img>
          <h3>What is GameBloc ?</h3>
          <h3>Site Rules</h3>
          <h3>Gamebloc FAQs</h3>
          <h3>About Near Protocol</h3>
        </Heading>
      </Chatheader>
    </Container>
  );
};

const Container = styled.div`
  padding: 0.5rem;
  /* margin: 2rem 0; */
  width: 100%;
  @media (min-width: 1200px) and (max-width: 1450px) {
    width: 80%;
    margin: 0 0 0 5rem;
  }
`;

const Heading = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  h3 {
    font-size: 14px;
    color: #fff;
    margin: 1rem 0;
  }
`;

const Chatheader = styled.div`
  background: #35356b;
  border-radius: 12px;
  padding: 0.5rem 0 1rem 0.5rem;
  margin-top: 4rem;
`;

const Avatar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: 0 0.5rem 0 1rem;
  padding: 0.5rem 0;
  border-radius: 9999px;
  background-color: #3f3f72;
  width: 60px;
  height: 180px;
  overflow: auto;
  position: fixed;
  right: 0;
  top: 9rem;

  &::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 3px;
    height: 15px;
    border: none;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #df78e3;
    border-radius: 9999px;
  }
`;

const Image = styled.div`
  &:hover {
    display: flex;
    align-items: center;
    justify-content: center;
    transform: scale(1.05);
    background-color: #df78e3;
    border-radius: 9999px;
    padding: 0.3rem;
  }
  img {
    width: 40px;
    height: 40px;
  }
`;

const Img = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    margin: 0 16px 8px 0;
    @media (max-width: 400px) {
      width: 90px;
      height: 40px;
    }
  }
`;

export default Chat;
