import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 0 20px;
`;

const Content = styled.div`
  text-align: center;
  max-width: 600px;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Message = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin: 0 10px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const LinkButton = styled.a`
  display: inline-block;
  padding: 10px 20px;
  margin: 0 10px;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const RestrictedPage = () => {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href= '/'
  };

  return (
    <Container>
      <Content>
        <Title>Restricted Access</Title>
        <Message>You are not allowed to access this page. Please contact the administrator for assistance.</Message>
        <Button onClick={handleLogout}>Logout</Button>
        <LinkButton href="/profiles">Go to Profile</LinkButton>
      </Content>
    </Container>
  );
};

export default RestrictedPage;
