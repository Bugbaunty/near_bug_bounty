import React from "react";
import styled from "styled-components";
import CardView from "../Components/CardView";
import HomeSlider from "../Components/HomeSlider";
import SearchBox from "../Components/SearchBox";
import Hub from "../Components/Hub";
import TournamentList from "../Components/TournamentList";

type Props = {
  gamebloc: any,
  isSignedIn: any

}

const Home = ({gamebloc, isSignedIn}: Props) => {
  return (
    <Container>
      <HomeSlider />
      <TournamentList gamebloc={gamebloc} isSignedIn={isSignedIn} />
      <CardView />
      <Hub />
    </Container>
  );
};

export default Home;

const Container = styled.div`
  @media (min-width: 686px) {
    //    margin-left: 13.5rem;
    margin-top: 1rem;
    width: 70vw;
    flex-grow: 1;
    flex-shrink: 1;
  }
  @media (min-width: 1200px) {
    width: 59vw;
  }
`;
