import React, { useState, useEffect } from "react";
import styled from "styled-components";
import giphy from "../Images/giphy.gif";

const Welcome = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    async function name() {
      setUserName(
        await JSON.parse(localStorage.getItem("chat-app-current-user")).username
      );
    }
    name();
  }, []);

  return (
    <div>
      <Container>
        <img src={giphy} alt="hello" />
        <h1>
          Welcome, <span>{userName}!</span>
        </h1>
        <h3>Please select a chat to Start messaging.</h3>
      </Container>
    </div>
  );
};
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    margin-top: 25px;
    height: 20rem;
    border-radius: 2rem;
  }
  span {
    color: #4e0eff;
  }
`;

export default Welcome;
