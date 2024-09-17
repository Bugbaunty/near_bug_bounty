import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import Loader from './Loader/Loader';
import CodImgData from '../Features/ImageData/CodImg/CodImgData';
import check from "../assets/check.png";
import { Link, useNavigate } from 'react-router-dom';

interface props {
  gamebloc: any,
  isSignedIn: any
}

const TournamentList = ({gamebloc, isSignedIn}: props) => {
  const [allTournaments, setAllTournaments] = useState([] as any[]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
    
  useEffect(() => {
    if (isSignedIn) {
      try {
            gamebloc.getAllTournaments().then((data: any) => {
               if (data) {
                  setAllTournaments(data.tournament);
                  // console.log(data.tournament)
                  setLoading(false);
               }
            })
               
         } catch(error) {
            console.log(error)
        }
    } else {
        
       }
    },[])
  

    if (loading) {
      return (
         <Layout>
           <Loader />
        </Layout>
      )
    } else {
        return (
            <CardContainer>
                 <Heading>
                    <h4> Active Tournaments </h4> 
                    <h4 onClick={()=> navigate('/all-tournaments')} style={{cursor: 'pointer'}} >View All</h4>
                </Heading>
                
                 <FlexLayout>
           
                    {allTournaments.map((data, index) => (
                        <Imgslide key={index}>
                        <ImgWrapper>
                            
                                <Img style={{backgroundImage:`url(${CodImgData[Math.floor(Math.random() * CodImgData.length)]})`}}/>                 
                                
                                    <Wrapper>
                                        <Avatar 
                                        src={CodImgData[Math.floor(Math.random() * CodImgData.length)]}
                                        alt=""
                                        /> 

                                        <Details>
                                            <h4>Call of Duty</h4>
                                            <Profile>
                                            <Check src={check}  alt=""/>
                                            <h3>{ data.owner_id.substring(0, data.owner_id.length - 8) }</h3>
                                            </Profile>
                                        </Details>
                                        
                                    </Wrapper>
                            
                                    <Status>
                                        <h4></h4>
                                        <Link to={`/tournament-view/${data.tournament_id_hash}`} style={{textDecoration: "none"}}>
                                            <button >Details</button>
                                        </Link>
                                    </Status>
                                    
                                    
                        </ImgWrapper>
                
                        </Imgslide>
                    ))}
              </FlexLayout>
         

                
          </CardContainer>
      
        )
}
}

const Layout = styled.div`
 display: flex;
 justify-content: center;
 align-items: center;
 width: 100%;
 height: 10rem;
`;

const CardContainer = styled.div`
   margin: 1rem;
   overflow: hidden;
   border-radius: 12px;

   @media (min-width: 686px) and  (max-width: 999px){
      margin: 0 1rem 0 1rem;
     }

   @media (min-width: 1000px){
    margin-left: 7px;
    
   }
`;

const Heading = styled.div`
 display: flex;
 flex-direction: row;
 justify-content: space-between;
 align-items: center;
 margin: 7px 0 .7rem 1rem;

 h4{
    color: #df78e3;
    @media (max-width: 400px){
     font-size: 13px;
    }
 }

 span{
    color: #6365bf;
    margin-left: .8rem;
    @media (max-width: 400px){
     font-size: 13px;
    }
 }
`;

const FlexLayout = styled.div`
 display: flex;
 flex-direction: row;
 overflow-x: scroll;
 height: 330px;
 gap: 2rem;
 
 
&::-webkit-scrollbar{
    -webkit-appearance: none;
    border: none;
    height: 5px;
}
&::-webkit-scrollbar-thumb{
    border-radius: 9999px;
    background-color: #df78e3;
    visibility: hidden;
}
&:hover::-webkit-scrollbar-thumb{
    visibility: visible;
}
/* @media (max-width: 500px){
 margin-left: 1rem;
} */
`;

const ImgWrapper = styled.div`
 position: relative;
 display: flex;
 flex-direction: column;
`;

const Imgslide = styled.div`
 position: relative;
 display: flex; 

`;

const Img = styled.div`
display: flex;
position: absolute;
flex-direction: column;
background-size: 100% 100%;
border-radius: 12px;
height: 20rem;
opacity: 0.7;
width: 8.5rem;
@media (min-width: 370px){
  width: 10rem;
}
@media (min-width: 371px){
  width: 110%;
}
/* @media (min-width: 1200px){
  width: 120%;
} */
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
width: 100%;
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
h4{
  color: #fff;
  font-size: 14px;
  margin: 0;
}
`;

const Profile = styled.div`
display: flex;
align-items: center;
flex-direction: row;
margin-top: 4px;
h3{
  color: #fff;
  width: 100px;
  font-size: 14px;
  margin:  0 0 0 4px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  @media (max-width: 320px){
   font-size: 12px;
  }

}
`;

const Avatar = styled.img`
width: 40px;
height: 40px;
border-radius: 8px;
margin: 10px 0 0 8px;
`;

const Check = styled.img`
 width: 20px;
 height: 20px;
 `;

const Status = styled.div`
 display: flex;
 flex-direction: row;
 justify-content: space-between;
 margin-top: 90%;
 align-items: center;
 padding: 1rem ;
 z-index: 1; 
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
   padding: .5rem 1rem;
   color: white;
   font-size: 1rem;
   border: none;
   width: fit-content;
   margin-left: 2rem;
  
   cursor: pointer;
   &:hover{
      scale: 1.03;
      background-color: #6365bf;
   }
 }
 `;

export default TournamentList;