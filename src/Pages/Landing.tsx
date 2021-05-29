import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Jumbotron, Button, Container, Col, Row } from 'reactstrap';
import Flag from 'react-world-flags';
import { Follow } from 'react-twitter-widgets';

const Landing = () => {
  const history = useHistory();

  function handleResume() {
    history.push('/resume');
  }
  // eslint-disable-next-line no-lone-blocks
  {
    /*TODO: Get listing from file instead of hardcoding */
  }
  const blogPosts = [
    {
      title: 'Unit testing in Javascript (NodeJS)',
      path: 'JavascriptUnitTesting',
    },
    { title: 'gitAlias', path: 'gitAlias' },
  ];
  return (
    <div data-testid="root">
      <Jumbotron data-testid="jumbotron">
        <Container>
          <h1>Pramod Jangam</h1>
          <span>
            Software developer <i className="fa fa-laptop"></i>, Music lover 🎼
            🎶, Amateur guitarist 🎸, Atheist ☮️, Explorer , Student 📚 of life. <i className="fa fa-map-marker"></i> Pune, India
            {' '}<Flag code="IND" height="16" fallback="India" />
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
              <Button onClick={handleResume}>Resume</Button>
            </Row>
          </Col>
          <Col md="4">
            <Row>
              <h2>Blogs</h2>
            </Row>
            {blogPosts.map((b) => (
              <Row key={b.path}>
                <Link to={`blogs/${b.path}`}>{b.title}</Link>
              </Row>
            ))}
          </Col>
        </Row>
        <br />
        <br />
        <br />
        <Row>Connect with me</Row>
        <Row>
          <Follow username="pjanhere"></Follow>
        </Row>
      </Container>
    </div>
  );
};

export { Landing };
