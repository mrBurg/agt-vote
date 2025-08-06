import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { createStore } from '@/redux/store';

import { render, screen } from '@testing-library/react';

import { Participant } from '../';

const participantProps = {
  picture: {
    large: '/background.jpg',
  },
  name: {
    title: 'title',
    first: 'first',
    last: 'last',
  },
  location: {
    city: 'city',
  },
  login: {
    uuid: '00000000-0000-0000-0000-000000000000',
  },
  vaotes: 0,
};

describe('Participant', () => {
  const store = createStore();

  it('renders non-empty content', () => {
    const { container } = render(
      <Provider store={store}>
        <Participant {...participantProps} />
      </Provider>
    );

    expect(container).not.toBeEmptyDOMElement();
    expect(screen.getByText(/city/i)).toBeInTheDocument();
  });
});
