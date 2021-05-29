import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import marked from 'marked';
import { Container, Row } from 'reactstrap';

const BlogPost = () => {
  const [data, setData] = useState('');
  const { blogName } = useParams();
  const blogModule = require(`./BlogPosts/${blogName}.md`);

  fetch(blogModule.default)
    .then((response) => {
      return response.text();
    })
    .then((text) => {
      const w = marked(text);
      setData(w);
    });
  return (
    <Container>
      <section>
        <article dangerouslySetInnerHTML={{ __html: data }}></article>
      </section>
    </Container>
  );
};

const Blogs = () => {
  const blogPosts = [
    {
      title: 'Unit testing in Javascript (NodeJS)',
      path: 'JavascriptUnitTesting',
    },
    { title: 'gitAlias', path: 'gitAlias' },
  ];
  return (
    <Container>
      <Row>
        <h2>Blogs</h2>
      </Row>
      {blogPosts.map((b) => (
        <Row>
          <Link to={`blogs/${b.path}`}>{b.title}</Link>
        </Row>
      ))}
    </Container>
  );
};

export { BlogPost, Blogs };
