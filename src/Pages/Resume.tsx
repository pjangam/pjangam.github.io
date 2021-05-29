import React from 'react';

const Resume = () => {
  const style = {
    width: '95%',
    height: '80vh',
    margin: '0 0 0 20px',
  };
  return (
    <div>
      <iframe
        title="GoogleDocsResume"
        src="https://docs.google.com/document/d/e/2PACX-1vROZATH6LmiBw0HomEu0qR0nqKl4lQTHmG4O06tLutBT6qljqId4SamDUDUYXkzVg/pub?embedded=true"
        style={style}
      ></iframe>
    </div>
  );
};

export { Resume };
