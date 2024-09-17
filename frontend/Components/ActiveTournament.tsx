import React, { useRef, useState, useEffect, SetStateAction } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import icon from "../assets/duty_icon.png"
import dollar from "../assets/dollar.png"
import money from "../assets/money.png"
import mode from "../assets/mode.png"
import check from "../assets/check.png";
import ReactPaginate from "react-paginate";
import "../Features/Pagination.css";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import Loader from "./Loader/Loader";
import { Link } from "react-router-dom";


interface Props{
  gamebloc: any,
  isSignedIn: any
}

const ActiveTournament = ({ gamebloc, isSignedIn }: Props) => {
   const [activeTournaments, setActiveTournaments] = useState([] as any[]);
   const [loading, setLoading] = useState<boolean>(true);
   const [pageNumber, setPageNumber] = useState<number>(0);
   const tournamentPerPage = 1;
   const tournamentViewed = pageNumber * tournamentPerPage;
   const currentTournament = activeTournaments.slice(tournamentViewed, tournamentViewed + tournamentPerPage);
   const pageCount = Math.ceil(activeTournaments.length / tournamentPerPage);


   const changePage = ({ selected }: any) => {
		setPageNumber(selected);
   };
   
   const getTournaments = async () => {
      try {
           await gamebloc.getAllTournaments().then((data: any) => {
               if (data) {
                  setActiveTournaments(data.tournament);
                  setLoading(false);
               }
            })
               
         } catch(error) {
            console.log(error)
        }
  }

   if (isSignedIn) {
      useEffect(() => {
         getTournaments();
      }, [])       
   } 

   useEffect(() => {
      const interval = setInterval(() => {
         getTournaments();
      }, 10000)
      return () => clearInterval(interval);
   })
   
   
   

   if (loading) {
      
      return (
          
            <Load>
              <Loader />
            </Load>
       )  
         
   }
   else {
      
      return(
         <CardLayout >
            <TitleContainer>
               <Column>
               <Title>
                   Tournaments
               </Title>

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
               </Column>
            </TitleContainer>

             
            
               {currentTournament.map((data, index) => (
               <Imgslide key={index}>
                              
                     <Img style={{backgroundImage:`url(https://assets1.ignimgs.com/2019/10/07/call-of-duty-modern-warfare1570477435828.jpg)`}}>
                        <Seen>
                           <Container>
                              <Avatar 
                              src="https://assets1.ignimgs.com/2019/10/07/call-of-duty-modern-warfare1570477435828.jpg"
                              alt=""
                              /> 

                              <Details>
                                 <h4>Call of Duty</h4>
                                 <Profile>
                                    <h3>{ data.owner_id.substring(0, data.owner_id.length - 8) }</h3>
                                    <Check src={check}  alt=""/>
                                 </Profile>
                              </Details>
                              
                           </Container>

                           <Status>
                           <h4>0/50</h4>
                           <button> Join</button>
                           </Status>
                           
                        </Seen>
                                 
                                    
                     </Img>
      
               </Imgslide>
               ))
               }      
            
            <Link to='/all-tournaments' style={{textDecoration: 'none'}}>
               <Viewall>View All</Viewall>
            </Link>
            
      </CardLayout>

      )
   }

}

const Load = styled.div`
display: flex;
justify-content: center;
 align-items: center;
 margin-top: 15rem;
 width: 100%;
`;

const TitleContainer = styled.div`
 display: flex;
 flex-direction: column;
 justify-content: center;
 align-items: center;
 margin: .3rem 0;
 h4{
   color: #df78e3;
   font-size: 16px;
   margin: 0;
 }
`;

const Viewall = styled.h4`
  color: #df78e3;
   font-size: 16px;
   margin: 0;
   cursor: pointer;
`;

const Column = styled.div`
 display: flex;
 flex-direction: row;
 justify-content: space-between;
 align-items: center;
 margin: .3rem 0;
`;


const Title = styled.h2`
color: #df78e3;
font-size: 1rem;
margin-left: 1rem;
`;

const CardLayout = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   flex-direction: column;
   gap: 1rem;   
    @media  (min-width: 1200px) and (max-width: 1450px){
       width: 70%; 
      margin-left: 4rem;
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
position: relative;
flex-direction: column;
background-size: 100% 60%;
border-radius: 12px;
width: 14rem;
height: 17rem;
@media  (min-width: 1200px) and (max-width: 1450px){
   width: 12rem; 
}

`;

const Seen = styled.div`
display: flex;
position: absolute;
bottom: 0;
flex-direction: column;
background: rgba(255, 255, 255, 0.34);
box-shadow: 0 4px 30px rgba(0,0,0,0.1);
backdrop-filter: blur(5px);
/* border-radius: 9999px; */
border-bottom-left-radius: 12px;
border-bottom-right-radius: 12px;
width: 100%;
height: 50%;
margin-top: 60%;
`;

const Container = styled.div`
display: flex;
flex-direction: row;
`;

const Details = styled.div`
display: flex;
flex-direction: column;
margin-left: 8px;
padding: 10px;
   h4{
      color: #fff;
     font-size: 14px;
     margin: 0;
   }
`;

const Profile = styled.div`
display: flex;
flex-direction: row;
 h3{
      color: #fff;
     font-size: 14px;
     margin: 0;
   }
`;

const Avatar = styled.img`
width: 40px;
height: 40px;
border-radius: 8px;
 margin: 10px 0 0 8px;
`;

const Check = styled.img`
 margin-left: 4px;
 width: 20px;
 height: 20px;
`;

const Status = styled.div`
 display: flex;
 flex-direction: row;
 justify-content: space-between;
 width: 90%;
 align-items: center;
 padding: 1rem ;
 h4{
    color: white;
    @media (max-width: 400px){
     font-size: 13px;
    }
 }
 button{
   background-color: #41417c;
   border-radius: 8px;
   display: flex;
   justify-content: space-between;
   align-items: center;
   padding: 1rem 2rem;
   color: white;
   font-size: 16px;
   border: none;
   width: fit-content;
  
   cursor: pointer;
   &:hover{
      scale: 1.03;
      background-color: #6365bf;
   }
 }
`;

export default ActiveTournament;

