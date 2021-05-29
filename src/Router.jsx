import React from 'react';
import { Route } from 'react-router-dom';
import {Landing} from './Pages/Landing';
import { Resume } from './Pages/Resume';
import {}


const MyRouter = () => {
  return (
    <>
      <Route path="/" exact={true} component={Landing}></Route>
      <Route path="/resume" exact={true} component={Resume}></Route>
      <Route path="/layout" exact={true} component={Resume}></Route>
    </>
  );
};

export { MyRouter };
