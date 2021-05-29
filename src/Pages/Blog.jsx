import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import marked from 'marked';
import { Container } from 'reactstrap';

const BlogPost = () => {
  const [data, setData] = useState('');
  const { blogName } = useParams();
  const blogModule = require(`./Blogs/${blogName}.md`);

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

export { BlogPost };
