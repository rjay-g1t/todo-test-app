import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setSearchQuery } from '../../redux/taskSlice';
import styles from '../../styles/searchBar.module.css';

const SearchBar: React.FC = () => {
  const searchQuery = useSelector(
    (state: RootState) => state.tasks.searchQuery
  );
  const dispatch = useDispatch();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value)); // Update Redux state on input change
  };

  return (
    <div className={styles['search-bar']}>
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
