import React from 'react';
import ReactDom from 'react-dom';
import { render, screen, cleanup } from '@testing-library/react';
import Resume from './Resume';
import '@testing-library/jest-dom/extend-expect';

afterEach(() => {
  cleanup();
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDom.render(<Resume></Resume>, div);
});
