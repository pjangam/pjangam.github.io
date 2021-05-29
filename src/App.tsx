import React from 'react';
import { Route } from 'react-router-dom';
import { Landing } from './Pages/Landing';
import { Resume } from './Pages/Resume';
import 'font-awesome/css/font-awesome.min.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { MyRouter } from './Router';
function App() {
  return (
    <MyRouter />
  );
}

export default App;