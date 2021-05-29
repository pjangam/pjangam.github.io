import React from 'react';
import { Route } from 'react-router-dom';
import { Landing } from './Pages/Landing';
import { Resume } from './Pages/Resume';
import { Layout } from './components/Layout';
import { BlogPost, Blogs } from './Pages/Blog';
import { BrowserRouter as Router } from 'react-router-dom';

const MyRouter = () => {
  return (
    <Router>
      <Layout>
        <Route path="/" exact={true} component={Landing}></Route>
        <Route path="/resume" exact={true} component={Resume}></Route>
        <Route path="/layout" exact={true} component={Resume}></Route>
        <Route
          path="/blogs/:blogName"
          exact={true}
          component={BlogPost}
        ></Route>
        <Route path="/blogs" exact={true} component={Blogs}></Route>
      </Layout>
    </Router>
  );
};

export { MyRouter };
