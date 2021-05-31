import React, { lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { BrowserRouter as Router } from 'react-router-dom';

const Landing = lazy(() => import('./Pages/Landing'));
const Resume = lazy(() => import('./Pages/Resume'));
const Blog = lazy(() =>
  import('./Pages/Blog').then((module) => ({ default: module.Blogs })),
);
const BlogPost = lazy(() =>
  import('./Pages/Blog').then((module) => ({ default: module.BlogPost })),
);

const MyRouter = () => {
  return (
    <Router>
      <Layout>
        <Suspense fallback={<div>Loading...</div>}>
          <Route path="/" exact={true} component={Landing}></Route>
          <Route path="/resume" exact={true} component={Resume}></Route>
          <Route
            path="/blogs/:blogName"
            exact={true}
            component={BlogPost}
          ></Route>
          <Route path="/blogs" exact={true} component={Blog}></Route>
        </Suspense>
      </Layout>
    </Router>
  );
};

export { MyRouter };
