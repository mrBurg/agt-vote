import '@testing-library/jest-dom';

import { Provider } from 'react-redux';
import { createStore } from '@/redux/store';

import { render, screen } from '@testing-library/react';

import { type ParticipantProps, Participant } from './..';

jest.mock('./../components/rate.svg', () => ({
  __esModule: true,
  default: () => <svg data-testid="mock-rate" />,
}));

const participantProps: ParticipantProps = {
  picture: {
    large: 'https://randomuser.me/api/portraits/men/*.jpg',
    base64: 'data:image/jpeg;base64,/*//Z',
  },
  name: { title: 'Mr.', first: 'John', last: 'Doe' },
  location: { city: 'New York' },
  login: { salt: 'Abcdefjh' },
  votes: 0,
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
    expect(screen.getByText(/Total votes/i)).toBeInTheDocument();
  });
});
