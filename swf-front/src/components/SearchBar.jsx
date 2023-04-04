import React, { useState } from 'react';

function SearchBar(props) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // do something with searchQuery, e.g. send it to a search API
  };

  return (
    <form className="bar" onSubmit={handleFormSubmit}>   
      <input className='search-input'
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleInputChange}
      />
      
    </form>
  );
}

export default SearchBar;
