import React from 'react';
import { Container } from 'reactstrap';
import { Link } from 'react-router-dom';

const Layout = (props: any) => {
  const { children, className } = props;
  return (
    <div className={className}>
      <Container className="text-center">
          <h2>Pramod Jangam</h2>
        <Link to="/" color="primary">
          Home
        </Link>
        &emsp;
        <Link to="/blogs" color="primary">
          Blogs
        </Link>
        &emsp;
        <Link to="/resume" color="primary">
          Resume
        </Link>
      </Container>
      {children}
      <Container>
        <hr></hr>
        <span>© 2020 Pramod Jangam</span>
      </Container>
    </div>
  );
};

export { Layout };
