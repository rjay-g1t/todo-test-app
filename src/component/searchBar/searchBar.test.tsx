import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { setSearchQuery } from '../../redux/taskSlice';
import SearchBar from './searchBar';

const mockStore = configureStore([]);

describe('SearchBar Component', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      tasks: {
        searchQuery: '',
      },
    });

    store.dispatch = jest.fn();
  });

  it('renders the search bar correctly', () => {
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    expect(screen.getByPlaceholderText('Search tasks...')).toBeInTheDocument();
  });

  it('displays the correct initial value from the Redux store', () => {
    store = mockStore({
      tasks: {
        searchQuery: 'Initial Query',
      },
    });

    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    expect(screen.getByDisplayValue('Initial Query')).toBeInTheDocument();
  });

  it('dispatches the setSearchQuery action on input change', () => {
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );
    const searchInput = screen.getByPlaceholderText('Search tasks...');
    userEvent.type(searchInput, 'New Query');

    expect(store.dispatch).toHaveBeenCalledWith(setSearchQuery('New Query'));
  });
});
