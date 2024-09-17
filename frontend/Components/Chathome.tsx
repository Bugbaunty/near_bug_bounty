import React from "react";
import styled from "styled-components"
import Chat from "./Chat";
import ActiveTournament from "./ActiveTournament";

interface Props {
  gamebloc: any,
  isSignedIn: any
}

const Chathome = ({gamebloc, isSignedIn}: Props) => {
    return(

        <Chahome>
          <Chat/>
          <ActiveTournament isSignedIn={isSignedIn} gamebloc={gamebloc}/>
        </Chahome >

  
    )
}

export default Chathome;

const Chahome = styled.div`
display: none;
@media (min-width: 1201px){
  display: flex;
  flex-direction: column;
  position: fixed;
  justify-content: center;
  align-items: center;
  right: 0;
  /* top: 2.5rem; */
  /* height: 100vh; */
}
`;