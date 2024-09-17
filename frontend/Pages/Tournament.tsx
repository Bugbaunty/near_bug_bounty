import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { tournamentContextType } from "../@types/tournament";

const Tournament = () => {
  const navigate = useNavigate();
  const { tournamentData } = React.useContext(UserContext) as tournamentContextType;

  return (
    <Container>
      <BackButton onClick={() => navigate(-1)}>
        <Back />
        <p>Back</p>
      </BackButton>
      <Heading>Choose a Tournament</Heading>
      <TournamentCard>
        {tournamentData.map((data) => (
          <Link
            to={`/tournament/${data.id}`}
            key={data.id}
            style={{ textDecoration: "none" }}
          >
            <Imgslide>
              <Img style={{ backgroundImage: `url(${data.background})` }}>
                <h4>{data.title}</h4>
                <Create>
                  <p>Create</p>
                </Create>
              </Img>
            </Imgslide>
          </Link>
        ))}
      </TournamentCard>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 4rem;
  width: 100%;
  flex-grow: 1;
  flex-shrink: 1;
  background-color: #35356b;
  @media (min-width: 1200px) {
    width: 60vw;
  }
`;

const Heading = styled.h2`
  color: #df78e3;
  font-size: 22px;
  margin: 2rem 1rem;
  font-weight: 500;
`;

const TournamentCard = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;
  padding: 1rem;
  @media (min-width: 686px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Imgslide = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

const Img = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 0 0 0.5rem;
  width: 100%;
  height: 15rem;
  border-radius: 12px;

  h4 {
    color: #fff;
    font-size: 1.2rem;
    margin-left: 8px;
  }
  &:hover {
    transform: scale(1.05);
    translate: 5s ease in;
  }
`;

const Create = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  align-self: flex-end;
  background: rgba(255, 255, 255, 0.34);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  border-radius: 9999px;
  padding: 0.1rem 0.5rem;
  width: fit-content;
  margin: 1rem;
  cursor: pointer;
  p {
    color: #fff;
    font-size: 1rem;
    margin: 0 0 0 8px;
  }
`;

const BackButton = styled.div`
  display: flex;
  width: fit-content;
  flex-direction: row;
  margin-top: 1rem;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  p {
    color: #df78e3;
    font-size: 1rem;
    margin: 0 0 0 8px;
  }
`;

const Back = styled(IoIosArrowRoundBack)`
  color: #df78e3;
  margin-left: 1rem;
  font-size: larger;
`;

export default Tournament;
