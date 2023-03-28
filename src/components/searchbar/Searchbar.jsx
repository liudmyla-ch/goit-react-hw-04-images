import css from './Searchbar.module.css';
import { useState } from 'react';
import PropTypes from 'prop-types';

export const Searchbar = props => {
  const [value, setValue] = useState('');

  const onSubmitForm = evt => {
    evt.preventDefault();
    if (value.trim() === '') {
      alert('Please, type any words');
      return;
    }
    props.onSubmit(value.trim());
    setValue('');
    evt.target.elements.searchInput.blur();
  };

  const onChangeInput = evt => {
    const value = evt.target.value.toLowerCase();
    setValue(value);
  };

  return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={onSubmitForm}>
        <button type="submit" className={css.button}>
          <span className={css.buttonLabel}>Search</span>
        </button>

        <input
          onChange={onChangeInput}
          value={value}
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="searchInput"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
