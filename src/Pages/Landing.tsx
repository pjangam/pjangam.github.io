import React from 'react';
import { useHistory } from 'react-router-dom';
import { Jumbotron, Button, Container, Col, Row } from 'reactstrap';
import Flag from 'react-world-flags';
import { Timeline, Follow } from 'react-twitter-widgets';

const Landing = ({}) => {
  const history = useHistory();

  function handleResume() {
    history.push("/resume");
  }
  return (
    <div data-testid="root">
      <Jumbotron data-testid="jumbotron">
        <Container>
          <h1>Pramod Jangam</h1>
          <span>
            Software developer <i className="fa fa-laptop"></i>, Music lover 🎼
            🎶, Amateur guitarist 🎸, Atheist ☮️, Explorer , Student 📚 of life.
            <Flag code="IND" height="16" fallback="India" />
          </span>
        </Container>
      </Jumbotron>
      <Container>
        <Row>
          <Col md="4">
            <Row>
              <h2>Resume</h2>
            </Row>
            <Row>My job history, mostly tech, mostly computers.</Row>
            <Row>
              <Button
                onClick={handleResume}
              >
                Resume
              </Button>
            </Row>
          </Col>
          <Col md="4">
            <Row>
              <h2>Blogs</h2>
            </Row>
            {/*TODO: get for different component*/}
            <Row>Unit testing in Javascript (NodeJS)</Row>
            <Row>Git Alias</Row>
          </Col>
        </Row>
        <br />
        <br />
        <br />
        <Row>Connect with me</Row>
        <Row>
          <Follow username="pjangam"></Follow>
        </Row>
      </Container>

     
    </div>
  );
};

export  {Landing};
