import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SearchBox from "./SearchBox";
import fence from "../assets/fencing.png";
import Loader from "./Loader/Loader";
import check from "../assets/check.png";
import CodImgData from "../Features/ImageData/CodImg/CodImgData";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

interface Props {
  gamebloc: any;
  isSignedIn: any;
}

const AllTournaments = ({ gamebloc, isSignedIn }: Props) => {
  const [allTournaments, setAllTournaments] = useState([] as any[]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      gamebloc.getAllTournaments().then((data: any) => {
        if (data) {
          setAllTournaments(data.tournament);
          console.log(data.tournament);
          setLoading(false);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (loading) {
    return (
      <Layout>
        <Loader />
      </Layout>
    );
  } else {
    return (
      <Container>
        <Back onClick={() => navigate(-1)} />
        <Heading>
          <h3>All Tournaments</h3>
        </Heading>
        <SearchBox />
        <GridLayout>
          {allTournaments.map((data, index) => (
            <Imgslide key={index}>
              <ImgWrapper>
                <Img
                  style={{
                    backgroundImage: `url(${
                      CodImgData[Math.floor(Math.random() * CodImgData.length)]
                    })`,
                  }}
                />

                <Wrapper>
                  <Avatar
                    src={
                      CodImgData[Math.floor(Math.random() * CodImgData.length)]
                    }
                    alt=""
                  />{" "}
                  $
                  <Details>
                    <h4>Call of Duty</h4>
                    <Profile>
                      <Check src={check} alt="" />
                      <h3>
                        {data.owner_id.substring(0, data.owner_id.length - 8)}
                      </h3>
                    </Profile>
                  </Details>
                </Wrapper>

                <Status>
                  <h4></h4>
                  <Link
                    to={`/tournament-view/${data.tournament_id_hash}`}
                    style={{ textDecoration: "none" }}
                  >
                    <button> Details</button>
                  </Link>
                </Status>
              </ImgWrapper>
            </Imgslide>
          ))}
        </GridLayout>
      </Container>
    );
  }
};

const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 10rem;
`;

const Back = styled(IoIosArrowRoundBack)`
  margin: 1rem 1rem 0 1rem;
  color: #df78e3;
  font-size: 2rem;
  &:hover {
    scale: 1.01;
  }
`;

const Container = styled.div`
  margin-top: 5rem;
  width: 100%;
  background-color: #35356b;
  height: fit-content;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
`;

const Heading = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  img {
    width: 7rem;
    height: 5rem;
  }

  h3 {
    margin-left: 2.3rem;
    color: #df78e3;
    font-size: 1.5rem;
  }
`;

const GridLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  /* @media  (max-width: 390px){
  grid-template-columns: repeat(1, 1fr);
  
} */
  @media (min-width: 900px) and (max-width: 1729px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 1730px) and (max-width: 2350px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (min-width: 2350px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

const ImgWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const Imgslide = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin: 0rem 0.2rem;

  @media (min-width: 430px) {
    margin: 0rem 1rem;
  }
`;

const Img = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column;
  background-size: 100% 100%;
  border-radius: 12px;
  height: 18rem;
  opacity: 0.7;
  width: 8.5rem;
  @media (min-width: 370px) {
    width: 10rem;
  }
  @media (min-width: 371px) {
    width: 100%;
  }
  @media (min-width: 500px) {
    width: 120%;
  }
`;

const Seen = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  flex-direction: column;
  /* background: rgba(255, 255, 255, 0.34);
box-shadow: 0 4px 30px rgba(0,0,0,0.1);
backdrop-filter: blur(5px); */
  /* border-radius: 9999px; */
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  width: 100%2;
  height: 50%;
  margin-top: 60%;
`;

const Wrapper = styled.div`
  z-index: 1;
  display: flex;
  flex-direction: row;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 3px;
  padding: 10px;
  h4 {
    color: #fff;
    font-size: 14px;
    margin: 0;
  }
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  width: 100px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  flex-direction: row;
  margin-top: 4px;
  h3 {
    color: #fff;
    font-size: 14px;
    margin: 0 0 0 4px;
    @media (max-width: 374px) {
      width: 100px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      width: 60px;
      font-size: 12px;
    }
  }
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  margin: 10px 0 0 8px;
  @media (max-width: 374px) {
    width: 20px;
    height: 20px;
  }
`;

const Check = styled.img`
  width: 20px;
  height: 20px;
`;

const Status = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 100%;
  align-items: center;
  padding: 1rem;
  z-index: 1;
  h4 {
    color: white;
    @media (max-width: 400px) {
      font-size: 13px;
    }
  }
  button {
    background-color: #41417c;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 1rem;
    color: white;
    font-size: 1rem;
    border: none;
    width: fit-content;
    margin-left: 2rem;

    cursor: pointer;
    &:hover {
      scale: 1.03;
      background-color: #6365bf;
    }
    @media (max-width: 374px) {
      font-size: 0.8rem;
    }
  }
`;

export default AllTournaments;
