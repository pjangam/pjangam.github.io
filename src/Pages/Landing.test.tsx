import React from 'react';
import ReactDom from 'react-dom';
import { render, screen, cleanup } from '@testing-library/react';
import Landing from './Landing';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';

afterEach(() => {
  cleanup();
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDom.render(<Router><Landing /></Router>, div);
});

xit('renders Pramod Jangam', () => {
  const { getByTestId } = render(<Landing></Landing>);
  const linkElement = screen.getByText(/Pramod Jangam/i);
  expect(linkElement).toBeInTheDocument();
  //expect(getByTestId('root')).toHaveTextContent('Pramod');
});

it('contains jumbotron', () => {
  const { getByTestId } = render(
    <Router>
      <Landing />
    </Router>,
  );
  expect(getByTestId('jumbotron')).toBeDefined();
});
