import React from 'react';
import { Button } from 'reactstrap';

const Resume = () => {
  console.log(document.documentElement.clientWidth);
  const screenWidth = document.documentElement.clientWidth;
  const margin = (screenWidth - 900) / 2;
  let divstyle = { 'marginLeft': '0px', 'marginRight': '0px' }

  if (margin > 0) {
    divstyle = { 'marginLeft': `${margin}px`, 'marginRight': `${margin}px` }
  }

  function download() {
    var link = document.createElement('a');
    link.href = "https://drive.google.com/file/d/1nLrseDI2qSG6TEN-pjSmgboOdRw-fFZA/view?usp=share_link";
    link.download = 'true';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

  }
  const style = {
    width: '95%',
    height: '80vh',
    margin: '0 0 0 20px',
    'text-align': 'center',
    'justify-content': 'center'
  };
  return (
    <div style={divstyle}>
      <Button outline color="success" onClick={download} style={{ "float": "right", "marginRight": "50px" }}>Download <i className="fa fa-download"></i></Button><br /><br /><br />
      <iframe
        title="GoogleDocsResume"
        src="https://docs.google.com/document/d/e/2PACX-1vQdtcDDTw6lrN6UVagqXohSvWRCLvIe510v2sKGZbopXsoNbWHurWItPX-xqxeKPbZxapkqQdXdt7_f/pub?embedded=true"
        style={style}
      ></iframe>
    </div>
  );
};

export default Resume;
