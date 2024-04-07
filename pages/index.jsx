import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";
import styled from 'styled-components';

export default function Home(){

    const {data:session} = useSession();
    return(
        <Layout>
          <DashboardBox>
            <DashboardName>hello ,<b> {session?.user?.name}</b></DashboardName>
            <RightContent>
                <UserImage src={session?.user?.image} alt="userImg"/>
                <DashboardName className="bg-gray-300 p-[3px] rounded-lg">{session?.user?.name}</DashboardName>
            </RightContent>
          </DashboardBox>
        </Layout>
    )
}

const RightContent = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  align-items: center;
`

const DashboardBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`

const UserImage = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin: 10px;
    border: 2px solid #007bff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease-in-out;
    &:hover {
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    }
    @media (max-width: 768px) {
        width: 80px;
        height: 80px;
    }
    @media (max-width: 576px) {
        width: 60px;
        height: 60px;
    }
    @media (max-width: 375px) {
        width: 40px;
        height: 40px;
    }
    @media (max-width: 320px) {
        width: 30px;
        height: 30px;
    }

    
`
const DashboardName = styled.h2`
  font-size: 2rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem; 
  }
`;