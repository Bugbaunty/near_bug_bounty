import React, { useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { HiCollection } from "react-icons/hi";
import {RiGamepadFill} from "react-icons/ri";
import {TiHome} from "react-icons/ti";
import user from "../assets/u.png";
import virtual from "../assets/virtual.jpg";
import { Link, useNavigate } from "react-router-dom";
import LoginModal from "../Components/Popup/LoginModal";
import Portaldata from "../Features/Portaldata";
import ReactPaginate from "react-paginate";
import "../Features/Pagination.css"
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { tournamentContextType } from "../@types/tournament";

interface Props {
  isSignedIn: any,
  wallet: any;
}

const Dashboard = ({ isSignedIn, wallet }: Props) => {
  const [openModal, setOpenModal] = useState(false)
  const { userName } = React.useContext(UserContext) as tournamentContextType;
  const [pageNumber, setPageNumber] = useState(0);
	const postPerPage = 1;
	const postViewed = pageNumber * postPerPage;
  const navigate = useNavigate()

  const currentPosts = Portaldata.slice(postViewed, postViewed + postPerPage);

 
	const pageCount = Math.ceil(Portaldata.length / postPerPage);
	const changePage = ({ selected }: any) => {
		setPageNumber(selected);
	};

  const handleSignIn = ()=> {
    {isSignedIn ? navigate("/tournament") : setOpenModal(true)}
  }

  const handleViewTournament = ()=> {
    {isSignedIn ? navigate("/all-tournaments") : setOpenModal(true)}
  }

  return (
    <Wrapper>
      <Nav>
        <AvatarContainer>
          <img src={virtual} alt="avatar" />

          <ColorContainer>
            <Red>
              <img src={user} alt="" />
            </Red>
            <Yellow>
              <h4>{userName}</h4>
            </Yellow>

            <Green>
              {/* <div>
                <h4>Subscribers</h4>
                <p>200K</p>
              </div> */}
            </Green>

          
              <button
              onClick={handleSignIn}
              >Start a Tournament</button>
            
          </ColorContainer>
        </AvatarContainer>

        <Enclosed>
          <MenuBox>
            <Link style={{textDecoration: 'none'}} to="/">
            <div>
              <h4>Home</h4>
              <Homeicon />
            </div>
            </Link>

            
            <div onClick={handleViewTournament}>
              <h4>Tournaments</h4>
              <Library />
            </div>
            

            <div>
              <h4> Games</h4>
              <Games />
            </div>
          </MenuBox>
        </Enclosed>

        <Portal>
          <h4>Gaming Portal</h4> 
          
          { currentPosts.map((item,index)=> (
                             <Imgslide key={index}>
                           
                             <Img style={{backgroundImage:`url(${item.background})`}}>
                                    <Seen>
                                       <img 
                                       src={item.background}
                                       alt=""
                                       /> 
                                       <h4>{item.title}</h4>
                                   </Seen>
                                  {/* <h4>{item.title}</h4> */}
                                 
                             </Img>
   
                            </Imgslide>
                        ))
           }
          <ReactPaginate
                  previousLabel={<MdKeyboardArrowLeft />}
                  nextLabel={<MdKeyboardArrowRight />}
                  pageCount={pageCount}
                  pageClassName="page-item-none"
                  breakClassName="page-item-none"
                  onPageChange={changePage}
                  containerClassName={"paginationBttns"}
                  previousLinkClassName={""}
                  nextLinkClassName={""}
                  disabledClassName={""}
                  activeClassName={"activeBttn"}
                />


        </Portal>
      </Nav>
     
        {openModal && 
            <LoginModal
             modal={setOpenModal}
             wallet={wallet}
            />
         }
    </Wrapper>
  );
};

const Portal = styled.div`
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h4{
    color: #df78e3;
    font-size: 1.1rem;
  }
`;

const Wrapper = styled.div`
`;

const Nav = styled.div`
  display: none;
  @media (min-width: 686px) {
    position: fixed;
    display: flex;
    height: 100vh;
    flex-direction: column;
    top: 3.5rem;
    margin-left: 1rem;
  }
`;

const Imgslide = styled.div`
 display: flex;
 flex-direction: row;
 gap: 1rem;
 margin: 0rem 1rem;
`;

const Img = styled.div`
display: flex;
flex-direction: column;
background-size: 11rem 8rem;
border-radius: 12px;
width: 11rem;
height: 8rem;

@media screen and (min-width: 686px) and (max-width: 840px){
  width: 9rem;
}
h4{
 color: #fff;
 font-size: 1.2rem;
 margin-left: 8px;

}
`;

const Seen = styled.div`
display: flex;
flex-direction: row;
align-items: center;
background: rgba(255, 255, 255, 0.34);
box-shadow: 0 4px 30px rgba(0,0,0,0.1);
backdrop-filter: blur(5px);
border-bottom-left-radius: 12px;
border-bottom-right-radius: 12px;
width: 100%;
height: 3.5rem;
margin-top: 45%;
@media screen and (min-width: 686px) and (max-width: 840px){
  margin-top: 50%;
  h4{
    margin-left: .5rem;
  }
}
img{
width: 30px;
height: 30px;
border-radius: 8px;
 margin-left: 8px;
}
h4{
  font-size: .8rem;
  margin-left: 1rem;
}

`;

const AvatarContainer = styled(motion.div)`
  display: none;
  @media (min-width: 686px) {
    display: flex;
    flex-direction: column;
    margin: 1rem 0.5rem;
    background: #35356b;
    border-radius: 12px;
    position: relative;
    width: 20vw;
    height: 30vh;

    img {
      border-top-right-radius: 12px;
      border-top-left-radius: 12px;
      cursor: pointer;
      width: 100%;
      height: 100px;
    }
  }
  @media screen and (min-width: 1000px) {
    width: 12rem;
  }
`;

const ColorContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;

  button{
  display: flex;
  background: transparent;
  border: 1px solid #6365bf;
  color: #6365bf;
  margin-top: 2rem;
  border-radius: 9999px;
  height: 30px;
  padding: .3rem .4rem;
  cursor: pointer;

  @media (min-width: 840px){
    padding: .3rem 1rem;
  }
  &:hover {
      transform: scale(1.05);
      translate: 5s ease in;
    }
    
  }
`;


const Red = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  margin: 0 auto;
  top: 4rem;
  img {
    width: 3rem;
    height: 3rem;
    padding: 0;
    margin: 0 0.5rem;
  }
`;

const Yellow = styled(motion.div)`
  justify-content: center;
  align-items: center;
  margin-top: 0.5rem;
  h4 {
    color: #fff;
    font-size: 14px;
    margin: 0.5rem 0 0 0;
  }
  p {
    color: #fff;
    font-size: 12px;
    margin-top: 8px;
    text-align: center;
  }
`;

const Green = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 0.5rem;

    h4 {
      margin: 0;
      color: #6365bf;
      font-size: 12px;
    }

    p {
      font-size: 12px;
      color: #6365bf;
      margin: 0;
    }
  }
`;

const MenuBox = styled.div`
  display: flex;
  flex-direction: column;
  background: #35356b;
  padding: 0.7rem 1.2rem;
  border-radius: 12px;

  div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    &:hover {
      transform: scale(1.05);
    }
  }

  h4 {
    color: #fff;
    font-size: 12px;
    margin: 0.4rem 0.3rem 1.2rem 0;
    padding-top: 0.4rem;
    cursor: pointer;
  }
`;

const Enclosed = styled.div`
  width: 22vw;
  border-radius: 12px;
  @media screen and (min-width: 1000px) {
    width: 13rem;
  }
`;

const Library = styled(HiCollection)`
  font-size: 21px;
  color:white;
`;
const Games = styled(RiGamepadFill)`
  font-size: 21px;
  color:white;
`;
const Homeicon = styled(TiHome)`
  font-size: 21px;
  color:white;
`;

export default Dashboard;