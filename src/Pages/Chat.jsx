import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Welcome from "../Components/Welcome";
import Contacts from "../Components/Contacts";
const Chat = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [contacts, setContacts] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    async function sUser() {
      if (!localStorage.getItem("chat-app-current-user")) {
        navigate("/login");
      } else {
        setCurrentUser(
          await JSON.parse(localStorage.getItem("chat-app-current-user"))
        );
      }
    }
    sUser();
  }, []);

  useEffect(() => {
    async function sContact() {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(
            `http://localhost:8000/api/auth/allusers/${currentUser._id}`
          );
          setContacts(data.data);
        } else {
          navigate("/setAvatar");
        }
      }
    }
    sContact();
  }, [currentUser]);
  return (
    <div>
      <Container>
        <div className="container">
          <Contacts contacts={contacts} />
          <Welcome />
        </div>
      </Container>
    </div>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat;
